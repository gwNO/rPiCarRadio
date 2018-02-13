import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as GPS from 'gps';
import * as gpsd from 'node-gpsd';
const gps = new GPS;

@Injectable()
export class GpsService {
  private _lon: BehaviorSubject<any> = new BehaviorSubject(null);
  private _lat: BehaviorSubject<any> = new BehaviorSubject(null);
  private _speed: BehaviorSubject<any> = new BehaviorSubject(null);
  private _direction: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
    this.getInitialState();
    const listener = new gpsd.Listener({
      port: 2947,
      hostname: 'localhost',
      logger: {
        info: (info) => { console.log('GPSlistenerinfo', info); },
        warn: (warn) => { console.warn('GPSlistenerwarn', warn); },
        error: (error) => { console.error('GPSlistenererror', error); },
      },
      parse: false
    });

    listener.connect(() => {
      listener.isConnected();
      listener.watch({ class: 'WATCH', nmea: true });
      listener.on('raw', (raw) => { gps.update(raw); });
    });

    gps.on('data', (data) => {
      this._direction.next(this.calculateBearing(this._lon.getValue(), this._lat.getValue(), gps.state.lon, gps.state.lat));
      this._lat.next(gps.state.lat);
      this._lon.next(gps.state.lon);
      this._speed.next(gps.state.speed);
    });
  }

  calculateBearing(prevLon, prevLat, newLon, newLat) {
    const φ1 = prevLat * Math.PI / 180;
    const φ2 = newLat * Math.PI / 180;
    const λ1 = prevLon * Math.PI / 180;
    const λ2 = newLon * Math.PI / 180;

    const y = Math.sin(λ2 - λ1) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1);

    const brng = Math.atan2(y, x) * 180 / Math.PI;
    return brng;
  }

  getInitialState() {
    // TODO: Get last state from mongoDB
    this._direction.next(0);
    this._lat.next(47.059627);
    this._lon.next(-1.725579);
    this._speed.next(0);
  }

  get lon() {
    return this._lon.asObservable();
  }
  get lat() {
    return this._lat.asObservable();
  }
  get speed() {
    return this._speed.asObservable();
  }
  get direction() {
    return this._direction.asObservable();
  }
}
