import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  currentLat: number = 0;
  currentLong: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private uploadImageService: UploadImageService
  ) {
    this.siteForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
    });
  }

  addPlace() {
    this.siteForm.value.lat = this.childComponent.place.center[1];
    this.siteForm.value.long = this.childComponent.place.center[0];
    this.siteForm.value.id = this.childComponent.place.id;
    this.siteForm.value.name = this.childComponent.place.place_name;

    const storedSites = localStorage.getItem('sites');
    const sites = storedSites ? JSON.parse(storedSites) : [];

    //agrego el nuevo sitio al []
    sites.push(this.siteForm.value);

    //guardo el [] actualizado en localStorage
    localStorage.setItem('sites', JSON.stringify(sites));

    //limpio el formulario
    this.siteForm.reset();
  }

  uploadNewImage($event: any) {
    this.fileToUpload = $event.target.files[0];
    this.uploadImage();
  }

  uploadImage() {
    const data: any = new FormData();
    data.append('file', this.fileToUpload);
    const timestamp = new Date().getTime(); // Obtiene una marca de tiempo única
    const fileName = `image_${timestamp}`; // Genera un nombre de archivo único basado en la marca de tiempo
    data.append('upload_preset', 'fcmtmv8a');
    data.append('cloud_name', 'do4qibr9d');
    data.append('public_id', fileName); // Utiliza el nombre de archivo generado
    this.uploadImageService
      .uploadSignature(data)
      .subscribe((imageData: any) => {
        this.siteForm.value.image = imageData.url;
      });
  }
}
