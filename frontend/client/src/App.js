import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios.get(API_URL).then((res) => setTasks(res.data));
  }, []);

  const addTask = async () => {
    if (!title) return;
    const newTask = { title, completed: false };
    const res = await axios.post(API_URL, newTask);
    setTasks([...tasks, res.data]);
    setTitle("");
  };

  const toggleTask = async (id, completed) => {
    await axios.put(`${API_URL}/${id}`, { completed: !completed });
    setTasks(tasks.map(task => task._id === id ? { ...task, completed: !completed } : task));
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-700 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Task Manager</h2>
        <div className="flex space-x-2 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New task"
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={addTask}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 shadow-md"
          >
            Add Task
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-gray-100 shadow-md rounded-lg">
            <thead>
              <tr className="bg-purple-600 text-white">
                <th className="p-3 text-left">Task</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task._id} className="border-b border-gray-300">
                  <td className={`p-3 ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                    {task.title}
                  </td>
                  <td className="p-3 text-center">
                    <span className={`px-3 py-1 rounded-lg text-white ${task.completed ? "bg-green-500" : "bg-blue-500"}`}>
                      {task.completed ? "Completed" : "Pending"}
                    </span>
                  </td>
                  <td className="p-3 text-center flex justify-center space-x-3">
                    <button
                      onClick={() => toggleTask(task._id, task.completed)}
                      className={`px-4 py-2 text-sm rounded-lg text-white shadow-md ${task.completed ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}`}
                    >
                      {task.completed ? "Undo" : "Complete"}
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 shadow-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
