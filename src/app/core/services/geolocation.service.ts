import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
@Injectable({
  providedIn: 'root'
})

export class GeolocationService {

  constructor() { }

  currentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates);
    return coordinates;
  };
}
