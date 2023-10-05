import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as mapboxgl from 'mapbox-gl';

(mapboxgl as any).accessToken =
  'pk.eyJ1IjoicmFxdWVsMjI5MiIsImEiOiJjbG10ODFteWYwMzA0MndxcGpsNW9rd21vIn0.t1wyjbjuYEA-ZHWZs44PIg';

import { MapsRoutingModule } from './maps-routing.module';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MapsLayoutComponent } from './layaout/maps-layout/maps-layout.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';

@NgModule({
  declarations: [
    MapsLayoutComponent,
    FullScreenPageComponent,
    ZoomRangePageComponent,
  ],
  imports: [CommonModule, MapsRoutingModule, SideMenuComponent],
  exports: [ FullScreenPageComponent ],
})
export class MapsModule {}
