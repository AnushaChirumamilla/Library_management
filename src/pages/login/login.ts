import { AddDataPage } from './../add-data/add-data';
import { HomePage } from './../home/home';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userTriedLogin: boolean;
  loginFormGroup: FormGroup;
  email: string;
  password: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.createloginFormGroup();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  createloginFormGroup() {
    this.loginFormGroup = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.required])]
    });
  }

  openLoginpage() {
    this.userTriedLogin = true;


    if (this.email === "admin" && this.password === "admin") {
      this.navCtrl.push(AddDataPage, { isadmin: true });
    }
 
    else {
      if (this.email === "anusha" && this.password === "anusha") {
        this.navCtrl.push(HomePage, { isadmin: false });
      }
    }
  }
}
