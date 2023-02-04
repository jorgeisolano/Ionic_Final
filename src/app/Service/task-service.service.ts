import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../tasklist/task';
import { IonItemSliding } from '@ionic/angular';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  firebaseConfig = {
    apiKey: "AIzaSyDDRbdBpaYLBbvBftITRR7685mullK3F-A",
    authDomain: "ionicfinal-abbab.firebaseapp.com",
    databaseURL: "https://ionicfinal-abbab-default-rtdb.firebaseio.com",
    projectId: "ionicfinal-abbab",
    storageBucket: "ionicfinal-abbab.appspot.com",
    messagingSenderId: "1040660146303",
    appId: "1:1040660146303:web:31a28bb329eba30002f74a",
    measurementId: "G-RHTQE69G3T"
  };
  app = initializeApp(this.firebaseConfig);
  database = getDatabase(this.app);

  tasks: Array<Task> = [];
  private clientes$ = new Subject<Array<Task>>()

  constructor() {
    let taskRef = ref(this.database, 'tasks');
    onValue(taskRef, (snapshot) => {
      const data = snapshot.val();
      if(data!=null)
        this.tasks=data
      this.clientes$.next(this.tasks)
    });

   }

  getTaskt():Observable<Array<Task>>{
    return this.clientes$.asObservable()
  }
  addItem(task:Task) {
    this.tasks.push(task);
    set(ref(this.database, 'tasks/'), this.tasks);
    this.clientes$.next(this.tasks)
  }

  handleCheckbox(index : number) {
    let task = this.tasks[index]
    if(task.status == "done"){
      this.tasks[index].status="open";
    }else{
      this.tasks[index].status="done";
    }
    set(ref(this.database, 'tasks/'), this.tasks);
    this.clientes$.next(this.tasks)
  }


  removeTask(task: Task) {
    task.status = "removed";
    let index = this.tasks.indexOf(task);
    if (index > -1) {
        //Removes the task from the array at a specific position
        this.tasks.splice(index, 1);
        set(ref(this.database, 'tasks/'), this.tasks);

        this.clientes$.next(this.tasks)
    }
  }
}
