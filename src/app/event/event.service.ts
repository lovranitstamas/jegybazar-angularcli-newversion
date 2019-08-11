import {Injectable} from '@angular/core';
//import {EventModel} from './event-model';
import {EventModel} from '../shared/event-model';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {map,switchMap} from 'rxjs/operators';

@Injectable()
export class EventService {
  
  constructor(private _http: HttpClient) {
    /*this._events = [
      new EventModel({
        id: 1,
        name: 'Fezen',
        date: '2017-08-03',
        pictureURL: 'http://mafsz.org/wp-content/uploads/2014/05/fezen.png',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo.'
      }),
      new EventModel({
        id: 2,
        name: 'SZIN',
        date: '2017-11-23',
        pictureURL: 'https://www.koncert.hu/uploads/concerts/koncert-20140625-11470-szin_2014_2.jpg',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
      }),
      new EventModel({
        id: 3,
        name: 'Rockmaraton',
        date: '2018-02-11',
        pictureURL: 'http://www.rockmaraton.hu/media/images/rockmaraton-2018-jegyvasarlas.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, necessitatibus.'
      }),
      new EventModel({
        id: 4,
        name: 'Black Hat USA',
        date: '2017-08-03',
        pictureURL: 'https://www.blackhat.com/images/page-graphics/metatag/event-logo-us17.png',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo.'
      }),
      new EventModel({
        id: 5,
        name: 'TEdx',
        date: '2017-11-23',
        pictureURL: 'https://i0.wp.com/www.tedxwellington.com/wp-content/uploads/2017/02/tedx-bulb.jpg',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
      }),
      new EventModel({
        id: 6,
        name: 'ng-conf',
        date: '2018-02-11',
        pictureURL: 'https://cdn-images-1.medium.com/max/1270/1*2j7MOWb0s5pZpQLu7d-5CQ.png',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, necessitatibus.'
      }),
      new EventModel({
        id: 7,
        name: 'Sziget Fesztivál',
        date: '2017-08-03',
        pictureURL: 'assets/sziget.png',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo.'
      }),
      new EventModel({
        id: 8,
        name: 'Diótörő Balett',
        date: '2017-11-23',
        pictureURL: 'assets/diotoro.jpg',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
      }),
      new EventModel({
        id: 9,
        name: 'Macskák Musical',
        date: '2018-02-11',
        pictureURL: 'assets/macskak.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, necessitatibus.'
      })
    ];*/

  }

  getAllEvents(): Observable<EventModel[]> {
    return this._http.get<EventModel[]>(`${environment.firebase.baseUrl}/events.json`).pipe(
    map(data => Object.values(data).map(evm => new EventModel(evm))));
  }

  getEventById(id: string) {
    return this._http.get<EventModel>(`${environment.firebase.baseUrl}/events/${id}.json`);
  }
  
  save(param: EventModel) {
    console.log(param);
    if (param.id) {
      return this._http.put(`${environment.firebase.baseUrl}/events/${param.id}.json`, param);
    } else {
      return this._http.post(`${environment.firebase.baseUrl}/events.json`, param).pipe(
        map((fbPostReturn: { name: string }) => fbPostReturn.name)).pipe( 
        switchMap(fbId => this._http.patch( 
          `${environment.firebase.baseUrl}/events/${fbId}.json`, 
          {id: fbId} 
        ))); 
    }
  }

  delete(param: EventModel) {
    return this._http.delete(`${environment.firebase.baseUrl}/events/${param.id}.json`);
  }

  addTicket(eventId: string, ticketId: string): Observable<string> { 
    return this._http.patch( 
      `${environment.firebase.baseUrl}/events/${eventId}/tickets.json`, 
      {[ticketId]: true} 
    ).pipe( 
      map(rel => Object.keys(rel)[0])
    );  
  }   
}