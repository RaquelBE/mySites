import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'upload-file',
  templateUrl: './upload-file.component.html',
})
export class UploadFileComponent implements OnInit {
  base64: string = 'Base64...';
  fileSelected?: File;
  imageUrl?: string;

  constructor(private sant: DomSanitizer) {}

  ngOnInit(): void {}

  onSelectNewFile(files: any): void {
    this.fileSelected = files.target?.files[0];
    if (this.fileSelected) {
      this.imageUrl = this.sant.bypassSecurityTrustUrl(
        window.URL.createObjectURL(this.fileSelected)
      ) as string;
    }
    this.base64 = 'Base64...';
  }

  convertFileToBase64(): void {
    let reader = new FileReader();
    reader.readAsDataURL(this.fileSelected as Blob);
    reader.onloadend = () => {
      this.base64 = reader.result as string;
    };
  }
}
