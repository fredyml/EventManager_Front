import { Component, OnInit } from '@angular/core';
import { EventLog } from './model/event-log.model';
import { EventLogService } from './service/event-log.service';

@Component({
  selector: 'app-event-logs',
  templateUrl: './event-logs.component.html',
  styleUrls: ['./event-logs.component.css']
})
export class EventLogsComponent implements OnInit {

  eventTypes = [
    { id: 0, name: 'Error Técnico' },
    { id: 1, name: 'Error de Negocio' },
    { id: 2, name: 'Otro' }
  ];

  eventLogs: EventLog[] = [];
  eventTypeId?: number;
  startDate?: Date;
  endDate?: Date;

  constructor(private eventLogService: EventLogService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventLogService.getEvents(this.eventTypeId, this.startDate, this.endDate)
      .subscribe(data => this.eventLogs = data);
  }

  onFilterChange(): void {
    this.loadEvents();
  }

  addNewEvent() {
    this.eventLogs.push({
      id: 0, 
      date: new Date(), 
      description: "",
      eventTypeId: 0  
    });
  }
}
