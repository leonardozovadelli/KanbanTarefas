import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {

  tarefas: any;
  usuarios: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getTarefas();
    this.getUsuarios();
  }

  getTarefas(){
    this.http.get('http://localhost:5000/api/tarefas').subscribe(
      response => { 
        this.tarefas = response
      },error => {
        console.log(error);
      }
    );
  }

  getUsuarios(){
    this.http.get('http://localhost:5000/api/usuarios').subscribe(
      response => { 
        this.usuarios = response
      },error => {
        console.log(error);
      }
    );
  }

}
