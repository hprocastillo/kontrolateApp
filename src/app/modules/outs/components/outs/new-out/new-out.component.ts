import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OutService} from "../../../../../core/services/out.service";
import firebase from "firebase";
import {Router} from "@angular/router";
import User = firebase.User;

@Component({
  selector: 'app-new-out',
  templateUrl: './new-out.component.html',
  styleUrls: ['./new-out.component.scss']
})
export class NewOutComponent {
  @Input() user = {} as User;

  //VARIABLES
  today = new Date();
  newForm: FormGroup;
  newOutFormTemplate: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private outSvc: OutService) {
    this.newForm = this.fb.group({
      description: ['', [Validators.required]],
      goalAmount: ['', [Validators.required]],
    });
  }

  saveOut(user: User) {
    if (this.newForm.valid) {
      const out = this.newForm.value;
      const outId = out?.id || null;
      out.ownerId = user.uid;
      out.currentAmount = 0;
      out.exceededAmount = 0;
      out.status = true;
      out.shared = false;
      out.createdBy = user.uid;
      out.createdAt = this.today;
      this.outSvc.saveOut(out, outId).then();
      this.newForm.reset();
      this.getCancel();
    }
  }

  showNewOutForm() {
    this.newOutFormTemplate = true;
  }

  getBack() {
    this.router.navigate(['dashboard']).then();
  }

  getCancel() {
    this.newOutFormTemplate = false;
  }
}
