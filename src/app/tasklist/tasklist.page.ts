import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Task } from '../tasklist/task';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.page.html',
  styleUrls: ['./tasklist.page.scss'],
})
export class TasklistPage implements OnInit {
  tasks: Array<Task> = [];
  constructor() {
    this.tasks = [
      {title: 'Leche', status: 'open'},
      {title: 'Huevos', status: 'open'},
      {title: 'Miel de Maple', status: 'open'},
      {title: 'Mezcla para pancakes', status: 'open'}
    ];
  }

  ngOnInit() {
  }

  addItem() {
    let theNewTask: string|null = prompt("Tarea nueva");
    console.log(theNewTask);
    
    if (theNewTask != "") {
      this.tasks.push({ title: theNewTask, status: 'open' });
    }
  }

  markAsDone(slidingItem: IonItemSliding, task: Task) {
    task.status = "done";
    setTimeout(() => { slidingItem.close(); }, 1);
  }

  removeTask(slidingItem: IonItemSliding, task: Task) {
    task.status = "removed";
    let index = this.tasks.indexOf(task);
    if (index > -1) {
        //Removes the task from the array at a specific position
        this.tasks.splice(index, 1);
    }
  }
}
