import { useState, useEffect } from "react";

const APIKEY = "86ae85af";
export function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(
        function () {
            const controller = new AbortController();

            const fetchMovies = async function () {
                try {
                    setLoading(true);
                    setError("");
                    const response = await fetch(
                        `https://www.omdbapi.com/?apikey=${APIKEY}&s=${query}`,
                        {
                            signal: controller.signal,
                        }
                    );

                    if (!response.ok)
                        throw new Error(
                            "Something Went Wrong With Fetching Data!"
                        );

                    const data = await response.json();

                    if (data.Response === "False")
                        throw new Error("Movie Not Found 404 !");
                    setMovies(data.Search);
                    setError("");
                } catch (error) {
                    if (error.name !== "AbortError") setError(error.message);
                } finally {
                    setLoading(false);
                }
            };

            if (query.length < 3) {
                setMovies([]);
                setError("");
                return;
            }

            fetchMovies();

            return function () {
                controller.abort();
            };
        },
        [query]
    );

    return { movies, isLoading, error };
}
