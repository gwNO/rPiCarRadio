import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularOpenlayersModule } from 'ngx-openlayers';

import { AppComponent } from './app.component';

import { MapComponent } from './components/map/map.component';

import { GpsService } from './services/gps/gps.service';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AngularOpenlayersModule
  ],
  providers: [
    GpsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
