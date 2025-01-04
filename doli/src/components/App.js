import { clear } from "@testing-library/user-event/dist/clear";
import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import List from "./List";

import Stats from "./Stats";
export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    // items.push() mutating
    setItems((items) => [...items, item]);
  }

  function handleCompletion(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function handleDeleteItem(itemID) {
    setItems((items) => items.filter((item) => item.id !== itemID));
  }

  function clearList() {
    if (items.length) {
      const approval = window.confirm("Clear The List ?");
      if (approval) {
        setItems([]);
      }
    } else {
      window.alert("List already empty");
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <List
        items={items}
        onDeleteItem={handleDeleteItem}
        onHandleCompletion={handleCompletion}
        onClearList={clearList}
      />
      <Stats items={items} />
    </div>
  );
}
