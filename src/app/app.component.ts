import { Component } from '@angular/core';
import { ReminderFormComponent } from './components/reminder-form/reminder-form.component';
import { ReminderListComponent } from './components/reminder-list/reminder-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReminderFormComponent, ReminderListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
