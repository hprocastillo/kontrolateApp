import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FriendsRoutingModule} from './friends-routing.module';
import {NgbNavModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {FriendsComponent} from './components/friends/friends.component';

@NgModule({
  declarations: [
    FriendsComponent
  ],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    NgbNavModule,
    FormsModule
  ]
})
export class FriendsModule {
}
