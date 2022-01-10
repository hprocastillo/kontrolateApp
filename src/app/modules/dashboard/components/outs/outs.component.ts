import {Component, EventEmitter, Input, Output} from '@angular/core';
import firebase from "firebase";
import User = firebase.User;

@Component({
  selector: 'app-outs',
  templateUrl: './outs.component.html',
  styleUrls: ['./outs.component.scss']
})
export class OutsComponent {
  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Output() outId = new EventEmitter<string>();

  getViewOut(event: string) {
    this.outId.emit(event);
  }
}
