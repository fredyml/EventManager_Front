import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventLog } from './../model/event-log.model';

@Injectable({
  providedIn: 'root'
})
export class EventLogService {

  private apiUrl = 'https://yourbackend/api/events'; 

  constructor(private http: HttpClient) { }

  getEvents(eventTypeId?: number, startDate?: Date, endDate?: Date) {
    let params: { [key: string]: string } = {};
    
    if (eventTypeId) {
      params['eventTypeId'] = eventTypeId.toString();
    }

    if (startDate) {
      params['startDate'] = startDate.toISOString();
    }

    if (endDate) {
      params['endDate'] = endDate.toISOString();
    }

    return this.http.get<EventLog[]>(this.apiUrl, { params });
  }
}
