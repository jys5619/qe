import { promises as fsp } from 'fs';
import { Database } from 'sqlite3';

/**
 * SqlLite3 DB
 */
const getDb = () => {
  return new Database(__dirname + '/../db/db.sqlite');
};

/**
 *
 * @param sql
 * @param params
 * @returns
 */
const execBySql = async (sql: string, params: any): Promise<number> => {
  const p = new Promise<number>((succ, fail) => {
    const db = getDb();

    const result: SqlMeta = getSqlParam(sql, params);
    console.log(result);
    try {
      db.run(result.sql, result.params, (err) => {
        if (!!err) {
          fail(err);
        } else {
          succ(1);
        }
      });
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

const exec = async (file: string, params: any): Promise<number> => {
  const sql = await getSql(file);

  return await execBySql(sql, params);
};

const selectListBySql = async <T, V>(sql: string, params?: V): Promise<T[]> => {
  const p = new Promise<T[]>((succ, fail) => {
    const db = getDb();
    console.log(sql, params);
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
      });
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

const selectList = async <T, V>(file: string, params?: V): Promise<T[]> => {
  const value = await getSql(file);
  return await selectListBySql<T, V>(value, params);
};

const allBySql = async <T>(sql: string): Promise<T[]> => {
  return await selectListBySql<T, unknown>(sql);
};

const all = async <T>(file: string): Promise<T[]> => {
  const sql = await getSql(file);
  return await allBySql<T>(sql);
};
const getSql = async (file: string) => {
  console.log('sqlfile :', `${__dirname}\\..\\sql\\sqllite\\${file}.sql`);
  return (
    await fsp.readFile(`${__dirname}\\..\\sql\\sqllite\\${file}.sql`)
  ).toString();
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

interface SqlMeta {
  sql: string;
  params: any[];
}

function getSqlParam(sql: string, params: any): SqlMeta {
  let tmp = sql.split('\t').join(' ').split('\n').join(' ') + ' ';

  let sno = 0;
  let key = '';
  let convertSql = '';
  const convertParams = [];

  sno = tmp.indexOf('${');
  convertSql += tmp.substring(0, sno);
  tmp = tmp.substring(sno);

  while (sno > -1) {
    sno = tmp.indexOf('}');
    key = tmp.substring(2, sno).trim();
    convertSql += '?';

    tmp = tmp.substring(sno + 1);
    convertParams.push(params[key]);

    sno = tmp.indexOf('${');
    convertSql += tmp.substring(0, sno);
    tmp = tmp.substring(sno);
  }

  convertSql += tmp;

  return {
    sql: convertSql,
    params: convertParams,
  };
}

const sqlliteDb = {
  all,
  allBySql,
  selectList,
  selectListBySql,
  exec,
  execBySql,
};

export default sqlliteDb;
