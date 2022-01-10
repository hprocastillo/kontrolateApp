import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import firebase from "firebase";
import {Friend} from "../../../../../core/interfaces/friend";
import {FriendService} from "../../../../../core/services/friend.service";
import {Subject, takeUntil} from "rxjs";
import User = firebase.User;

@Component({
  selector: 'app-new-friend',
  templateUrl: './new-friend.component.html',
  styleUrls: ['./new-friend.component.scss']
})
export class NewFriendComponent implements OnInit, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS
  @Input() user = {} as User;

  //VARIABLES
  textSearch: string | any;

  //RESULTS
  listFriends: Friend[] = [];

  constructor(private friendSvc: FriendService) {
  }

  ngOnInit(): void {
    this.friendSvc.getFriends().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: Friend[]) => {
        this.listFriends = res;
        console.log(this.listFriends)
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
