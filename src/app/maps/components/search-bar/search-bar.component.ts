import { Component } from '@angular/core';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  private debounceTimer?: NodeJS.Timeout;
  public placeName: string = '';

  constructor(private placesService: PlacesService) {}

  onQueryChanged(query: string = '') {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      this.placesService.getPlacesByQuery(query);
    }, 350);
  }

  finishInput(place: any) {
    this.placeName = place.place_name;
  }
}
