import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReminderService } from '../../services/reminder.service';

@Component({
  selector: 'app-reminder-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.scss']
})
export class ReminderListComponent {
  reminders = this.reminderService.reminders;

  constructor(private reminderService: ReminderService) {}

  deletar(id: number) {
    this.reminderService.deletar(id);
  }
}
