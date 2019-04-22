import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { DatabaseService } from './database.service';


@Injectable({
  providedIn: 'root'
})
export class MesService {

  constructor(private dbProvider: DatabaseService) { }

  public getAll() {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
 
      return db.executeSql('select * from mes', [])
        .then((data: any) => {
          if (data.rows.length > 0) {
            let mes: any[] = [];
            for (var i = 0; i < data.rows.length; i++) {
              var category = data.rows.item(i);
              mes.push(category);
            }
            return mes;
          } else {
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }
  
}
