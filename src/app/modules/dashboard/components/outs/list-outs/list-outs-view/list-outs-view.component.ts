import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OutService} from "../../../../../../core/services/out.service";
import {Out} from "../../../../../../core/interfaces/out";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-list-outs-view',
  templateUrl: './list-outs-view.component.html',
  styleUrls: ['./list-outs-view.component.scss']
})
export class ListOutsViewComponent implements OnInit, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() outId: string | any;

  //RESULTS
  out = {} as Out;

  constructor(private outSvc: OutService) {
  }

  ngOnInit(): void {
    if (this.outId) {
      this.outSvc.getOutById(this.outId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.out = res;
        }
      )
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
