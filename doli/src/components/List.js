import Item from "./Items";

import { useState } from "react";
export default function List({
  items,
  onDeleteItem,
  onHandleCompletion,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description") {
    sortedItems = items
      .slice()

      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === "completed") {
    sortedItems = items.sort(
      (a, b) => Number(a.completed) - Number(b.completed)
    );
  }
  if (sortBy === "priority") {
    sortedItems = items.sort((a, b) => b.priority - a.priority);
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onHandleCompletion={onHandleCompletion}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort By Input Order</option>
          <option value="description">Sort By Description</option>
          <option value="completed">Sort By Completed</option>
          <option value="priority">Sort By priority</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}
