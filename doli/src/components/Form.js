import { useState } from "react";
export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);

  function resetState() {
    setDescription("");
    setPriority(1);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!description) return;

    const newItem = { description, priority, completed: false, id: Date.now() };
    // console.log(newItem);
    onAddItems(newItem);
    resetState();
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to complete?</h3>
      <select
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value))}
      >
        {Array.from({ length: 10 }, (_, index) => index + 1).map((index) => (
          <option value={index} key={index}>
            {index}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item......."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
