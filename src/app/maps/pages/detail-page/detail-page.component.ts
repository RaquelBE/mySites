import { Component, OnInit } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';
import { ActivatedRoute, Router } from '@angular/router';
import dataBase from '../../../../../dataBase/data.json';

interface Place {
  id: number;
  name: String;
  lat: number;
  long: number;
  image: string;
  description: string;
}

@Component({
  selector: 'detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
})
export class DetailPageComponent implements OnInit {
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-3.691538117018581, 40.4168);
  public sites: [] = [];
  public newPlace?: Place ;
  public description: string =  "";

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    if (!localStorage.getItem('sites'))
      localStorage.setItem('sites', JSON.stringify(dataBase));

    let localStorageDataBase = localStorage.getItem('sites');
    if (localStorageDataBase) this.sites = JSON.parse(localStorageDataBase);
    console.log("SITES", this.sites)
    // Obtener el parámetro "id" de la URL
    this.route.params.subscribe((params) => {
      const id = params['id'];

      // Buscar el lugar por ID
      const place = this.sites.find((site: any) => site.id === id);
      //si place no tiene nada, redirigir al usuario a la página 404
      this.newPlace = place;      
    });
  }
}
