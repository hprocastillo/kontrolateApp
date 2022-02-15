import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Out} from "../../../../../../core/interfaces/out";
import {Subject, takeUntil} from "rxjs";
import {OutService} from "../../../../../../core/services/out.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalDeleteOutComponent} from "../../modal-delete-out/modal-delete-out.component";

@Component({
  selector: 'app-list-outs-item',
  templateUrl: './list-outs-item.component.html',
  styleUrls: ['./list-outs-item.component.scss']
})
export class ListOutsItemComponent implements OnInit, OnDestroy {
  @Input() outId: string | any;
  @Output() selectedOutId = new EventEmitter<string>();

  //VARIABLES
  toolbar: boolean = false;

  //RESULTS
  out = {} as Out;

  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  constructor(
    private outSvc: OutService,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    //Get out by id
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

  selectOutId(id: string) {
    this.selectedOutId.emit(id);
  }

  showToolbar() {
    this.toolbar = !this.toolbar;
  }

  getModalDelete(out: Out, outId: string) {
    const modalRef = this.modalService.open(ModalDeleteOutComponent, {centered: true});
    modalRef.componentInstance.id = outId;
    modalRef.componentInstance.description = out.description;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
