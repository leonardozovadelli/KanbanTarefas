import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TarefasComponent } from './tarefas/tarefas.component';
import { FormsModule } from '@angular/forms';

@NgModule({
   declarations: [
      AppComponent,
      TarefasComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule,
      MatCardModule,
      DragDropModule,
      FormsModule,

   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
