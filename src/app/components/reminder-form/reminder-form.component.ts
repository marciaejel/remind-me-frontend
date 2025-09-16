import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReminderService } from '../../services/reminder.service';
import { PhoneMaskDirective } from '../../helpers/phone-mask.directive';

@Component({
  selector: 'app-reminder-form',
  standalone: true,
  imports: [CommonModule, FormsModule, PhoneMaskDirective],
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss']
})
export class ReminderFormComponent {
  tipo: 'remedio' | 'consulta' = 'remedio';

  nome: string = '';
  numero: string = '';
  responsavelNumero: string = '';

  // Remédio
  remedio: string = '';
  dosagem: string = '';
  mensagem: string = '';
  horario: string = '';

  // Consulta/Exame
  dataConsulta: string = '';
  horarioConsulta: string = '';
  localConsulta: string = '';
  mensagemConsulta: string = '';

  constructor(private reminderService: ReminderService) {}

  validarTelefone(numero: string): boolean {
    const regex = /^(\(?\d{2}\)?\s?)?9?\d{4}-?\d{4}$/;
    return regex.test(numero);
  }

  formValido(): boolean {
    if (!this.nome.trim() || !this.numero.trim() || !this.responsavelNumero.trim()) return false;
    if (!this.validarTelefone(this.numero) || !this.validarTelefone(this.responsavelNumero)) return false;

    if (this.tipo === 'remedio') {
      return !!this.remedio.trim() && !!this.dosagem.trim() && !!this.horario.trim();
    } else {
      return !!this.dataConsulta && !!this.horarioConsulta && !!this.localConsulta.trim();
    }
  }

  adicionar() {
    if (!this.formValido()) return;

    if (this.tipo === 'remedio') {
      this.reminderService.agendar({
        tipo: this.tipo,
        nome: this.nome,
        numero: this.numero,
        responsavelNumero: this.responsavelNumero,
        remedio: this.remedio,
        dosagem: this.dosagem,
        mensagem: this.mensagem,
        horario: this.horario
      });
    } else {
      this.reminderService.agendar({
        tipo: this.tipo,
        nome: this.nome,
        numero: this.numero,
        responsavelNumero: this.responsavelNumero,
        data: this.dataConsulta,
        horario: this.horarioConsulta,
        local: this.localConsulta,
        mensagem: this.mensagemConsulta
      });
    }

    // Resetar campos
    this.remedio = '';
    this.dosagem = '';
    this.mensagem = '';
    this.horario = '';
    this.dataConsulta = '';
    this.horarioConsulta = '';
    this.localConsulta = '';
  }
}
