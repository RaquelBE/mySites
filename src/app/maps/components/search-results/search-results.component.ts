import { Component, EventEmitter, Output } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Feature } from '../../interfaces/places';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent {
  @Output() sendPlace = new EventEmitter<any>();
  
  constructor(private placesService: PlacesService) {}

  get isLoadingPlaces(): Boolean {
    return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesService.places;
  }

  onePlace(place: Feature) {
    this.sendPlace.emit(place);
  }
}
