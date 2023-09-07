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
    { id: 1, name: 'Error Técnico' },
    { id: 2, name: 'Error de Negocio' },
    { id: 3, name: 'Otro' }
  ];

  eventLogs: EventLog[] = [];
  eventTypeId?: number;
  startDate?: Date;
  endDate?: Date;
  eventDescription: string = '';

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

  addNewRow() {
    const eventType = this.eventTypes.find(type => type.id === (this.eventTypeId || 0));

    const newEmptyEvent: EventLog = {
      id: 0,
      isNew: true,
      date: new Date().toISOString(),
      description: this.eventDescription,
      eventTypeId: this.eventTypeId || 0,
      eventType: {
        id: eventType?.id || 0,
        name: eventType?.name || ''
      }
    };

    this.eventLogs.unshift(newEmptyEvent);
  }

  addNewEvent() {
    const newEvents = this.eventLogs.filter(event => event.isNew);
    newEvents.forEach(event => {
      if (event.eventTypeId === undefined) {
        console.error('Error: eventTypeId is not set.');
        return;
      }

      this.eventLogService.addEvent(event).subscribe(
        (response) => {
          alert(response.body);
          event.isNew = false; 
          this.loadEvents();
        },
        (error) => {
          console.error('Error adding new event:', error);
          alert('Hubo un error al registrar el evento.');
        }
      );
    });
}


  formatDate(dateStr?: string): string {
    if (!dateStr) {
      return 'N/A';
    }
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
  }
}
