// eslint-disable-next-line @typescript-eslint/no-var-requires
const { readFileSync } = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = {
    type: 'postgres',
    host: 'rc1b-91j4uht8eqgsrchm.mdb.yandexcloud.net',
    port: 6432,
    username: 'albion',
    password: process.env.PG_PASSWORD,
    database: 'albion',
    // entities: ['./src/server/entities/**/*.entity.ts'],
    // entities: ['./dist/server/entities/**/*.entity.js'],
    // entities: [],
    ssl: {
        ca: readFileSync('./src/server/tools/mdb_pub.crt').toString(),
        /**
         * MDB использует внутренний самоподписанный сертификат.
         * Для того, чтобы успешно приконнектилось, надо указывать данный параметр.
         */
        rejectUnauthorized: false,
    },
    uuidExtension: 'pgcrypto',
};
