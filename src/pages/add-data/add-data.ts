import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Geolocation } from '@ionic-native/geolocation'

@IonicPage()
@Component({
  selector: 'page-add-data',
  templateUrl: 'add-data.html',
})
export class AddDataPage {
  lat: number;
  longt: number;
  data = { name: "", publisheddate: "", type: "", addeddate: "" };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast, private geolocation: Geolocation) { }

  saveData() {
    this.getlocation()
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql("insert into books (name,publisheddate,type,addeddate) values('" + this.data.name + "','" + this.data.publisheddate + "','" + this.data.type + "','" + this.data.addeddate)
        .then(res => {
          console.log(res);
          console.log('inserted')
        })
        .catch(e => {
          console.log('notinserted' + e);

        });
    }).catch(e => {
      console.log('not success' + e);


    });
  }
  getlocation() {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = (resp.coords.latitude);
      this.longt = (resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}

