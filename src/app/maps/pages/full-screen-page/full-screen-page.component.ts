import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker, Popup } from 'mapbox-gl';
import dataBase from '../../../../../dataBase/data.json';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface Place {
  id: number,
  name: String,
  lat: number,
  long: number,
  image: string
}

@Component({
  selector: 'full-screen-page',
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css'],
})
export class FullScreenPageComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-3.691538117018581, 40.4168);
  public places: [] = [];

  ngAfterViewInit(): void {
    if (!localStorage.getItem('sites'))
      localStorage.setItem('sites', JSON.stringify(dataBase));

    let localStorageDataBase = localStorage.getItem('sites');
    if (localStorageDataBase) this.places = JSON.parse(localStorageDataBase);
   
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';
    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 5.5, // starting zoom
    });

    this.places.forEach((place) => {
        this.addMarker(place);
    });

    // POP-UP
    if (!this.map) return;
  }

  /* createMarker() {
    if (!this.map) return;
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const lngLat = this.map.getCenter();
  } */

  addMarker(place: Place) {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
          ((Math.random() * 16) | 0).toString(16)
        );

    const popup = new Popup({ closeButton: true }).setHTML(`
        <h6>${place.name}</h6>
        <img src="${place.image}" width="100px" />
      `);
    const lngLat = new LngLat(place.long, place.lat)
    const marker = new Marker({
      color: color,
      draggable: false, //esto hace que puedas mover el marcador
    })
      .setLngLat(lngLat)
      .setPopup(popup)
      .addTo(this.map);
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove(); //elimina el marcador del mapa, pero deja la "etiqueta"
    this.markers.splice(index, 1); //elimina la "etiqueta"
  }

  // flyTo -> hace que vaya al marcador que indiques pulsando en la "etiqueta" de forma animada
  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    });
  }
}
