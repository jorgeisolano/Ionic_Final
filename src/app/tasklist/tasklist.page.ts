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
    let theNewTask: string|null = prompt("Tarea Nueva");
    
    if (theNewTask !== ''  && theNewTask!==null) {
      this.taskService.addItem({ title: theNewTask, status: 'open' });
    }
    console.log(this.tasks)
  }

  checkboxClick(e:any, index : number){
    this.taskService.handleCheckbox(index)
    console.log(this.tasks)
  }

  removeTask(slidingItem: IonItemSliding, task: Task) {
    this.taskService.removeTask(task)
    console.log(this.tasks)
  }
}
