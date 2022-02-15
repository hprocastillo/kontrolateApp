import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
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
export class ListOutsComponent implements OnInit, OnDestroy {

  @Input() user = {} as User;
  @Output() selectedOutId = new EventEmitter<string>();

  //RESULTS
  listOuts: Out[] = [];

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
        }
      );
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
