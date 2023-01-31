import { TaskServiceService } from './../Service/task-service.service';
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

  constructor(private taskService:TaskServiceService) {

  }

  ngOnInit() {

      this.taskService.getTaskt().subscribe((data)=>  this.tasks=data)


  }

  addItem() {
    let theNewTask: string|null = prompt("New Task");

    if (theNewTask !== '') {
      this.taskService.addItem({ title: theNewTask, status: 'open' });
    }
  }

  markAsDone(slidingItem: IonItemSliding, task: Task) {
    this.taskService.markAsDone(task)
  }

  removeTask(slidingItem: IonItemSliding, task: Task) {
    this.taskService.removeTask(task)
  }
}
