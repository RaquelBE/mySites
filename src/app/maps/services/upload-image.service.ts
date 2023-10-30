import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  constructor(private httpClient: HttpClient) {}

  uploadSignature(vals: any): Observable<any> {
    let data = vals;
    return this.httpClient.post(
      'https://api.cloudinary.com/v1_1/do4qibr9d/image/upload',
      data
    );
  }
}
