import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { ClockComponent } from './clock/clock.component';
import { CopyTextComponent } from './copy-text/copy-text.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    ClockComponent,
    CopyTextComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
