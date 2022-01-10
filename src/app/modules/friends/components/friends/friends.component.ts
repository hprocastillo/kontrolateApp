import {Component} from '@angular/core';
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent {
  //INITIAL TAB
  active = 1;

  //PAGES
  pageListFriends: boolean = true;
  pageListRequests: boolean = false;

  //VARIABLES
  friendId: string | any;

  constructor(public authSvc: AuthService) {
  }

  showPageListFriends(event: boolean) {
    if (event) {
      this.pageListFriends = true;
      this.pageListRequests = false;
    }
  }

  showPageListRequests(event: string) {
    if (event) {
      this.pageListFriends = false;
      this.pageListRequests = true;
    }
  }

}
