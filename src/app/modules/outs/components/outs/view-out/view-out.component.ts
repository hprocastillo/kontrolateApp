import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Out} from "../../../../../core/interfaces/out";
import {Subject, takeUntil} from "rxjs";
import {OutService} from "../../../../../core/services/out.service";
import firebase from "firebase";
import User = firebase.User;

@Component({
  selector: 'app-view-out',
  templateUrl: './view-out.component.html',
  styleUrls: ['./view-out.component.scss']
})
export class ViewOutComponent implements OnInit, OnDestroy {
  @Input() user = {} as User;
  @Input() outId: string | any;
  @Output() selectedExpenseId = new EventEmitter<string>();
  @Output() btnBack = new EventEmitter<boolean>();

  //RESULTS
  out = {} as Out;

  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

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

  getSelectedExpenseId(event: string) {
    if (event) {
      this.selectedExpenseId.emit(event);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
