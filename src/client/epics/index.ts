import { combineEpics } from "redux-observable";
import { commonEpics } from "./common";

const rootEpics = combineEpics(
    commonEpics
);

export default rootEpics;
