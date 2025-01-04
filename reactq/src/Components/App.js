import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Timer from "./Timer";
import Footer from "./Footer";
const initialState = {
    questions: [],
    status: "loading", // loading , error , ready , active , finished
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: null,
};
const SECONDS_PER_QUESTION = 15;

function reducer(state, action) {
    switch (action.type) {
        case "dataRecieved":
            return {
                ...state,
                questions: action.payload,
                status: "ready",
            };
        case "dataFailed":
            return {
                ...state,
                status: "error",
            };
        case "start":
            return {
                ...state,
                status: "active",
                secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
            };
        case "newAnswer":
            const question = state.questions.at(state.index);

            return {
                ...state,
                answer: action.payload,
                points:
                    action.payload === question.correctOption
                        ? state.points + question.points
                        : state.points,
            };
        case "nextQuestion":
            return { ...state, index: state.index + 1, answer: null };
        case "finish":
            return {
                ...state,
                status: "finished",
                highscore:
                    state.points > state.highscore
                        ? state.points
                        : state.highscore,
            };
        case "reset":
            return {
                ...initialState,
                question: state.questions,
                status: "ready",
                highscore: state.highscore,
            };
        case "tick":
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status:
                    state.secondsRemaining === 0 ? "finished" : state.status,
            };
        default:
            throw new Error("Unkown Dispatch type");
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
    } = state;

    const numQuestions = questions.length;
    const totalPoints = questions.reduce(
        (previous, current) => previous + current.points,
        0
    );

    useEffect(function () {
        async function fetchQuestions() {
            try {
                const response = await fetch("http://localhost:8000/questions");
                const data = await response.json();
                dispatch({ type: "dataRecieved", payload: data });
            } catch (error) {
                dispatch({ type: "dataFailed" });
            }
        }

        fetchQuestions();
    }, []);

    return (
        <div className="app">
            <Header />
            <Main>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && (
                    <StartScreen
                        numQuestions={numQuestions}
                        dispatch={dispatch}
                    />
                )}
                {status === "active" && (
                    <>
                        <Progress
                            index={index}
                            noOfQuestion={numQuestions}
                            points={points}
                            totalPoints={totalPoints}
                            answer={answer}
                        />
                        <Questions
                            question={questions[index]}
                            dispatch={dispatch}
                            answer={answer}
                        />
                        <Footer>
                            <Timer
                                dispatch={dispatch}
                                secondsRemaining={secondsRemaining}
                            />
                            <NextButton
                                dispatch={dispatch}
                                answer={answer}
                                numQuestions={numQuestions}
                                index={index}
                            />
                        </Footer>
                    </>
                )}
                {status === "finished" && (
                    <FinishedScreen
                        totalPoints={totalPoints}
                        points={points}
                        highscore={highscore}
                        dispatch={dispatch}
                    />
                )}
            </Main>
        </div>
    );
}

export default App;
