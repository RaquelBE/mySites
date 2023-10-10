import { Component } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';
import { ActivatedRoute, Router } from '@angular/router';
import dataBase from '../../../../../dataBase/data.json';

@Component({
  selector: 'detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
})
export class DetailPageComponent {
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-3.691538117018581, 40.4168);
  public sites: [] = [];
  public newPlace: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngAfterViewInit(): void {
    if (!localStorage.getItem('sites'))
      localStorage.setItem('sites', JSON.stringify(dataBase));

    let localStorageDataBase = localStorage.getItem('sites');
    if (localStorageDataBase) this.sites = JSON.parse(localStorageDataBase);

    // Obtener el parámetro "id" de la URL
    this.route.params.subscribe((params) => {
      const id = params['id'];

      // Buscar el lugar por ID
      const place = this.sites.find((p: any) => p.id === Number(id));
      this.newPlace = place;
    });
  }
}
