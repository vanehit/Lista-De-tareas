import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import "./App.css"; // Importamos los estilos CSS

const TodoList = () => {
  // Estado para almacenar las tareas
  const [tasks, setTasks] = useState([]);
  // Estado para manejar la nueva tarea a agregar
  const [newTask, setNewTask] = useState("");
  // Estado para el modo oscuro o claro
  const [darkMode, setDarkMode] = useState(false);

  // Obtenemos tareas desde la API al montar el componente
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setTasks(response.data.slice(0, 5)); // Solo mostramos las primeras 5 tareas
      })
      .catch((error) => {
        console.error("Error al obtener tareas:", error);
      });
  }, []);

  // Esta Función agrega una nueva tarea
  const handleAddTask = () => {
    if (newTask.trim() === "") return; // Evitemos agregar tareas vacías

    const task = { id: Date.now(), text: newTask, completed: false };
    setTasks([...tasks, task]); // Agregamos la nueva tarea a la lista
    setNewTask(""); // Limpiamos el input
  };

  //Esta Función elimina una tarea por su ID
  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  //Esta Función edita una tarea
  const handleEditTask = (id, newText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  };

  // Alternamos entre modo claro y oscuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`todo-container ${darkMode ? "dark" : "light"}`}>
      <div className="todo-card">
        <button onClick={toggleDarkMode} className="mode-button">
          Cambiar a {darkMode ? "Modo Claro" : "Modo Oscuro"}
        </button>

        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Agregar tarea"
          className="task-input"
        />
        <button onClick={handleAddTask} className="add-button">
          Agregar
        </button>

        <ul className="task-list">
          {tasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
