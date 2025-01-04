import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// with redux toolkit
import { configureStore } from "@reduxjs/toolkit"; //  wrap createstore, add thunk middleware, setup developertools , combine reducers

const store = configureStore({
    reducer: {
        account: accountReducer,
        customer: customerReducer,
    },
});

export default store;

// install
// apply middleware to store
// use in action creator functions
