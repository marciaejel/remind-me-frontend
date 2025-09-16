import { Injectable, signal, computed } from '@angular/core';
import { Reminder } from './reminder.model';

@Injectable({ providedIn: 'root' })
export class ReminderService {
  private remindersSignal = signal<Reminder[]>([]);
  private idCounter = 1;

  reminders = computed(() => this.remindersSignal());

  agendar(reminder: Omit<Reminder, 'id' | 'confirmado'>) {
    const newReminder: Reminder = { id: this.idCounter++, confirmado: false, ...reminder };
    this.remindersSignal.update(list => [...list, newReminder]);

    if (newReminder.tipo === 'remedio') {
      console.log(`Mensagem para idoso ${newReminder.nome}: Hora de tomar ${newReminder.remedio} (${newReminder.dosagem}).`);
    } else {
      console.log(`Mensagem para idoso ${newReminder.nome}: Consulta em ${newReminder.local} no dia ${newReminder.data}.`);
    }

    setTimeout(() => {
      const r = this.remindersSignal().find(rem => rem.id === newReminder.id);
      if (r && !r.confirmado) {
        console.log(`Mensagem para responsável ${r.responsavelNumero}: O idoso ${r.nome} não confirmou ${r.tipo === 'remedio' ? 'o remédio' : 'a consulta'}!`);
      }
    }, 10 * 60 * 1000);
  }

  atualizar(id: number, updated: Omit<Reminder, 'id' | 'confirmado'>) {
    this.remindersSignal.update(list =>
      list.map(rem => (rem.id === id ? { ...rem, ...updated } : rem))
    );
  }

  deletar(id: number) {
    this.remindersSignal.update(list => list.filter(rem => rem.id !== id));
  }

  marcarTomou(id: number) {
    this.remindersSignal.update(list =>
      list.map(rem => (rem.id === id ? { ...rem, confirmado: true } : rem))
    );
  }
}
