import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventLog } from './../model/event-log.model';

@Injectable({
    providedIn: 'root'
})
export class EventLogService {

    private apiUrl = 'https://localhost:7055/api/Events';

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

    addEvent(event: EventLog) {
        return this.http.post(this.apiUrl, event, { observe: 'response', responseType: 'text' });
    }
}
