import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private router: Router) {
  }

  getOuts() {
    this.router.navigate(['outs']).then();
  }

  getIncomes() {
    this.router.navigate(['incomes']).then();
  }

  getBalance() {
    this.router.navigate(['balance']).then();
  }

  getFriends() {
    this.router.navigate(['friends']).then();
  }

}
