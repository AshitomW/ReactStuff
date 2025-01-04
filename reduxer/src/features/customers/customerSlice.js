import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fullName: "",
    nationalID: "",
    createdAt: "",
};

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        createCustomer: {
            prepare(fullName, nationalID) {
                return {
                    payload: {
                        fullName,
                        nationalID,
                        createdAt: new Date().toISOString(), // dont do in the reducer
                    },
                };
            },

            reducer(state, action) {
                state.fullName = action.payload.fullName;
                state.nationalID = action.payload.nationalID;
                state.createdAt = action.payload.createdAt;
            },
        },

        updateName(state, action) {
            state.fullName = action.payload;
        },
    },
});

console.log(customerSlice.reducer);
export const customerActions = customerSlice.actions;
export default customerSlice.reducer;

// export function customerReducer(state = initialStateCustomers, action) {
//     switch (action.type) {
//         case "customer/createCustomer":
//             return {
//                 ...state,
//                 fullName: action.payload.fullName,
//                 nationalID: action.payload.nationalID,
//                 createdAt: action.payload.createdAt,
//             };
//         case "customer/updateName":
//             return {
//                 ...state,
//                 fullName: action.payload.fullName,
//             };
//         default:
//             return state;
//     }
// }

// function createCustomer(fullName, nationalID) {
//     return {
//         type: "customer/createCustomer",
//         payload: {
//             fullName,
//             nationalID,
//             createdAt: new Date().toISOString(),
//         },
//     };
// }

// function updateName(fullName) {
//     return {
//         type: "customer/updateName",
//         payload: {
//             fullName,
//         },
//     };
// }

// export const customerActions = {
//     createCustomer,
//     updateName,
// };
