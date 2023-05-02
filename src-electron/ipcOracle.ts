import { ipcMain as im } from 'electron';
import oracledb, { Connection, DBError } from 'oracledb';
import dbConfig from './oracle/dbConfig';


im.handle('testOracleConnect', async () => {
    oracledb.autoCommit = true; //자동 커밋
    const {user, password, connectString} = dbConfig;
    oracledb.getConnection({user, password, connectString},

        function(err:DBError, conn:Connection) {

            if(err) {throw err;}

            console.log("Oracle DB 연결 성공!!");
            // id, pwd, email, name, ename, emno, auth
            //create
            /*sql = "create table cuser (id varchar2(10), password varchar2(10),";
            sql+= "name varchar2(10), age number)";

            conn.execute(sql);

            console.log("테이블 생성 완료!!");*/

            //insert
            let sql = "insert into cuser values (:id,:pw,:name,:age)";

            //데이터 한개 넣을 때
            //binds = [["b123","123","suzi",27]];

            //여러개 넣을 때는
            /*binds = [
                    ["c123","123","suzi",27],
                    ["d123","123","suzi",27],
                    ["e123","123","suzi",27]
                    ];


            var result = conn.executeMany(sql,binds,{}); // {} 함수

            console.log("입력 완료!!");*/

            //update
            /*sql = "update cuser set password=:pw,name=:name,age=:age where id=:id";

            conn.executeMany(sql,[["777","inna",30,"a123"]]);

            console.log("수정 완료");*/


            //delete
            /*sql = "delete cuser where id=:id";
            conn.execute(sql,["a123"]);

            console.log("삭제 완료!!");*/

            //select
            sql = "select id,password,name,age from cuser";

            conn.execute(sql,[], (err,result) => {
                if(err) {throw err;}
                console.log(result.rows);
                doRelease(conn);
            });
    });

    console.log(__dirname);
    return 'success connected!!!';


});


//DB 종료
function doRelease(conn:Connection) {
	conn.release( (err:DBError) => {
		if(err) {throw err;}
	});
}
