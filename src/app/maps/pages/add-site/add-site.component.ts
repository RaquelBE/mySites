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

    console.log('Sitio añadido:', this.siteForm.value);
    //limpio el formulario
    this.siteForm.reset();
  }
}
