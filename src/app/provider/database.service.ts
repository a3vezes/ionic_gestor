import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private sqlite: SQLite) { }

  public getDB(){
    return this.sqlite.create({
      name: 'gestor.db',
      location: 'default'
    });
  }

  public createDatabase(){
    return this.getDB()
    .then((db: SQLiteObject) => {
      this.createTables(db);

      this.insertDefaultItemsCategoria(db);

      this.insertDefaultItensMes(db);
    })
    .catch(e => console.error(e));
  }

  private createTables(db: SQLiteObject){
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS usuarios (id integer primary key AUTOINCREMENT NOT NULL, email TEXT, senha TEXT)'],
      ['CREATE TABLE IF NOT EXISTS mes (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT)'],
      ['CREATE TABLE IF NOT EXISTS categoria (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT)'],
      ['CREATE TABLE IF NOT EXISTS gasto (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT, preco REAL, id_categoria integer, FOREIGN KEY(id_categoria) REFERENCES categoria(id), id_mes integer, FOREIGN KEY(id_mes) REFERENCES mes(id) )']
    ])
    .then(() => console.log('Tabelas Criadas'))
    .catch(e => console.error('Erro ao criar as tabelas', e));
  }

  private insertDefaultItemsCategoria(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from categoria', [])
    .then((data: any) => {
      //Se não existe nenhum registro
      if (data.rows.item(0).qtd == 0) {
 
        // Criando as tabelas
        db.sqlBatch([
          ['insert into categoria (nome) values (?)', ['Restaurantes']],
          ['insert into categoria (nome) values (?)', ['Lazer']],
          ['insert into categoria (nome) values (?)', ['Contas']]
        ])
          .then(() => console.log('Dados padrões incluídos'))
          .catch(e => console.error('Erro ao incluir dados padrões', e));
 
      }
    })
    .catch(e => console.error('Erro ao consultar a qtd de categorias', e));
  }

  private insertDefaultItensMes(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from mes', [] )
    .then((data: any) => {
      //Se não existe nenhum registro
      if (data.rows.item(0).qtd == 0) {
 
        // Criando as tabelas
        db.sqlBatch([
          ['insert into mes (nome) values (?)', ['Janeiro']],
          ['insert into mes (nome) values (?)', ['Fevereiro']],
          ['insert into mes (nome) values (?)', ['Março']],
          ['insert into mes (nome) values (?)', ['Abril']],
          ['insert into mes (nome) values (?)', ['Maio']],
          ['insert into mes (nome) values (?)', ['Junho']],
          ['insert into mes (nome) values (?)', ['Julho']],
          ['insert into mes (nome) values (?)', ['Agosto']],
          ['insert into mes (nome) values (?)', ['Setembro']],
          ['insert into mes (nome) values (?)', ['Outubro']],
          ['insert into mes (nome) values (?)', ['Novembro']],
          ['insert into mes (nome) values (?)', ['Dezembro']]
        ])
          .then(() => console.log('Dados padrões incluídos'))
          .catch(e => console.error('Erro ao incluir dados padrões', e));
 
      }
    })
    .catch(e => console.error('Erro ao consultar a qtd de categorias', e));
  }

}
