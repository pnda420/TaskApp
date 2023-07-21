import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Task } from './task.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  tasks: Task[] = []; // Use Task[] for the tasks array
  createTask: Task = { title: '', description: '', date: '' }; // Initialize createTask as a Task object
  ModalEditMode = false;
  ModalShowMode = false;



  constructor(private cookieService: CookieService) {
    const tasksCookie = this.cookieService.get('tasks');
    if (tasksCookie) {
      this.tasks = JSON.parse(tasksCookie);
    }
  }

  addTask() {
    console.log(this.createTask);

    if (this.createTask.title !== "" && this.createTask.description !== "") {
      this.tasks.push(this.createTask);
      this.createTask = { title: '', description: '', date: '' }; // Reset createTask
      this.saveTasksToCookie();
    }
  }
  delTask(index: number) {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks.splice(index, 1);
      this.saveTasksToCookie();
    }
  }

  // editTask(index: number){
  //   if (this.createTask !== "") {
  //   this.tasks[index] = this.createTask;
  //   this.saveTasksToCookie();
  //   this.createTask = "";
  //   }
  // }

  goUp(i: number) {
    if (i > 0 && i < this.tasks.length) {
      const elementToMove = this.tasks.splice(i, 1)[0];
      const newIndex = i - 1;
      this.tasks.splice(newIndex, 0, elementToMove);
    }
  }

  goDown(i: number) {
    const elementToMove = this.tasks.splice(i, 1)[0];
    const newIndex = i + 1;
    this.tasks.splice(newIndex, 0, elementToMove);
  }

  TaskModal(action: string, i: number) {
    if (action == "show") {
      console.log("SHOW mode Active");
      this.createTask.title = this.tasks[i].title;
      this.createTask.description = this.tasks[i].description;
      this.ModalShowMode = true;
    }
    if (action == "create") {
      this.ModalShowMode = false;
      this.ModalEditMode = false;
      this.createTask.title = ""
      this.createTask.description = ""
    }
  }



  private saveTasksToCookie() {
    this.cookieService.set('tasks', JSON.stringify(this.tasks), 365); // Speichert die Tasks in einem Cookie für 365 Tage
  }

}
