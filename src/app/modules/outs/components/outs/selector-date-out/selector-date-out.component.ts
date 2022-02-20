import {Component, EventEmitter, OnInit, Output} from '@angular/core';

interface Years {
  value: string;
  name: string;
}

@Component({
  selector: 'app-selector-date-out',
  templateUrl: './selector-date-out.component.html',
  styleUrls: ['./selector-date-out.component.scss']
})


export class SelectorDateOutComponent implements OnInit {
  @Output() selectedMonth = new EventEmitter<string>();
  @Output() selectedYear = new EventEmitter<string>();

  today = new Date();
  month: string | any;
  year: string | any;

  months = [
    {value: "0", name: "ENERO"},
    {value: "1", name: "FEBRERO"},
    {value: "2", name: "MARZO"},
    {value: "3", name: "ABRIL"},
    {value: "4", name: "MAYO"},
    {value: "5", name: "JUNIO"},
    {value: "6", name: "JULIO"},
    {value: "7", name: "AGOSTO"},
    {value: "8", name: "SEPTIEMBRE"},
    {value: "9", name: "OCTUBRE"},
    {value: "10", name: "NOVIEMBRE"},
    {value: "11", name: "DICIEMBRE"},
  ];

  years: Years[] = [];

  constructor() {
    this.month = this.today.getMonth();
    this.year = this.today.getFullYear();

    for (let i: number = (this.year - 10); i <= this.year; i++) {
      this.years.push({value: i.toString(), name: i.toString()});
    }
  }

  ngOnInit(): void {

  }

  getMonth(event: string | any) {
    this.selectedMonth.emit(event.value);
  }

  getYear(event: string | any) {
    this.selectedYear.emit(event.value);
  }
}
