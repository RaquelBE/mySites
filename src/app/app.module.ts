import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { MapsModule } from './maps/maps.module';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, MapsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
