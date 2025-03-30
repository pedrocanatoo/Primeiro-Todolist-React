import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // Carregar tarefas do localStorage quando o componente é montado
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Salvar tarefas no localStorage sempre que o estado 'tasks' mudar
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Função para adicionar uma nova tarefa
  const addTask = () => {
    if (task) {
      setTasks([...tasks, { id: Date.now(), text: task }]);
      setTask(''); // Limpar campo de entrada
    }
  };

  // Função para remover uma tarefa
  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="App">
      <h1>Lista de Tarefas</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Digite uma tarefa"
      />
      <button onClick={addTask}>Adicionar</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => removeTask(task.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
