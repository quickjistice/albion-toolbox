import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { join } from 'path';

import { LocalizationModule } from 'src/server/providers/localization/localization.module';
import { FilterModule } from '../filter/filter.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'rc1b-91j4uht8eqgsrchm.mdb.yandexcloud.net',
            port: 6432,
            username: 'albion',
            password: process.env.PG_PASSWORD,
            database: 'albion',
            entities: [],
            ssl: {
                ca: readFileSync('./src/server/tools/mdb_pub.crt').toString(),
                /**
                 * MDB использует внутренний самоподписанный сертификат.
                 * Для того, чтобы успешно приконнектилось, надо указывать данный параметр.
                 */
                rejectUnauthorized: false,
            },
            autoLoadEntities: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client'),
        }),
        LocalizationModule,
        FilterModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
