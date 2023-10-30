import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapsLayoutComponent } from './layaout/maps-layout/maps-layout.component';

import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';
import { AddSiteComponent } from './pages/add-site/add-site.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { Error404PageComponent } from './pages/page-error404/error404-page.component';
import { AboutMeComponent } from '../components/about-me/about-me.component';

const routes: Routes = [
  {
    path: '',
    component: MapsLayoutComponent,
    children: [
      { path: 'fullscreen', component: FullScreenPageComponent },
      { path: 'zoom-range', component: ZoomRangePageComponent },
      { path: 'add-site', component: AddSiteComponent },
      { path: 'detail/:id', component: DetailPageComponent },
      { path: '**', component: Error404PageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapsRoutingModule {}
