import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private dbProvider: DatabaseService) { }

  public cadastro(email: string, senha: string){
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into usuarios (email, senha) values (?,?)';
        let data = [email, senha];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public logar(email: string, senha: string){
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from usuarios where email = ? and senha = ?';
        let data = [email, senha];

        return db.executeSql(sql, data)
          .then((data:any) =>{
            if (data.rows.length > 0){
            return true;
            }
            return false;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }


}
