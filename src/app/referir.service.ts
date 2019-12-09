import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ReferirService {

  referalForm: FormGroup;

  constructor() { }

  referirCand(form: FormGroup) {
      this.referalForm = form;
      console.log(this.referalForm);
  }
}
