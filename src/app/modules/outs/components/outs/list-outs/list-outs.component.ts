import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Out} from "../../../../../core/interfaces/out";
import {Subject, takeUntil} from "rxjs";
import {OutService} from "../../../../../core/services/out.service";
import firebase from "firebase";
import User = firebase.User;

@Component({
  selector: 'app-list-outs',
  templateUrl: './list-outs.component.html',
  styleUrls: ['./list-outs.component.scss']
})
export class ListOutsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() user = {} as User;
  @Input() selectedMonth: string | any;
  @Input() selectedYear: string | any;
  @Output() selectedOutId = new EventEmitter<string>();

  //VARIABLE
  today = new Date();

  //RESULTS
  listOuts: Out[] = [];
  listOutsFilter: Out[] = [];

  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  constructor(private outSvc: OutService) {
  }

  ngOnInit(): void {
    //GET LIST OUTS
    if (this.user.uid) {
      this.outSvc.getOutsByOwnerId(this.user.uid).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Out[]) => {
          this.listOuts = res;
          this.listOutsFilter = this.listOuts.filter(item => {
            return item.createdAt.toDate().getMonth() === this.today.getMonth()
              && item.createdAt.toDate().getFullYear() === this.today.getFullYear();
          });
        }
      );
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.selectedMonth)

    if (this.selectedMonth && !this.selectedYear) {
      this.listOutsFilter = this.listOuts.filter(item => {
        return item.createdAt.toDate().getMonth().toString() === this.selectedMonth &&
          item.createdAt.toDate().getFullYear() === this.today.getFullYear();
      });
    }

    if (this.selectedMonth && this.selectedYear) {
      this.listOutsFilter = this.listOuts.filter(item => {
        return item.createdAt.toDate().getMonth().toString() === this.selectedMonth &&
          item.createdAt.toDate().getFullYear().toString() === this.selectedYear;
      });
    }
  }

  getSelectedOutId(event: string) {
    this.selectedOutId.emit(event);

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
