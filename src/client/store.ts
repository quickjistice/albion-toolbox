import { applyMiddleware, createStore, combineReducers } from '@reduxjs/toolkit'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from "history";
import { composeWithDevTools } from 'redux-devtools-extension'
import craftFilter from './bloks/craftFilter/craftFilterSlice';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    craftFilter: craftFilter
})

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
  return createStore(
      createRootReducer(history),
      preloadedState,
      composeWithDevTools(
          applyMiddleware(
              routerMiddleware(history),
          ),
      ),
  )
}

export const store = configureStore({
  reducer: {}
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
