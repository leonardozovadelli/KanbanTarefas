import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { Tarefa } from '../_models/Tarefa';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {

  constructor(private http: HttpClient) { }

  //ngModel do filtro
  valorUsuario: any = 'todos';

  inserirIcon(esfPrev: number, esfReal: number) {
    let classes = [];
    if (esfPrev < esfReal) {
      classes = [
        'glyphicon glyphicon-warning-sign position-absolute'
      ];
    }
    return classes;
  }

  borderLeft(prio: number) {
    const colors = [
      'borderLeftBaixa',
      'borderLeftMedia',
      'borderLeftAlta',
    ];
    return colors[prio];
  }

  mudarTexto(prio: number) {
    const textos = [
      'Baixa',
      'Média',
      'Alta'
    ];
    return textos[prio];
  }

  mudarCor(prio: number) {
    const classes = [
      'bgBaixa',
      'bgMedia',
      'bgAlta'
    ];
    return classes[prio];
  }

  tarefasTodo: Tarefa[] = [];
  tarefasInPro: Tarefa[] = [];
  tarefasDone: Tarefa[] = [];
  tarefas: Tarefa[] = [];
  usuarios: any;

  //Movimentar os Cards, com isso alterar os status
  onDrop(event: CdkDragDrop<Tarefa[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
      const status = parseInt(event.container.id, 10);
      if (status === 0) {
        this.editarTarefa(event.container.data[event.currentIndex].id, status, event.container.data[event.currentIndex]);
      }
      if (status === 1) {
        this.editarTarefa(event.container.data[event.currentIndex].id, status, event.container.data[event.currentIndex]);
      }
      if (status === 2) {
        this.editarTarefa(event.container.data[event.currentIndex].id, status, event.container.data[event.currentIndex]);
      }
    } else {
      moveItemInArray(event.container.data,
        event.previousIndex, event.currentIndex);
    }
  }

  ngOnInit() {
    this.getTarefas();
    this.getUsuarios();
    this.getTarefasStatus();
  }

  getTarefasStatus() {
    this.http.get('http://localhost:5000/api/tarefas').subscribe(
      (response: any) => {
        this.tarefasTodo = response.todo;
        this.tarefasInPro = response.inpro;
        this.tarefasDone = response.done;
      }, error => {
        console.log(error);
      }
    );
  }

  getTarefas() {
    this.http.get('http://localhost:5000/api/tarefas').subscribe(
      (response: Tarefa[]) => {
        this.tarefas = response;
      }, error => {
        console.log(error);
      }
    );
  }

  getTarefasPorUsuario(nome: string) {
    if (nome.toLocaleLowerCase() === 'todos') {
      this.getTarefasStatus();
    } else {
      this.http.get('http://localhost:5000/api/tarefas/' + nome).subscribe(
        (response: any) => {
          this.tarefasTodo = response.todo;
          this.tarefasInPro = response.inpro;
          this.tarefasDone = response.done;
        }, error => {
          console.log(error);
        }
      );
    }
  }

  getUsuarios() {
    this.http.get('http://localhost:5000/api/usuarios').subscribe(
      response => {
        this.usuarios = response;
      }, error => {
        console.log(error);
      }
    );
  }

  editarTarefa(id: number, status: number, tarefa: Tarefa) {
    console.log('EditarTarefa: ');
    console.log(tarefa);
    tarefa.status = status;
    this.http.put(`http://localhost:5000/api/tarefas/${id}`, tarefa).subscribe(
      () => {
        console.log('Deu certo');
      }, error => {
        console.log(error);
      }
    );
  }


}
