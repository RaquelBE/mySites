import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'add-site',
  templateUrl: './add-site.component.html',
  styleUrls: ['./add-site.component.css'],
})
export class AddSiteComponent {
  @ViewChild(SearchBarComponent) childComponent! : SearchBarComponent;
  siteForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.siteForm = this.formBuilder.group({
      name: '',
      description: '',
    });
  }

  addPlace() {
    this.siteForm.value.image =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Avila_001.jpg/1200px-Avila_001.jpg';
    this.siteForm.value.lat = 42.033272;
    this.siteForm.value.long = -3.591411;
    this.siteForm.value.id = 4;
    this.siteForm.value.name = this.childComponent.placeName;

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
