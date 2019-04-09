import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {

  tarefas: any = [];
  tarefasTodo: any = [];
  tarefasInPro: any = [];
  tarefasDone: any = [];
  testes: any = [];
  usuarios: any;

  tarefasFiltradas: any = [];

  _filtroTarefa: string;
  get filtroTarefa(): string {
    return this._filtroTarefa;
  }
  set filtroTarefa(value: string) {
    this._filtroTarefa = value;
    this.tarefasFiltradas = this.filtroTarefa ? this.filtrarListar(this.filtroTarefa) : this.tarefas;
  }

  filtrarListar(filtrarPor: string): any {
    // filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.tarefas.filter(
      tarefa => tarefa.responsavel.nome === filtrarPor
    );
  }

  constructor(private http: HttpClient) { }

  onDrop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
    }
  }

  ngOnInit() {
    this.getTarefas();
    this.getUsuarios();
  }

  getTarefas() {
    this.http.get('http://localhost:5000/api/tarefas').subscribe(
      response => {
        this.tarefas = response;
      }, error => {
        console.log(error);
      }
    );
  }

  getTarefasStatus(status: number) {
    this.http.get('http://localhost:5000/api/tarefas/getByStatus/'+ status).subscribe(
      response => {
        if(status == 0){
          this.tarefasTodo = response;
        } else if (status == 1) {
          this.tarefasInPro = response;
        } else {
          this.tarefasDone = response;
        }
      }, error => {
        console.log(error);
      }
    );
  }

  getUsuarios() {
    this.http.get('http://localhost:5000/api/usuarios').subscribe(
      response => {
        this.usuarios = response;
        this.testes = response;
      }, error => {
        console.log(error);
      }
    );
  }
}
