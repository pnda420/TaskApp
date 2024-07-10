import { Component, Renderer2 } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-copy-text',
  templateUrl: './copy-text.component.html',
  styleUrls: ['./copy-text.component.css']
})
export class CopyTextComponent {
  texts: { header: string, text: string }[] = [];
  createText = "";
  createHeader = "";
  filterText = "";  // Neue Variable für den Filtertext
  showCopyNotification = false;
  editMode = false;
  editIndex = -1;
  editHeader = "";
  editText = "";

  constructor(private cookieService: CookieService, private renderer: Renderer2) {
    const tasksCookie = this.cookieService.get('texts');
    if (tasksCookie) {
      this.texts = JSON.parse(tasksCookie).map((text: any) => ({
        ...text,
        text: text.text.replace(/\\n/g, '\n') // Zeilenumbrüche wiederherstellen
      }));
    }
  }

  addText() {
    if (this.createHeader !== "" && this.createText !== "") {
      this.texts.push({ header: this.createHeader, text: this.createText });
      this.createHeader = "";
      this.createText = "";
      this.saveTextToCookie();
    }
  }

  delText(index: number) {
    const originalIndex = this.getFilteredTexts()[index].originalIndex;
    if (originalIndex >= 0 && originalIndex < this.texts.length) {
      this.texts.splice(originalIndex, 1);
      this.saveTextToCookie();
    }
  }

  copyText(index: number) {
    const originalIndex = this.getFilteredTexts()[index].originalIndex;
    const textarea = document.createElement('textarea');
    textarea.value = this.texts[originalIndex].text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    this.showCopyNotification = true;

    setTimeout(() => {
      this.showCopyNotification = false;
    }, 3000);
  }

  goUp(i: number) {
    if (i > 0 && i < this.texts.length) {
      const elementToMove = this.texts.splice(i, 1)[0];
      const newIndex = i - 1;
      this.texts.splice(newIndex, 0, elementToMove);
      this.saveTextToCookie();
    }
  }

  goDown(i: number) {
    if (i >= 0 && i < this.texts.length - 1) {
      const elementToMove = this.texts.splice(i, 1)[0];
      const newIndex = i + 1;
      this.texts.splice(newIndex, 0, elementToMove);
      this.saveTextToCookie();
    }
  }

  private saveTextToCookie() {
    this.cookieService.set('texts', JSON.stringify(this.texts.map((text: any) => ({
      ...text,
      text: text.text.replace(/\n/g, '\\n') // Zeilenumbrüche kodieren
    }))), 365); // Speichert die Tasks in einem Cookie für 365 Tage
  }

  getFilteredTexts() {
    return this.texts
      .map((item, index) => ({ ...item, originalIndex: index }))
      .filter(item =>
        item.header.toLowerCase().includes(this.filterText.toLowerCase()) ||
        item.text.toLowerCase().includes(this.filterText.toLowerCase())
      );
  }

  editTextMethod(index: number) {
    const originalIndex = this.getFilteredTexts()[index].originalIndex;
    this.editMode = true;
    this.editIndex = originalIndex;
    this.editHeader = this.texts[originalIndex].header;
    this.editText = this.texts[originalIndex].text;
  }

  saveEdit() {
    if (this.editHeader !== "" && this.editText !== "") {
      this.texts[this.editIndex] = { header: this.editHeader, text: this.editText };
      this.editMode = false;
      this.editIndex = -1;
      this.editHeader = "";
      this.editText = "";
      this.saveTextToCookie();
    }
  }

  cancelEdit() {
    this.editMode = false;
    this.editIndex = -1;
    this.editHeader = "";
    this.editText = "";
  }
}
