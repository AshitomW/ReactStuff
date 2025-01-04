import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false,
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance = state.balance + action.payload;
            state.isLoading = false;
        },

        withdraw(state, action) {
            state.balance = state.balance - action.payload;
        },

        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: {
                        amount,
                        purpose,
                    },
                };
            },
            reducer(state, action) {
                if (state.loan > 0) return;
                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.loanPurpose;
                state.balance = state.balance + action.payload.amount;
            },
        },

        // requestLoan(state, action) {
        //     if (state.loan > 0) return;
        //     state.loan = action.payload.amount;
        //     state.loanPurpose = action.payload.loanPurpose;
        //     state.balance = state.balance + action.payload.amount;
        // },

        payLoan(state, action) {
            state.balance -= state.loan;
            state.loan = 0;
            state.loanPurpose = "";
        },

        convertingCurrency(state) {
            state.isLoading = true;
        },
    },
});

export function deposit(amount, currency) {
    // match the name and the type
    // redux figures out automatically
    if (currency === "USD") return { type: "account/deposit", payload: amount };

    // api call thunk.

    return async function (dispatch, getState) {
        // API Call
        dispatch({ type: "account/convertingCurrency" });
        const response = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
        );

        const data = await response.json();
        const converted = data.rates.USD;

        // return action;

        dispatch({ type: "account/deposit", payload: converted });
        // return; //action;
    };
}

export const accountActions = accountSlice.actions;
export default accountSlice.reducer;

// export default function accountReducer(state = initialStateAccount, action) {
//     switch (action.type) {
//         case "account/deposit":
//             return {
//                 ...state,
//                 balance: state.balance + action.payload,
//                 isLoading: false,
//             };
//         case "account/withdraw":
//             return { ...state, balance: state.balance - action.payload };
//         case "account/requestLoan":
//             if (state.loan > 0) return state;
//             return {
//                 ...state,
//                 loan: action.payload.amount,
//                 loanPurpose: action.payload.purpose,
//                 balance: state.balance + action.payload.amount,
//             };

//         case "account/payLoan":
//             return {
//                 ...state,
//                 loan: 0,
//                 loanPurpose: "",
//                 balance: state.balance - state.loan,
//             };
//         case "account/convertingCurrency":
//             return {
//                 ...state,
//                 isLoading: true,
//             };
//         default:
//             return state;
//     }
// }

// function deposit(amount, currency) {
//     if (currency === "USD") return { type: "account/deposit", payload: amount };

//     // api call thunk.

//     return async function (dispatch, getState) {
//         // API Call
//         dispatch({ type: "account/convertingCurrency" });
//         const response = await fetch(
//             `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//         );

//         const data = await response.json();
//         const converted = data.rates.USD;

//         // return action;

//         dispatch({ type: "account/deposit", payload: converted });
//         // return; //action;
//     };
// }
// function withdraw(amount) {
//     return { type: "account/withdraw", payload: amount };
// }
// function requestLoan(amount, purpose) {
//     return {
//         type: "account/requestLoan",
//         payload: { purpose, amount },
//     };
// }
// function payLoan() {
//     return {
//         type: "account/payLoan",
//     };
// }

// export const accountActions = {
//     deposit,
//     withdraw,
//     requestLoan,
//     payLoan,
// };
