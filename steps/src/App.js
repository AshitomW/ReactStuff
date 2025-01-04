import { useState, Fragment } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
// Data does not depend on anything inside componenet.
// Every time the funciton is executed the array will be created again.

function SApp() {
  const buttonStyle = { backgroundColor: "#7950f2", color: "#fff" };

  // Adding new State

  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step <= 1) return;
    setStep((state) => state - 1);
    // step -= 1;
  }
  function handleNext() {
    if (step >= 3) return;
    console.log("Before" + step);
    setStep((state) => state + 1);

    // step += 1;
  }
  function toggleModel() {
    setIsOpen((is) => !is);
  }

  return (
    <Fragment>
      <button className="close" onClick={toggleModel}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>
          <div className="buttons">
            {/* <button style={buttonStyle} onClick={handlePrevious}>
              Previous
            </button> */}
            <Button
              backgroundColor={buttonStyle.backgroundColor}
              fontColor={buttonStyle.color}
              onClick={handlePrevious}
            >
              <span>Previous</span>
            </Button>
            <Button
              backgroundColor={buttonStyle.backgroundColor}
              fontColor={buttonStyle.color}
              onClick={handleNext}
            >
              <span>Next</span>
            </Button>
          </div>
        </div>
      )}
    </Fragment>
  );
}

function App() {
  return <TipCalculator />;
}

function Button({ label, backgroundColor, fontColor, onClick, children }) {
  //
  return (
    <button
      style={{ backgroundColor: backgroundColor, color: fontColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStepCount] = useState(1);

  const currentDate = new Date("2024-11-10");
  currentDate.setDate(currentDate.getDate() + count);

  return (
    <>
      <div>
        <button onClick={() => setCount((c) => c - step)}>-</button>
        <span>Count:{count}</span>
        <button onClick={() => setCount((c) => c + step)}>+</button>
      </div>
      <br />
      <div>
        <button onClick={() => setStepCount((c) => c - 1)}>-</button>
        <span>step:{step}</span>
        <button onClick={() => setStepCount((c) => c + 1)}>+</button>
      </div>
      <br />
      <span>
        {count === 0
          ? "Today is "
          : count > 0
          ? `${count} days from today is `
          : `${Math.abs(count)} days ago  was `}
      </span>
      <span>{currentDate.toString()}</span>
    </>
  );
}

function TipCalculator() {
  const [billValue, setBillValue] = useState("");
  const [percentageUser, setPercentageUser] = useState(0);
  const [percentageFriend, setPercentageFriend] = useState(0);

  function handleReset() {
    setBillValue(0);
    setPercentageUser(0);
    setPercentageFriend(0);
  }

  const tip = billValue * ((percentageUser + percentageFriend) / 2 / 100);
  return (
    <div>
      <BillInput bill={billValue} setBill={setBillValue} />
      <SelectPercentage
        percentage={percentageUser}
        setPercentage={setPercentageUser}
      >
        How did you like the service:{" "}
      </SelectPercentage>
      <SelectPercentage
        percentage={percentageFriend}
        setPercentage={setPercentageFriend}
      >
        How did your friend like the service:
      </SelectPercentage>
      {billValue > 0 && (
        <>
          {" "}
          <Output bill={billValue} tip={tip} />
          <Reset handleReset={handleReset} />
        </>
      )}
    </div>
  );
}

function BillInput({ bill, setBill }) {
  return (
    <div>
      <label>How much was the bill : </label>
      <input
        type="text"
        placeholder="Bill value"
        value={bill}
        onChange={(event) => {
          setBill(Number(event.target.value));
        }}
      />
    </div>
  );
}

function SelectPercentage({ percentage, setPercentage, children }) {
  return (
    <div>
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(event) => setPercentage(Number(event.target.value))}
      >
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>below average (5%)</option>
        <option value={10}>miid (10%)</option>
        <option value={20}>good (20%)</option>
        <option value={40}>Very good (40%)</option>
      </select>
    </div>
  );
}

function Output({ bill, tip }) {
  return (
    <h3>
      You Pay {bill + tip} ({bill}+{tip})
    </h3>
  );
}

function Reset({ handleReset }) {
  return <button onClick={handleReset}> Reset</button>;
}

export default App;
