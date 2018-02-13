import { Component, OnInit } from '@angular/core';

import { GpsService } from './../../services/gps/gps.service';

@Component({
  selector: 'rpcr-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lon: number;
  lat: number;
  direction: number;

  constructor(
    private gpsService: GpsService
  ) {
    this.gpsService.lon.subscribe(lon => {
      this.lon = lon;
    });
    this.gpsService.lat.subscribe(lat => {
      this.lat = lat;
    });
    this.gpsService.direction.subscribe(direction => {
      this.direction = direction;
    });
  }

  ngOnInit() {
  }

}
