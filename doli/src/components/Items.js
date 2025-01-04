export default function Item({ item, onDeleteItem, onHandleCompletion }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.completed}
        onChange={() => {
          onHandleCompletion(item.id);
        }}
      />
      <span style={item.completed ? { textDecoration: "line-through" } : {}}>
        {item.description} {item.priority}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
