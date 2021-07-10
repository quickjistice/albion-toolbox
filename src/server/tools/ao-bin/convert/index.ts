import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { convertBuildings } from './convert-buildings';
import { convertItems } from './convert-items';
import { convertLocalization } from './convert-localization';

export enum ENTITY_TYPE {
    ITEMS = 'ITEMS',
    BUILDINGS = 'BUILDINGS',
    LOCALIZATION = 'LOCALIZATION',
}

export function convertBinToDb(entityType: ENTITY_TYPE) {
    const binEntity = JSON.parse(
        readFileSync(
            resolve(
                __dirname,
                `../ao-bin-data/${entityType.toLowerCase()}.json`,
            ),
            'utf-8',
        ),
    );

    let result;

    switch (entityType) {
        case ENTITY_TYPE.ITEMS:
            result = convertItems(binEntity);
            break;
        case ENTITY_TYPE.BUILDINGS:
            result = convertBuildings(binEntity);
            break;
        case ENTITY_TYPE.LOCALIZATION:
            result = convertLocalization(binEntity);
            break;
    }

    writeFileSync(
        resolve(
            __dirname,
            `../ao-parsed-data/${entityType.toLowerCase()}.json`,
        ),
        JSON.stringify(result, null, 2),
    );
}
