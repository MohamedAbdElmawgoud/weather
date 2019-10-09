import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Observable, of } from 'rxjs';

import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { share } from 'rxjs/internal/operators/share';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey: '1157c93aa5msh540a010d515466ap1ae602jsnebd26cb640b6';
  weather: any;
  url;
  constructor(public http: HttpClient) {
    this.url = `https://community-open-weather-map.p.rapidapi.com/weather?&units=metric&cnt=10&APPID=${this.apiKey}`;

  }


    private decoder: JwtHelperService;


    refreshToken(): Observable<string> {
      const url = `https://community-open-weather-map.p.rapidapi.com/weather?&units=metric&cnt=10&APPID=${this.apiKey}`;

      // append refresh token if you have one
      const refreshToken = localStorage.getItem('refreshToken');
      const expiredToken = localStorage.getItem('token');

      return this.http
        .get(url, {
          headers: new HttpHeaders()
            .set('refreshToken', refreshToken)
            .set('token', expiredToken),
          observe: 'response'
        })
        .pipe(
        share(), // <========== YOU HAVE TO SHARE THIS OBSERVABLE TO AVOID MULTIPLE REQUEST BEING SENT SIMULTANEOUSLY
        map(res => {
          const token = res.headers.get('token');
          const newRefreshToken = res.headers.get('refreshToken');
          // store the new tokens
          localStorage.setItem('refreshToken', newRefreshToken);
          localStorage.setItem('token', token);
          return token;
        })
        );
    }
    getToken(): Observable<string> {
      const token = localStorage.getItem('token');
      const isTokenExpired = this.decoder.isTokenExpired(token);

      if (!isTokenExpired) {
        return of(token);
      }

      return this.refreshToken();
    }

  getweather(city, state ) {
    return this.http.get(this.url + './' + state + './' + city ).subscribe(weather => {
      console.log(weather);
       // tslint:disable-next-line:align
      // this.weather = weather.current_observation;
      })
    , map(res => res);
  }
}
