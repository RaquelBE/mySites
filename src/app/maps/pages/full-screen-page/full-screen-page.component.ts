import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker, Popup } from 'mapbox-gl';
import dataBase from '../../../../../dataBase/data.json';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface Place {
  id: number;
  name: string;
  lat: number;
  long: number;
  image: string;
  description: string;
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
  public places: [] = []; // Inicializar como una matriz de objetos Place

  ngAfterViewInit(): void {
    if (!localStorage.getItem('sites'))
      localStorage.setItem('sites', JSON.stringify(dataBase));
    let localStorageDataBase = localStorage.getItem('sites');
    if (localStorageDataBase) this.places = JSON.parse(localStorageDataBase);

    if (!this.divMap) throw 'El elemento HTML no fue encontrado';
    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.currentLngLat,
      zoom: 5.5,
    });

    this.places.forEach((place) => {
      this.addMarker(place);
    });

    // POP-UP
    if (!this.map) return;
  }

  addMarker(place: Place) {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const popup = new Popup({ closeButton: true }).setHTML(`
    <a id="popup-link" href="/maps/detail/${place.id}">
      <h6>${place.name}</h6>
      <img src="${place.image}" width="100px" />
    </a>
  `);

    const lngLat = new LngLat(place.long, place.lat);
    const marker = new Marker({
      color: color,
      draggable: false,
    })
      .setLngLat(lngLat)
      .setPopup(popup)
      .addTo(this.map);

    const popupLink = popup.getElement()?.querySelector('#popup-link');
    if (popupLink) {
      popupLink.addEventListener('click', (event) => {
        event.preventDefault();

        const href = popupLink.getAttribute('href');
        if (href) {
          window.location.href = href;
        }
      });
    }
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    });
  }
}
