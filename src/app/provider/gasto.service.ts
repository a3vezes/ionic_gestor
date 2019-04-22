import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  constructor(private dbProvider: DatabaseService) { }

  public insert(gasto: Gasto){
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into gasto (nome, preco, id_mes, id_categoria) values (?,?,?,?)';
        let data = [gasto.nome, gasto.preco, gasto.id_mes, gasto.id_categoria];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(gasto: Gasto){
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update gasto set nome = ?, preco = ?, id_mes = ?, id_categoria = ? where id = ?';
        let data = [gasto.nome, gasto.preco, gasto.id_mes, gasto.id_categoria, gasto.id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(id: number){
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from gasto where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(id: number){
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from gasto where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data:any) =>{
            if (data.rows.length > 0){
            let item = data.rows.item(0);
            let gasto = new Gasto();
            gasto.id = item.id;
            gasto.nome = item.nome;
            gasto.preco = item.preco;
            gasto.id_categoria = item.id_categoria;
            gasto.id_mes = item.id_mes;
            }

            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT g.*, m.nome, c.nome from ((gasto g inner join categoria c on g.id_categoria = c.id) inner join mes m on g.id_mes = m.id)';
        
        return db.executeSql(sql, [])
          .then((data: any) => {
            if (data.rows.length > 0) {
              let products: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var product = data.rows.item(i);
                products.push(product);
              }
              return products;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getByMes(mes: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT g.*, m.nome, c.nome from ((gasto g inner join categoria c on g.id_categoria = c.id) inner join mes m on g.id_mes = m.id where g.id_mes = ?)';
        var data: any[] = [mes];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let products: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var product = data.rows.item(i);
                products.push(product);
              }
              return products;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

}

export class Gasto {
  id: number;
  nome: string;
  preco: number;
  id_mes: number;
  id_categoria: number;
}

