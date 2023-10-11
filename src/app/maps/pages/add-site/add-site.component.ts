import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'add-site',
  templateUrl: './add-site.component.html',
  styleUrls: ['./add-site.component.css'],
})
export class AddSiteComponent {
  siteForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.siteForm = this.formBuilder.group({
      name: '',
      description: ''
    });
  }

  onSubmit() {
    this.siteForm.value.image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Avila_001.jpg/1200px-Avila_001.jpg'
    this.siteForm.value.lat = 42.033272;
    this.siteForm.value.long = -3.591411;
    this.siteForm.value.id = 4;

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
}
