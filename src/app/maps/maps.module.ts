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
import { AddSiteComponent } from './pages/add-site/add-site.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MapsLayoutComponent,
    FullScreenPageComponent,
    ZoomRangePageComponent,
    AddSiteComponent,
    DetailPageComponent,
  ],
  imports: [CommonModule, MapsRoutingModule, SideMenuComponent, ReactiveFormsModule],
  exports: [ FullScreenPageComponent ],
})
export class MapsModule {}
