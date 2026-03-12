import apiMiddleware, { axiosInstance } from "@middleware/middleware";
import {
  REDUX_PERSISTENT_STORE_ENCRYPT_KEY,
  SliceNames,
} from "@constants/redux-constant";
import type { TRootState } from "@models/redux.store";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";
import rootReducer from "./root-reducer";

const encryptor = encryptTransform({
  secretKey: REDUX_PERSISTENT_STORE_ENCRYPT_KEY,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [SliceNames.AUTH],
  transforms: [encryptor],
};

const persistedReducer = persistReducer(persistConfig, rootReducer as any);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: { extraArgument: axiosInstance },
    }).concat(apiMiddleware),
  devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
