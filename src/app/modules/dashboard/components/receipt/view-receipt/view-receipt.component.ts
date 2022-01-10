import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-view-receipt',
  templateUrl: './view-receipt.component.html',
  styleUrls: ['./view-receipt.component.scss']
})
export class ViewReceiptComponent implements OnInit {
  @Input() receiptUrl: string | any;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

}
