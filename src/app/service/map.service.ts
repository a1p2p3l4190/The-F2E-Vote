import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private _http: HttpClient) { }
  getMapData(): Observable<any> {
    const jsonUrl = 'assets/tw.json';
    return this._http.get(jsonUrl)
  }
}
