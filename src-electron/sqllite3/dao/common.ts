import { promises as fsp } from 'fs';
import { Database } from 'sqlite3';

const getDb = () => {
  console.log('getDB', __dirname + '/../db/db.sqlite');
  return new Database(__dirname + '/../db/db.sqlite');
}

const allBySql = async <T, V>(sql: string, params?: V): Promise<T[]> => {
  const p = new Promise<T[]>((succ, fail) => {
    const db = getDb();

    try {
      db.all(sql, params, (err, rows) => {
          if (!!err) {
            fail(err);
          } else {
            const userList = rows.map((row) => {
              return objectKeysSnakeToCamel(row) as T;
            });
            succ(userList);
          }
        }
      );
    } catch (error) {
      fail(error);
    } finally {
      db.close();
    }
  });

  p.catch((reason) => {
    console.log('all exception :', reason);
  });
  return p;
};

const selectListBySql = async <T>(sql: string): Promise<T[]> => {
  return await allBySql<T, unknown>(sql);
};

const all = async <T>(file: string): Promise<T[]> => {
  const sql = await getSql(file);
  return await selectListBySql<T>(sql);
};

const selectList = async <T, V>(file: string, params?: V): Promise<T[]> => {
  const value = await getSql(file);
  return await allBySql<T, V>(value, params);
};

const getSql = async (file: string) => {
  console.log('sqlfile :', `${__dirname}\\..\\sql\\sqllite\\${file}.sql`);
  return (await fsp.readFile(`${__dirname}\\..\\sql\\sqllite\\${file}.sql`)).toString();
};


function capitalize(str: string) {
  if (str.length === 0) return '';
  return str[0].toUpperCase() + str.slice(1);
}

function snakeToCamel(str: string) {
  const [start, ...rest] = str.toLocaleLowerCase().split('_');
  return start + rest.map(capitalize).join('');
}

function objectKeysSnakeToCamel(obj: any) {
  return Object.entries(obj).reduce(
    (result, [key, value]) => ({
      ...result,
      [snakeToCamel(key)]: value,
    }),
    {}
  );
}

const sqlliteDb = {
  all,
  allBySql,
  selectList,
  selectListBySql,
}


export default sqlliteDb;
