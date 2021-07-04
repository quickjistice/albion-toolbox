import { Global, Module } from '@nestjs/common';

import { Localization } from './localization.provider';

@Global()
@Module({
    controllers: [],
    providers: [Localization],
    exports: [Localization],
})
export class LocalizationModule {}
