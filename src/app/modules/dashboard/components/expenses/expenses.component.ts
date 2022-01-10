import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import firebase from "firebase";
import {Out} from "../../../../core/interfaces/out";
import {Subject, takeUntil} from "rxjs";
import {OutService} from "../../../../core/services/out.service";
import User = firebase.User;

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Input() outId: string | any;
  @Output() expenseId = new EventEmitter<string>();
  @Output() btnBack = new EventEmitter<boolean>();

  //RESULTS
  out = {} as Out;

  constructor(private outSvc: OutService) {
  }

  ngOnInit(): void {
    //GET OUT
    if (this.outId) {
      this.outSvc.getOutById(this.outId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.out = res;
        }
      );
    }
  }

  getBack(event: boolean) {
    if (event) {
      this.btnBack.emit(true);
    }
  }

  getView(event: string) {
    this.expenseId.emit(event);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
