import { applyMiddleware, combineReducers } from "redux";
import { createStore } from "redux";

import accountReducer from "./features/accounts/accountSlice";
import { customerReducer } from "./features/customers/customerSlice";

import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

// with redux toolkit
import { configureStore } from "@reduxjs/toolkit"; //  wrap createstore, add thunk middleware, setup developertools , combine reducers

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;

// install
// apply middleware to store
// use in action creator functions
