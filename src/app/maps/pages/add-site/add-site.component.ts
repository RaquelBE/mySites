import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { UploadImageService } from '../../services/upload-image.service';

@Component({
  selector: 'add-site',
  templateUrl: './add-site.component.html',
  styleUrls: ['./add-site.component.css'],
})
export class AddSiteComponent {
  @ViewChild(SearchBarComponent) childComponent!: SearchBarComponent;
  siteForm: FormGroup;
  imageUrl?: string;
  fileToUpload: File | null = null;

  constructor(private formBuilder: FormBuilder, private uploadImageService: UploadImageService) {
    this.siteForm = this.formBuilder.group({
      name: '',
      description: '',
      image: undefined,
    });
  }

  addPlace() {
    /*  this.siteForm.value.image =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Avila_001.jpg/1200px-Avila_001.jpg';  */
    this.siteForm.value.lat = this.childComponent.place.center[1];
    this.siteForm.value.long = this.childComponent.place.center[0];
    this.siteForm.value.id = this.childComponent.place.id;
    this.siteForm.value.name = this.childComponent.place.place_name;
    console.log('IMAGE', this.siteForm.value.image); // este console.log -> image: null

    const storedSites = localStorage.getItem('sites');
    const sites = storedSites ? JSON.parse(storedSites) : [];

    //agrego el nuevo sitio al []
    sites.push(this.siteForm.value);

    //guardo el [] actualizado en localStorage
    localStorage.setItem('sites', JSON.stringify(sites));

    console.log('Sitio añadido:', this.siteForm.value);
    //limpio el formulario
    this.siteForm.reset();
  }

  prueba($event: any) {
    console.log('PRUEBA', $event);
    this.fileToUpload = $event.target.files[0];
    this.uploadImage();
  }

  uploadImage() {
    const data: any = new FormData();
    data.append('file', this.fileToUpload);
    console.log("FICHERO", this.fileToUpload)
    data.append('upload_preset', 'fcmtmv8a');
    data.append('cloud_name', 'do4qibr9d');
    data.append('public_id', this.fileToUpload?.name);
    this.uploadImageService.uploadSignature(data).subscribe((imageData : any) => {
     console.log("LALAALA", imageData) //no se ejecuta este console.log
     this.siteForm.value.image = imageData.url;
    });
  }
}
