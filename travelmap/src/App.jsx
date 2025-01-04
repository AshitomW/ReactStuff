import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { lazy, Suspense, useEffect, useState } from "react";
import { CitiesProvider } from "./contexts/CityContext";
import { AuthProvider } from "./contexts/FakeAuthContext";

// import Products from "./pages/Products";
// import Homepage from "./pages/Homepage";
// import Pricing from "./pages/Pricing";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import ProtectedRoute from "./pages/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";

// const Homepage = lazy();

const Homepage = lazy(() => import("./pages/Homepage"));
const Products = lazy(() => import("./pages/Products"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

// Loading Spinner From 1 Page to Another;

export default function App() {
    return (
        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Suspense fallback={<SpinnerFullPage />}>
                        <Routes>
                            <Route index element={<Homepage />} />
                            <Route path="products" element={<Products />} />
                            <Route path="pricing" element={<Pricing />} />
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="app"
                                element={
                                    <ProtectedRoute>
                                        <AppLayout />
                                    </ProtectedRoute>
                                }
                            >
                                <Route
                                    index
                                    element={<Navigate replace to="cities" />}
                                />
                                <Route path="cities" element={<CityList />} />
                                <Route path="cities/:id" element={<City />} />
                                <Route
                                    path="countries"
                                    element={<CountryList />}
                                />
                                <Route path="form" element={<Form />} />
                            </Route>
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>
    );
}
