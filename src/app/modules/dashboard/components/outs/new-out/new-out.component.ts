import {Component, Input} from '@angular/core';
import firebase from "firebase";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OutService} from "../../../../../core/services/out.service";
import User = firebase.User;
@Component({
  selector: 'app-new-out',
  templateUrl: './new-out.component.html',
  styleUrls: ['./new-out.component.scss']
})
export class NewOutComponent {
  //INPUTS AND OUTPUTS
  @Input() user = {} as User;

  //FORM
  newForm: FormGroup;

  //VARIABLES
  today = new Date();

  //PAGES
  pageDefault = true;
  pageForm = false;

  constructor(private fb: FormBuilder, private outSvc: OutService) {
    this.newForm = this.fb.group({
      description: ['', [Validators.required]],
      amountGoal: ['', [Validators.required]],
    });
  }

  showForm() {
    this.pageDefault = false;
    this.pageForm = true;
  }

  getSave(user: User) {
    if (this.newForm.valid) {
      const out = this.newForm.value;
      const outId = out?.id || null;
      out.status = true;
      out.amount = 0;

      out.userId = user.uid;
      out.userDisplayName = user.displayName;
      out.userEmail = user.email;
      out.userPhotoUrl = user.photoURL;

      out.createdAt = this.today;
      this.outSvc.saveOut(out, outId).then();
      this.newForm.reset();
      this.getCancel();
    }
  }

  getCancel() {
    this.pageDefault = true;
    this.pageForm = false;
  }

}
