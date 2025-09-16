export interface Reminder {
  id: number;
  tipo: 'remedio' | 'consulta';  
  nome: string;
  numero: string;
  responsavelNumero: string;
  remedio?: string;
  dosagem?: string;
  mensagem?: string;
  horario?: string;
  data?: string;
  local?: string;

  confirmado?: boolean;
}
