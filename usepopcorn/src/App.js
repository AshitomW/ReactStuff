import { useEffect, useRef, useState } from "react";
import StarRating from "./starrating";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorage";
import { useKey } from "./useKey";

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Search({ query, setQuery }) {
    const searchElement = useRef(null);

    // useEffect(
    //     function () {
    //         function callback(e) {
    //             if (document.activeElement === searchElement.current) return;

    //             if (e.code === "Enter") {
    //                 searchElement.current.focus();
    //                 setQuery("");
    //             }
    //         }

    //         document.addEventListener("keydown", callback);
    //         return () => document.removeEventListener("keydown", callback);
    //     },
    //     [setQuery]
    // );

    useKey("Enter", function () {
        if (document.activeElement === searchElement.current) return;
        searchElement.current.focus();
        setQuery("");
    });

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={searchElement}
        />
    );
}

function Logo() {
    return (
        <div className="logo">
            <span role="img">🍿</span>
            <h1>usePopcorn</h1>
        </div>
    );
}
const APIKEY = "86ae85af";
function NavBar({ children }) {
    return (
        <nav className="nav-bar">
            {" "}
            <Logo />
            {children}
        </nav>
    );
}

export default function App() {
    const [query, setQuery] = useState("");
    const [selectedID, setSelectedID] = useState(null);

    const { movies, isLoading, error } = useMovies(query);

    // const tempQuery = "interstellar";
    const [watched, setWatched] = useLocalStorageState([], "watched");

    function handleSelectMovie(id) {
        setSelectedID((selectedID) => (selectedID === id ? null : id));
    }

    function handleCloseMovie() {
        setSelectedID(null);
    }

    function handleAddWatched(movie) {
        setWatched((watched) => [...watched, movie]);

        // Local Storage || Events

        // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
    }

    useEffect(
        function () {
            localStorage.setItem("watched", JSON.stringify(watched));
        },
        [watched]
    );

    function handleDeleteWatched(id) {
        setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    }

    return (
        <>
            <NavBar>
                <Search query={query} setQuery={setQuery} />
                <NumResults movies={movies} />
            </NavBar>
            <Main>
                <Box>
                    {isLoading && <Loader />}
                    {!isLoading && !error && (
                        <ListBoxMovie
                            movies={movies}
                            onSelect={handleSelectMovie}
                        />
                    )}
                    {error && <ErrorMessage message={error} />}
                </Box>

                {/* Box element = {<MovieList movie={movie}} */}
                <Box>
                    {selectedID ? (
                        <SelectedMovieDetails
                            selectedID={selectedID}
                            onCloseMovie={handleCloseMovie}
                            onAddWatched={handleAddWatched}
                            watched={watched}
                        />
                    ) : (
                        <>
                            <Summary watched={watched} />
                            <MovieList
                                watched={watched}
                                onDeleteWatched={handleDeleteWatched}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}

function SelectedMovieDetails({
    selectedID,
    onCloseMovie,
    onAddWatched,
    watched,
}) {
    // When the component mounts , we need to view the details baesd on selected id;

    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState("");

    const countRef = useRef(0);

    useEffect(
        function () {
            if (userRating) countRef.current = countRef.current + 1;
        },
        [userRating]
    );

    const isWatched = watched.map((movie) => movie.imdbID).includes(selectedID);
    const watchedUserRating = watched.find(
        (movie) => movie.imdbID === selectedID
    )?.userRating;

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    function handleAdd() {
        console.log(poster);
        const newWatchedMovie = {
            imdbID: selectedID,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0)),
            userRating,
            countRatingDescision: countRef.current,
        };

        onAddWatched(newWatchedMovie);
        // onCloseMovie();
    }

    useEffect(
        function () {
            if (!title) return;
            document.title = `Movie | ${title}`;

            return function () {
                document.title = "usePopcorn";
            };
        },
        [title]
    );
    useKey("escape", onCloseMovie);

    useEffect(
        function () {
            async function getMovieDetails() {
                setIsLoading(true);
                const response = await fetch(
                    `https://www.omdbapi.com/?apikey=${APIKEY}&i=${selectedID}`
                );

                const data = await response.json();

                setMovie(data);
                setIsLoading(false);
            }

            getMovieDetails();
        },
        [selectedID]
    );

    return (
        <div className="details">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <header>
                        <button onClick={onCloseMovie} className="btn-back">
                            &larr;
                        </button>
                        <img src={poster} alt={`Poster of ${title} movie`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐️</span>
                                {imdbRating} IMDB Rating
                            </p>
                        </div>
                    </header>

                    <section>
                        <div className="rating">
                            {!isWatched ? (
                                <>
                                    <StarRating
                                        maxRating={10}
                                        size={24}
                                        onSetRating={setUserRating}
                                    />
                                    {userRating > 0 && (
                                        <button
                                            className="btn-add"
                                            onClick={handleAdd}
                                        >
                                            + Add To List
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p>
                                    You rated with movie {watchedUserRating}{" "}
                                    <span>⭐️</span>
                                </p>
                            )}
                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring {actors}</p>
                        <p> Directed By {director}</p>
                    </section>
                </>
            )}
        </div>
    );
}

function NumResults({ movies }) {
    return (
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    );
}

function ErrorMessage({ message }) {
    return (
        <p className="error">
            <span>💣 </span>
            {message}
        </p>
    );
}

function Loader() {
    return <p className="loader">Loading</p>;
}
function Main({ children }) {
    return <main className="main">{children}</main>;
}

function Box({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? "-" : "+"}
            </button>
            {isOpen && children}
        </div>
    );
}

function ListBoxMovie({ movies, onSelect }) {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <MoviesList
                    movie={movie}
                    key={movie.imdbID}
                    onSelect={onSelect}
                />
            ))}
        </ul>
    );
}

function MoviesList({ movie, onSelect }) {
    return (
        <li key={movie.imdbID} onClick={() => onSelect(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    );
}

function Summary({ watched }) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));
    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
        </div>
    );
}

function MovieList({ watched }) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <Movie movie={movie} key={movie.imdbID} />
            ))}
        </ul>
    );
}

function Movie({ movie }) {
    return (
        <li key={movie.imdbID}>
            <img src={movie.poster} alt={`${movie.Title} poster`} />
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>
            </div>
        </li>
    );
}
