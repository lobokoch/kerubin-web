/**********************************************************************************************
Code generated by MKL Plug-in
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, SelectItem } from 'primeng/api';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { AgendaService } from './agenda.service';

import { AuthService } from './../../../security/auth.service';
import { Router } from '@angular/router';
import { Md5 } from 'md5-typescript';
import { ParametrosAgenda, CompromissoDTO, RecursoDTO } from './agenda.model';


import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendar } from 'primeng/fullcalendar';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})

export class AgendaComponent implements OnInit, AfterViewInit, OnDestroy {

  pollingAgenda: any;

  showHideHelp = false; // for show/hide help.

  recursos: SelectItem[];
  recursosSelecionados: string[];

  competencia = moment();
  calendarDate = this.competencia;

  competenciaStr = this.competencia.format('YYYY-MM-DD');
  events: any[];

  options: any;

  @ViewChild('fc') fc: FullCalendar;
  constructor(
    private agendaService: AgendaService,
    private confirmation: ConfirmationService,
    private messageHandler: MessageHandlerService,
    private router: Router,
    private authService: AuthService
  ) {
    // Nothing yet.
  }

  onRecursoChanged(event) {
    this.getAgendaDoMes();
  }

  ngOnInit() {

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: this.competenciaStr,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,timeGridDay,listWeek'
      },
      buttonText: { today: 'Hoje', month: 'Mês', week: 'Semana', day: 'Dia', list: 'Lista' },
      allDayText: 'Dia todo',
      editable: true,
      locale: 'pt-br',
      eventClick: (sender) => {
        const event = sender.event;
        this.router.navigate(['/compromisso', event.id, 'agenda']);
      },
      dateClick: (sender) => {
        this.router.navigate(['/compromisso/novo', 'agenda', sender.dateStr]);
      },
      datesRender: (event) => {
        try {
          this.calendarDate = moment(this.fc?.calendar?.getDate());
          if (this.calendarDate && this.competencia && (this.calendarDate.year() !== this.competencia.year() || this.calendarDate.month() !== this.competencia.month())) {
            this.competencia = this.calendarDate;
            this.getAgendaDoMes();
          }
        } catch (e) {
          console.log('Erro no evento datesRender:' + e);
        }

      }
    };

    this.getAgendaDoMes();

    if (!this.pollingAgenda) {
      this.pollingAgenda = setInterval(function() {
        this.getAgendaDoMes();
      }.bind(this), 1000 * 60); // call each 60 seconds
    }

  }

  getAgendaDoMes() {
    const params = new ParametrosAgenda();
    params.ano = this.competencia.year();
    params.mes = this.competencia.month() + 1;
    params.recursoEmails = this.recursosSelecionados;
    this.agendaService.getAgendaDoMes(params)
      .then((agenda) => {
        this.events = this.compromissosToAgendaEvents(agenda?.compromissos);
        if (!this.recursos || this.recursos.length === 0) {
          this.recursos = this.getRecursos(agenda?.recursos);
        }

        this.notificarCompromissosDoUsuario(agenda?.recursos);
      }).catch((e) => {
        console.log('Erro em getAgendaDoMes:' + e);
      });

  }

  getRecursos(recursos: RecursoDTO[]): any {
    let data = [];
    this.recursosSelecionados = new Array();
    if (recursos) {
      data = recursos.map(it => {
        this.recursosSelecionados.push(it.email);
        return { label: it.nome, value: it.email };
      });
    }

    return data;
  }

  notificarCompromissosDoUsuario(recursos: RecursoDTO[]) {
    let count = 0;

    if (recursos) {
      let email = null;
      if (this.authService.getCurrentUser()) {
        email = this.authService.getCurrentUser();
      }
      if (email) {
        const recursoCorente = recursos.find((it) => it.email === email);
        count = recursoCorente?.compromissosCount ?? 0;
      }
    }

    console.log('Vai chamar a notificação da agenda com valor:' + count);
    this.agendaService.onChangeCompromissosCountDoRecursoCorrente(count);
  }

  compromissosToAgendaEvents(compromissos: CompromissoDTO[]): any {
    let data = [];
    if (compromissos) {
      data = compromissos.map((compromisso => {
        const start = moment(compromisso.dataIni).format('YYYY-MM-DD') + 'T' + compromisso.horaIni;
        const end = moment(compromisso.dataFim).format('YYYY-MM-DD') + 'T' + compromisso.horaFim;

        const situacao = compromisso?.situacao?.toLowerCase() ?? 'nao_iniciado';
        const className = situacao !== 'nao_iniciado' ?
         `kb-calendar-event-${situacao}` : null;

        return {
          id: compromisso.id,
          title: compromisso.titulo,
          start: start,
          end: end,
          allDay: compromisso?.diaTodo ?? false,
          className: className
        };
      }));
    }
    return data;
  }

  getAvatarURL(_email: string): string {
    const email = _email ? _email : 'unknowuser@kerubin.com.br';
    const hash = Md5.init(email);
    return `https://www.gravatar.com/avatar/${hash}?d=mp&s=30"`;
  }

  getShowHideHelpLabel(): string {
    return this.showHideHelp ? 'Ocultar ajuda' : 'Mostrar ajuda';
  }


  ngAfterViewInit() {

  }

  ngOnDestroy() {
    if (this.pollingAgenda) {
      clearInterval(this.pollingAgenda);
    }
  }

}
