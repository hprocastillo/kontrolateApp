import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import firebase from "firebase";
import {Out, OutShare} from "../../../../../core/interfaces/out";
import {Subject, takeUntil} from "rxjs";
import {OutService} from "../../../../../core/services/out.service";
import User = firebase.User;

@Component({
  selector: 'app-list-outs',
  templateUrl: './list-outs.component.html',
  styleUrls: ['./list-outs.component.scss']
})
export class ListOutsComponent implements OnInit, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Output() outId = new EventEmitter<string>();

  //RESULTS
  listOuts: Out[] = [];
  listOutShares: OutShare[] = [];

  constructor(private outSvc: OutService) {
  }

  ngOnInit(): void {
    if (this.user.uid) {
      //GET LIST OUTS
      this.outSvc.getOutsByUserId(this.user.uid).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Out[]) => {
          this.listOuts = res;
        }
      );
      //GET LIST OUT SHARE
      this.outSvc.getOutsByShare(this.user.uid).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: OutShare[]) => {
          this.listOutShares = res;
        }
      );
    }
  }

  getViewOut(outId: string | any) {
    this.outId.emit(outId);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
