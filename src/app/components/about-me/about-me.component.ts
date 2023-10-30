import { Component } from '@angular/core';

@Component({
  selector: 'about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
})
export class AboutMeComponent {
  downloadCV() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '../../../assets/CV Raquel Blázquez.pdf');
    link.setAttribute('download', 'CV Raquel Blázquez.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
