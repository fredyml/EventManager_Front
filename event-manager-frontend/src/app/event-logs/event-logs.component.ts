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
    const currentDate = new Date();

    const newEvent: EventLog = {
      date: currentDate,
      description: '',
      eventTypeId: this.eventTypeId || 0
    };

    this.eventLogs.unshift(newEvent);
  }

  formatDate(date?: Date): string {
    if (!date) {
      return 'N/A'; 
    }
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
  }
}
