import { combineReducers } from "redux";
import { createStore } from "redux";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
};

const initialStateCustomers = {
    fullName: "",
    nationalID: "",
    createdAt: "",
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case "account/deposit":
            return { ...state, balance: state.balance + action.payload };
        case "account/withdraw":
            return { ...state, balance: state.balance - action.payload };
        case "account/requestLoan":
            if (state.loan > 0) return state;
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount,
            };

        case "account/payLoan":
            return {
                ...state,
                loan: 0,
                loanPurpose: "",
                balance: state.balance - state.loan,
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    account: reducer,
    customer: customerReducer,
});

const store = createStore(rootReducer);

function deposit(amount) {
    return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
    return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
    return {
        type: "account/requestLoan",
        payload: { purpose, amount },
    };
}
function payLoan() {
    return {
        type: "account/payLoan",
    };
}

function customerReducer(state = initialStateCustomers, action) {
    switch (action.type) {
        case "customer/createCustomer":
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt,
            };
        case "customer/updateName":
            return {
                ...state,
                fullName: action.payload.fullName,
            };
        default:
            return state;
    }
}

function createCustomer(fullName, nationalID) {
    return {
        type: "customer/createCustomer",
        payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString(),
        },
    };
}

function updateName(fullName) {
    return {
        type: "customer/updateName",
        payload: {
            fullName,
        },
    };
}

// store.dispatch(createCustomer("Asher Kwang", "2020202"));
// store.dispatch(deposit("20"));
// console.log(store.getState());
