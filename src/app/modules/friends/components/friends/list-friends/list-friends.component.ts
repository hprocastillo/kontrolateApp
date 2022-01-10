import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import firebase from "firebase";
import {Friend} from "../../../../../core/interfaces/friend";
import {FriendService} from "../../../../../core/services/friend.service";
import {Subject, takeUntil} from "rxjs";
import User = firebase.User;

@Component({
  selector: 'app-list-friends',
  templateUrl: './list-friends.component.html',
  styleUrls: ['./list-friends.component.scss']
})
export class ListFriendsComponent implements OnInit, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS
  @Input() user = {} as User;

  //RESULTS
  listFriends: Friend[] = [];

  constructor(private friendSvc: FriendService) {
  }

  ngOnInit(): void {
    if (this.user.uid) {
      this.friendSvc.getFriendsByUserId(this.user.uid).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Friend[]) => {
          this.listFriends = res;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
