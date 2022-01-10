import {Component} from '@angular/core';
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  //INITIAL TAB
  active = 1;

  //PAGES
  pageOuts: boolean = true;
  pageViewOut: boolean = false;
  pageExpenses: boolean = false;
  pageExpenseView: boolean = false;

  //VARIABLES
  outId: string | any;
  expenseId: string | any;

  constructor(public authSvc: AuthService) {
  }

  showPageOuts(event: boolean) {
    if (event) {
      this.pageOuts = true;
      this.pageViewOut = false;
      this.pageExpenses = false;
      this.pageExpenseView = false;
    }
  }

  showPageViewOut(event: string) {
    if (event) {
      this.pageOuts = false;
      this.pageViewOut = true;
      this.pageExpenses = false;
      this.pageExpenseView = false;
      this.outId = event;
    }
  }

  showPageExpenses(event: string) {
    if (event) {
      this.pageOuts = false;
      this.pageViewOut = false;
      this.pageExpenses = true;
      this.pageExpenseView = false;
      this.outId = event;
    }
  }

  showPageExpenseView(event: string) {
    if (event) {
      this.pageOuts = false;
      this.pageViewOut = false;
      this.pageExpenses = false;
      this.pageExpenseView = true;
      this.expenseId = event;
    }
  }
}
