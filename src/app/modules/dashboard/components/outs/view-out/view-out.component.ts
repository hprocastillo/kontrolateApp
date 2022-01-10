import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Out} from "../../../../../core/interfaces/out";
import {Subject, takeUntil} from "rxjs";
import {OutService} from "../../../../../core/services/out.service";
import firebase from "firebase";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DeleteOutComponent} from "../delete-out/delete-out.component";
import {EditOutComponent} from "../edit-out/edit-out.component";
import User = firebase.User;

@Component({
  selector: 'app-view-out',
  templateUrl: './view-out.component.html',
  styleUrls: ['./view-out.component.scss']
})
export class ViewOutComponent implements OnInit, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();
  //INPUTS
  @Input() user = {} as User;
  @Input() outId: string | any;
  //OUTPUTS
  @Output() expenseId = new EventEmitter<string>();
  @Output() btnBack = new EventEmitter<boolean>();

  //RESULTS
  out = {} as Out;

  constructor(
    private modalService: NgbModal,
    private outSvc: OutService) {
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

  getViewExpense(event: string) {
    if (event) {
      this.expenseId.emit(event);
    }
  }

  getModalDelete(out: Out, outId: string) {
    const modalRef = this.modalService.open(DeleteOutComponent, {centered: true});
    modalRef.componentInstance.outId = outId;
    modalRef.componentInstance.outDescription = out.description;
    modalRef.componentInstance.delete.subscribe((receivedEntry: boolean) => {
      if (receivedEntry) {
        this.getBack(true);
      }
    });
  }

  getModalEdit(outId: string) {
    const modalRef = this.modalService.open(EditOutComponent, {centered: true});
    modalRef.componentInstance.outId = outId;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
