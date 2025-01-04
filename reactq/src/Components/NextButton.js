import React from "react";

export default function NextButton({ dispatch, answer, numQuestions, index }) {
    const isLastQuestion = !(index < numQuestions - 1);
    const actionType = isLastQuestion ? "finish" : "nextQuestion";

    if (answer === null) return;
    return (
        <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: actionType })}
        >
            {isLastQuestion ? "Finish" : "Next"}
        </button>
    );
}
