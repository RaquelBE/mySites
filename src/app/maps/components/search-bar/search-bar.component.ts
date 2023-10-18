import { Component } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Feature } from '../../interfaces/places';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  private debounceTimer?: NodeJS.Timeout;
  public place!: Feature;
  public placeName: string = '';
  public base64: string = '';

  constructor(private placesService: PlacesService) {}

  onQueryChanged(query: string = '') {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      this.placesService.getPlacesByQuery(query);
    }, 350);
  }

  finishInput(place: any) {
    this.place = place;
    this.placeName = place.place_name;
    this.base64 = place.base64;
  }
}
