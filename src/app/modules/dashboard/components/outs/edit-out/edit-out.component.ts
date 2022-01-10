import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {OutService} from "../../../../../core/services/out.service";
import {Out} from "../../../../../core/interfaces/out";

@Component({
  selector: 'app-edit-out',
  templateUrl: './edit-out.component.html',
  styleUrls: ['./edit-out.component.scss']
})
export class EditOutComponent implements OnInit, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS
  @Input() outId: string | any;

  //RESULTS
  out = {} as Out;

  //VARIABLES
  today = new Date();

  constructor(public activeModal: NgbActiveModal, private outSvc: OutService) {
  }

  ngOnInit(): void {
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


  getEdit(outId: string) {
    // @ts-ignore
    this.out.updatedAt = this.today;
    this.outSvc.updateOut(this.out, outId).then();
    this.activeModal.close();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
