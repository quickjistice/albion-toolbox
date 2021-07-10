import { convertBinToDb, ENTITY_TYPE } from './convert';

convertBinToDb(ENTITY_TYPE.ITEMS);
convertBinToDb(ENTITY_TYPE.BUILDINGS);
// must be in the end after all other converters
convertBinToDb(ENTITY_TYPE.LOCALIZATION);
