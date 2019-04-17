import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AddDataPage } from '../add-data/add-data';
import { EditDataPage } from '../edit-data/edit-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  admin: any;

  Bookss: any = [];
  totalIncome = 0;
  totalBooks = 0;
  balance = 0;

  constructor(public navCtrl: NavController, public navparams: NavParams,
    private sqlite: SQLite) {
    this.createData();
    // this.admin=this.navparams.get('isadmin')
  }

  ionViewDidLoad() {
    this.getData();
  }

  ionViewWillEnter() {
    this.getData();
  }

  createData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS Books(isbn INTEGER PRIMARY KEY, name TEXT, publisheddate date,addeddate TEXT, type TEXT,  )', [])
        .then(res => console.log('Executed SQL'))
        .catch(e => console.log(e));



    }).catch(e => console.log(e));
  }

  addData() {
    this.navCtrl.push(AddDataPage);
  }

  editData(isbn) {
    this.navCtrl.push(EditDataPage, {
      isbn: isbn
    });
  }
  getData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM Books ORDER BY isbn DESC', [])
        .then(res => {
          this.Bookss = [];
          for (var i = 0; i < res.rows.length; i++) {
            this.Bookss.push({ isbn: res.rows.item(i).isbn, name: res.rows.item(i).name, publisheddate: res.rows.item(i).publisheddate, type: res.rows.item(i).type, addeddate: res.rows.item(i).addeddate })
          }
        })
        .catch(e => console.log(e));
    })
  }
  deleteData(isbn) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM Books WHERE isbn=?', [isbn])
        .then(res => {
          console.log(res);
          this.getData();
        })
        .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

}
