import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  tasks: any[] = [];
  createTask = "";

  constructor(private cookieService: CookieService) {
    const tasksCookie = this.cookieService.get('tasks');
    if (tasksCookie) {
      this.tasks = JSON.parse(tasksCookie);
    }
  }

  addTask() {
    if (this.createTask !== "") {
      this.tasks.push(this.createTask);
      this.createTask = "";
      this.saveTasksToCookie();
    }
  }

  delTask(index: number) {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks.splice(index, 1);
      this.saveTasksToCookie();
    }
  }

  editTask(index: number){
    if (this.createTask !== "") {
    this.tasks[index] = this.createTask;
    this.saveTasksToCookie();
    this.createTask = "";
    
    }


  }

  private saveTasksToCookie() {
    this.cookieService.set('tasks', JSON.stringify(this.tasks), 365); // Speichert die Tasks in einem Cookie für 365 Tage
  }

}
