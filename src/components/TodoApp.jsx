import { useState, useEffect } from "react";
import "./TodoApp.css";

const TodoApp = () => {
  // Lista de Tarefa
  const [todos, setTodos] = useState([]);

  // Estado de texto da tarefa
  const [inputValue, setInputValue] = useState("");

  // Carregar tarefas do localStorage ao iniciar
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Salvar tarefas no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Adicionar Tarefa
  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
      };

      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInputValue("");
    }
  };

  // Deletar Tarefa
  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app-container">
      <h1 className="title">Lista de Tarefa</h1>

      {/* Form para adicionar tarefa */}
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          className="input-field"
          placeholder="Adicione uma Tarefa..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="add-button">
          Adicionar
        </button>
      </form>

      {/* Lista de Tarefas */}
      {todos.length === 0 && <p className="empty">Não há Tarefas</p>}

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {todo.text}
            <button
              className="delete-button"
              onClick={() => handleDelete(todo.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
