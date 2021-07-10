import { applyMiddleware, createStore } from '@reduxjs/toolkit'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from "history";
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware } from "redux-observable";
import rootReducer from "./reducers/index";
import rootEpics from "./epics/index";

const epicMiddleware = createEpicMiddleware();

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
    const store = createStore(
        rootReducer(history),
        preloadedState,
        composeWithDevTools(
            applyMiddleware(epicMiddleware),
            applyMiddleware(
                routerMiddleware(history),
            )
        ),
    );

    epicMiddleware.run(rootEpics);

    return store;
}

export const store = configureStore({
  reducer: {}
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
