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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { HttpClientModule } from '@angular/common/http';
import { Error404PageComponent } from './pages/page-error404/error404-page.component';

@NgModule({
  declarations: [
    MapsLayoutComponent,
    FullScreenPageComponent,
    ZoomRangePageComponent,
    AddSiteComponent,
    DetailPageComponent,
    SearchBarComponent,
    SearchResultsComponent,
    Error404PageComponent,
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    HttpClientModule,
    SideMenuComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [FullScreenPageComponent, Error404PageComponent],
})
export class MapsModule {}
