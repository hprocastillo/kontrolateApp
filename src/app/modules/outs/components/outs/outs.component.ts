import {Component} from '@angular/core';
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-outs',
  templateUrl: './outs.component.html',
  styleUrls: ['./outs.component.scss']
})
export class OutsComponent {
  // PAGES
  pageListOuts: boolean = true;
  pageViewOut: boolean = false;
  pageViewExpense: boolean = false;

  // VARIABLES
  selectedOutId: string | undefined;
  selectedExpenseId: string | undefined;

  constructor(public authSvc: AuthService) {
  }

  getSelectedOutId(event: string) {
    if (event) {
      this.selectedOutId = event;
      this.showPageViewOut(true);
    }
  }

  getSelectedExpenseId(event: string) {
    if (event) {
      this.selectedExpenseId = event;
      this.showPageViewExpense(true);
    }
  }

  getBack(event: boolean) {
    if (event) {
      this.showPageListOuts(true);
    }
  }

  getBackToOut(event: string) {
    if (event) {
      this.selectedOutId = event;
      this.showPageViewOut(true);
    }
  }

  showPageListOuts(event: boolean) {
    if (event) {
      this.pageListOuts = true;
      this.pageViewOut = false;
      this.pageViewExpense = false;
    }
  }

  showPageViewOut(event: boolean) {
    if (event) {
      this.pageListOuts = false;
      this.pageViewOut = true;
      this.pageViewExpense = false;
    }
  }

  showPageViewExpense(event: boolean) {
    if (event) {
      this.pageListOuts = false;
      this.pageViewOut = false;
      this.pageViewExpense = true;
    }
  }
}
