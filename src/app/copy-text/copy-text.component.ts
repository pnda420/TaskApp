import { Component,Renderer2  } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-copy-text',
  templateUrl: './copy-text.component.html',
  styleUrls: ['./copy-text.component.css']
})
export class CopyTextComponent {
  texts: any[] = [];
  createText = "";
  showCopyNotification = false;

  constructor(private cookieService: CookieService,private renderer: Renderer2) {
    const tasksCookie = this.cookieService.get('texts');
    if (tasksCookie) {
      this.texts = JSON.parse(tasksCookie);
    }
  }

  addText() {
    if (this.createText !== "" && this.createText.length < 26) {
      this.texts.push(this.createText);
      this.createText = "";
      this.saveTextToCookie();
    }
  }

  delText(index: number) {
    if (index >= 0 && index < this.texts.length) {
      this.texts.splice(index, 1);
      this.saveTextToCookie();
    }
  }

  copyText(index: number){
    const textarea = document.createElement('textarea');
    textarea.value = this.texts[index];
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    this.showCopyNotification = true;

    // Hide the notification after 3 seconds (adjust the time as needed)
    setTimeout(() => {
      this.showCopyNotification = false;
    }, 3000);
  }

  goUp(i: number){
    if (i > 0 && i < this.texts.length) {
      const elementToMove = this.texts.splice(i, 1)[0]; 
      const newIndex = i - 1; 
      this.texts.splice(newIndex, 0, elementToMove); 
    }
  }

  goDown(i:number){
    const elementToMove = this.texts.splice(i, 1)[0];
    const newIndex = i + 1;
    this.texts.splice(newIndex, 0, elementToMove);
  }

  private saveTextToCookie() {
    this.cookieService.set('texts', JSON.stringify(this.texts), 365); // Speichert die Tasks in einem Cookie für 365 Tage
  }
}
