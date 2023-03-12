import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import { StateSchema } from './StateSchema'

export function createReduxStore(
	initialState?: StateSchema
) {

	const rootReducer: ReducersMapObject<StateSchema> = {
	}

	const store = configureStore({
		reducer: rootReducer,
		devTools: __IS_DEV__,
		preloadedState: initialState
	})

	return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];