import {configureStore, combineReducers} from "@reduxjs/toolkit";
import authReducer from "../features/user/authSlice";
import listingReducer from "../features/listing/listSlice";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers(
  {
    auth: authReducer,
    listing: listingReducer
  }
  );
 

const persistConfig ={
  key:'root',
  storage,
  version:1
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck:false,
  })
})


export const persistor = persistStore(store);