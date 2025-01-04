export default function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start adding tasks to your checklist!</em>
      </p>
    );
  }

  const numItems = items.length;
  const numCompleted = items.filter((item) => item.completed).length;
  const percentage = Math.round((numCompleted / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage !== 100
          ? ` You have ${numItems} Items on your list. You have Already completed
          ${numCompleted} tasks. ${percentage}%`
          : "All Tasks Completed !"}
      </em>
    </footer>
  );
}
