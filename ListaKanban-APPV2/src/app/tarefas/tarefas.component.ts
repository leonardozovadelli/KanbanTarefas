import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { Tarefa } from '../_models/Tarefa';
import { identity } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {


  constructor(private http: HttpClient) { }

  cor: string;
  tarefas: any = [];
  tarefasTodo: Tarefa[];
  tarefasInPro: Tarefa[];
  tarefasDone: Tarefa[];
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

  onDrop(tarefa: Tarefa, event: CdkDragDrop<Tarefa[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
      // console.log("Estava (previous):");
      // console.log(event.previousContainer.data);
      // console.log("Foi para (container):");
      // console.log(event.container.data);
      // console.log("Estava (previous):");
      // console.log(event.previousIndex);
      // console.log("Foi para (index):");
      // console.log(event.currentIndex);
      // console.log("Objeto:");
      // console.log(event.container.data[event.currentIndex]);
      var status = parseInt(event.container.id);
      if (status == 0) {
        this.editarTarefa(event.container.data[event.currentIndex].id, 0, event.container.data[event.currentIndex]);
      }
      if (status == 1) {
        this.editarTarefa(event.container.data[event.currentIndex].id, 1, event.container.data[event.currentIndex]);
      }
      if (status == 2) {
        this.editarTarefa(event.container.data[event.currentIndex].id, 2, event.container.data[event.currentIndex]);
      }
    } else {
      moveItemInArray(event.container.data,
        event.previousIndex, event.currentIndex);
    }
  }

  ngOnInit() {
    this.getTarefas();
    this.getUsuarios();
    this.getTarefasStatus(0);
    this.getTarefasStatus(1);
    this.getTarefasStatus(2);
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
    this.http.get('http://localhost:5000/api/tarefas/getByStatus/' + status).subscribe(
      (response: Tarefa[]) => {
        if (status === 0 && response != null) {
          this.tarefasTodo = response;
        } else if (status === 1 && response != null) {
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

  editarTarefa(id: number, status: number, tarefa: Tarefa) {
    console.log("EditarTarefa:");
    console.log(tarefa);
    tarefa.status = status;
    this.http.put(`http://localhost:5000/api/tarefas/${id}`, tarefa).subscribe(
      () => {
        console.log("Deu certo");
      }, error => {
        console.log(error);
      }
    );
  }

  mudarCor(){
    this.tarefasTodo.forEach(c => {
      if(c.prioridade == 0){

      }
    })
  }

}
