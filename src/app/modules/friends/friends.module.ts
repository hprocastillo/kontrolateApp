import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsComponent } from './components/friends/friends.component';
import {NgbNavModule} from "@ng-bootstrap/ng-bootstrap";
import { ListFriendsComponent } from './components/friends/list-friends/list-friends.component';
import { NewFriendComponent } from './components/friends/new-friend/new-friend.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    FriendsComponent,
    ListFriendsComponent,
    NewFriendComponent
  ],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    NgbNavModule,
    FormsModule
  ]
})
export class FriendsModule { }
