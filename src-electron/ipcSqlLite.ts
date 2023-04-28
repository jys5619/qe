import { ipcMain as im } from 'electron';
import { Database } from 'sqlite3';
import fs from 'fs';

im.handle('testConnect', async () => {
    try {
        // NULL, INTEGER, REAL, TEXT, BLOB.
        // Open a SQLite database, stored in the file db.sqlite
        const db = new Database(__dirname + '/db/db.sqlite');

        // Fetch a random integer between -99 and +99
        // db.get(
        // 'SELECT RANDOM() % 100 as result',
        // (_, res) => console.log("RES", res)
        // );

        // 생성
        // Read and execute the SQL query in ./sql/articles.sql
        // db.exec(fs.readFileSync(__dirname + '/sql/articles.sql').toString());

        // db.exec(fs.readFileSync(__dirname + '/sql/sample-articles.sql').toString());

        db.all(
            'SELECT title FROM articles', // ORDER BY LENGTH(description) DESC LIMIT 2',
            (_, res) => console.log(res)
        );

        // db.exec(`UPDATE articles SET title='Troisieme article' WHERE id=3`);

        db.get(
            'SELECT title FROM articles WHERE id=3',
            (_, res) => console.log(res)
          );

        const statement = db.prepare(
        `UPDATE articles SET title='Third article' WHERE id=?`
        )
        statement.run([3]);
        
        db.get(
            'SELECT title FROM articles WHERE id=3',
            (_, res) => console.log(res)
          );
        //   const delete_statement = db.prepare(
        //     `DELETE FROM articles WHERE id=?`
        //   )
        //   delete_statement.run([3]);
    } catch (e) {
        console.log(e);
    }
    console.log(__dirname);
    return 'success connected!!!';
});
