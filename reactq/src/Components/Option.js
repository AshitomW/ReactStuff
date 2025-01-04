import React from "react";

export default function Options({ question, dispatch, answer }) {
    const answered = answer !== null;
    return (
        <div className="options">
            {question.options.map((option, index) => (
                <button
                    key={option}
                    className={`btn btn-option ${
                        index === answer ? "answer" : ""
                    } ${
                        answered
                            ? index === question.correctOption
                                ? "correct"
                                : "wrong"
                            : ""
                    }`}
                    onClick={() =>
                        dispatch({ type: "newAnswer", payload: index })
                    }
                    disabled={answered}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}
