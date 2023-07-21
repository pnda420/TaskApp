import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  template: `
    <div class="clock">
      <h1 class="fs-5">{{ currentTime | date: 'HH:mm:ss' }}</h1>
    </div>
  `,
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {
  currentTime: Date;

  constructor() {
    this.currentTime = new Date(); // Initialize currentTime in the constructor
  }

  ngOnInit() {
    setInterval(() => this.updateTime(), 1000);
  }

  updateTime() {
    this.currentTime = new Date();
  }
}
