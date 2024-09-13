import oracledb from 'oracledb';

let clientOpts = {};
if (process.platform === 'win32') {
    clientOpts = { libDir: 'C:\\sw\\oracle\\instantclient_23_4' };
} else if (process.platform === 'darwin' && process.arch === 'x64') {
    // macOS Intel
    clientOpts = { libDir: process.env.HOME + '/Downloads/instantclient_19_16' };
}
oracledb.initOracleClient(clientOpts);
let _conn
export async function getConnection() {
    if (!_conn)
        // _conn = await oracledb.getConnection({ user: 'app', password: 'Licaci0nzota', connectionString: 
        // '(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1521)(host=adb.ca-toronto-1.oraclecloud.com))(connect_data=(service_name=ge811e771ded24e_documentdb_low.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))'})
        _conn = await oracledb.getConnection({user: 'app', password: 'Licaci0nzota', connectionString: 'localhost:1521/freepdb1'})
    return _conn
}

export async function query(q) {
    const conn = await getConnection()
    return await conn.execute(q)
}