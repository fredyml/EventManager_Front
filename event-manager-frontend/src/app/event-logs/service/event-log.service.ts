import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventLog } from './../model/event-log.model';

@Injectable({
    providedIn: 'root'
})
export class EventLogService {

    private apiUrl = 'https://localhost:7055/api/Events';

    constructor(private http: HttpClient) { }

    getEvents(eventTypeId?: number, startDate?: string, endDate?: string) {
        const params: { [key: string]: any } = {}; 

        if (eventTypeId) {
            params['eventTypeId'] = eventTypeId;
        }

        if (startDate) {
            const startDateObject = new Date(startDate);
            if (!isNaN(startDateObject.getTime())) {
                params['startDate'] = startDateObject.toISOString().split('T')[0];
            }
        }

        if (endDate) {
            const endDateObject = new Date(endDate);
            if (!isNaN(endDateObject.getTime())) {
                params['endDate'] = endDateObject.toISOString().split('T')[0];
            }
        }

        return this.http.get<EventLog[]>(this.apiUrl, { params });
    }

    addEvent(event: EventLog) {
        return this.http.post(this.apiUrl, event, { observe: 'response', responseType: 'text' });
    }
}
