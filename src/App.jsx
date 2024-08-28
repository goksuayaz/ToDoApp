import React, { useState } from 'react'
import './index.css';

function App() {
  const [todos, setTodos] = useState([
    { text: "Learn JavaScript", completed: true },
    { text: "Learn React", completed: false },
    { text: "Have a life!", completed: false },
  ]);

  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("All");

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;
    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const clearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Active") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true;
  });

  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={addTodo}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            autoFocus
          />
        </form>
      </header>

      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onChange={() => {
            const allCompleted = todos.every((todo) => todo.completed);
            setTodos(todos.map((todo) => ({ ...todo, completed: !allCompleted })));
          }}
          checked={todos.every((todo) => todo.completed)}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list">
          {filteredTodos.map((todo, index) => (
            <li key={index} className={todo.completed ? "completed" : ""}>
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(index)}
                />
                <label>{todo.text}</label>
                <button className="destroy" onClick={() => removeTodo(index)}></button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer className="footer">
        <span className="todo-count">
          <strong>{itemsLeft}</strong> item{itemsLeft !== 1 && "s"} left
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              className={filter === "All" ? "selected" : ""}
              onClick={() => setFilter("All")}
            >
              All
            </a>
          </li>
          <li>
            <a
              href="#/"
              className={filter === "Active" ? "selected" : ""}
              onClick={() => setFilter("Active")}
            >
              Active
            </a>
          </li>
          <li>
            <a
              href="#/"
              className={filter === "Completed" ? "selected" : ""}
              onClick={() => setFilter("Completed")}
            >
              Completed
            </a>
          </li>
        </ul>

        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    </section>
  );
}

export default App;