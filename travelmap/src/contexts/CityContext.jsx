import {
    createContext,
    useState,
    useEffect,
    useContext,
    useReducer,
    useCallback,
} from "react";

const initialState = {
    currentCity: {},
    cities: [],
    isLoading: false,
    error: "",
};

// Reducers need to be a pure function , we cannot make api calls there
function reducer(state, action) {
    switch (action.type) {
        case "loading":
            return {
                ...state,
                isLoading: true,
            };
        case "city/loaded":
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload,
            };
        case "cities/loaded":
            return {
                ...state,
                isLoading: false,
                cities: action.payload,
            };

        case "cities/created":
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload,
            };

        case "cities/deleted":
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(
                    (city) => city.id !== action.payload
                ),
                currentCity: {},
            };

        case "rejected":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        default:
            throw new Error("Unknown action type");
    }
}

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";
function CitiesProvider({ children }) {
    // const [currentCity, setCurrentCity] = useState({});
    // const [cities, setCities] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);

    const [{ cities, currentCity, isLoading }, dispatch] = useReducer(
        reducer,
        initialState
    );

    useEffect(function () {
        async function fetchCities() {
            dispatch({ type: "loading" });
            try {
                const response = await fetch(`${BASE_URL}/cities`);
                const data = await response.json();
                dispatch({ type: "cities/loaded", payload: data });
            } catch (error) {
                dispatch({ type: "rejected", payload: "Error Loading Data" });
            }
        }
        fetchCities();
    }, []);

    const getCity = useCallback(
        async function getCity(id) {
            if (Number(id) === currentCity.id) return;
            dispatch({ type: "loading" });
            try {
                const response = await fetch(`${BASE_URL}/cities/${id}`);
                const data = await response.json();
                dispatch({ type: "city/loaded", payload: data });
            } catch (error) {
                dispatch({ type: "rejected", payload: "Error Loading Data" });
            }
        },
        [currentCity.id]
    );

    async function createCity(newCity) {
        dispatch({ type: "loading" });
        try {
            const response = await fetch(`${BASE_URL}/cities/`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            dispatch({ type: "cities/created", payload: data });
        } catch (error) {
            dispatch({ type: "rejected", payload: "Error Loading Data" });
        }
    }

    async function deleteCity(id) {
        dispatch({ type: "loading" });
        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            });
            dispatch({ type: "cities/deleted", payload: id });
        } catch (error) {
            dispatch({ type: "rejected", payload: "Error Loading Data" });
        }
    }

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                getCity,
                createCity,
                deleteCity,
            }}
        >
            {children}
        </CitiesContext.Provider>
    );
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined)
        return new Error("useCities used outside of the consumer");
    return context;
}

export { CitiesProvider, useCities };
