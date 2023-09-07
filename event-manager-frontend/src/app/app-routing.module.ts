import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventLogsComponent } from './event-logs/event-logs.component';

const routes: Routes = [
  { path: 'event-logs', component: EventLogsComponent },
  { path: '', redirectTo: '/event-logs', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
