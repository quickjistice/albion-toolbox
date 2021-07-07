import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { join } from 'path';

import { LocalizationModule } from 'src/server/providers/localization/localization.module';
import { FilterModule } from '../filter/filter.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from '../item/item.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () =>
                Object.assign(await getConnectionOptions(), {
                    autoLoadEntities: true,
                }),
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../../..', 'client'),
        }),
        LocalizationModule,
        FilterModule,
        ItemModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
