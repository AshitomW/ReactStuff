import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

// App Component
function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Menu() {
  let pizzas = pizzaData;

  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {pizzas.length > 0 ? (
        <React.Fragment>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose form. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzas.map(function (pizza) {
              return <Pizza pizza={pizza} key={pizza.name} />;
            })}
          </ul>
        </React.Fragment>
      ) : (
        <p>Still Working on the menu</p>
      )}
      {/* <Pizza
        name="Pizza Prosciutto"
        ingredients="Tomato, mozarella, ham, aragula, and burrata cheese"
        image="pizzas/prosciutto.jpg"
        price={120}
      /> */}
    </main>
  );
}
function Pizza(props) {
  const { name, ingredients, photoName: image, price, soldOut } = props.pizza;

  //   if (soldOut) return null;

  return (
    <li className={`pizza ${soldOut ? "sold-out" : ""}`}>
      <img src={image} alt={name}></img>
      <div>
        <h3>{name}</h3>
        <p> {ingredients}</p>
        <span>{soldOut ? "SOLD OUT" : price}</span>
      </div>
    </li>
  );
}

function Header() {
  //style={{ fontSize: "2.5em" }}
  return (
    <header className="header">
      <h1>Fast Pizza Service Company</h1>
    </header>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 5;
  const closedHour = 22;
  const isOpen = hour >= openHour && hour <= closedHour;
  // in strict mode rendered twice

  //   return React.createElement("footer", null, "Currently Open");
  return (
    <footer className="footer">
      {isOpen ? (
        <Order closedHour={closedHour} />
      ) : (
        <p>
          We will be happy to serve you from {openHour}:00-{closedHour}:00
        </p>
      )}
    </footer>
  );
}

function Order(props) {
  return (
    <div className="order">
      <p>
        We're Open Until {props.closedHour}:00. Come Visit Us or Order Online !
      </p>
      <button className="btn">Order</button>
    </div>
  );
}
// React Version 18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
