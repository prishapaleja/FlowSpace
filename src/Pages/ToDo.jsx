import React, { useState } from 'react';
import { Menu, Edit2, Trash2 } from 'lucide-react';

export default function TodoApp() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Homework', completed: false },
    { id: 2, text: 'Groceries', completed: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [hoveredTask, setHoveredTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editValue, setEditValue] = useState('');

  const addTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditValue(task.text);
  };

  const saveEdit = (id) => {
    if (editValue.trim()) {
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, text: editValue } : task
      ));
    }
    setEditingTask(null);
    setEditValue('');
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-cyan-400 to-blue-400 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center mb-8 px-4">
          <button className="text-gray-800 hover:text-gray-600">
            <Menu size={28} />
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h1 className="text-4xl font-light text-center text-indigo-900 mb-8" style={{ fontFamily: 'monospace' }}>
            My To-Do List
          </h1>

          {/* Input Section */}
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Type your task here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              className="flex-1 px-6 py-4 bg-cyan-50 rounded-full border-none outline-none text-gray-700 placeholder-cyan-400 focus:ring-2 focus:ring-cyan-300"
            />
            <button
              onClick={addTask}
              className="px-8 py-4 bg-cyan-400 hover:bg-cyan-500 text-white rounded-full font-medium transition-colors"
            >
              + Add
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm text-gray-600">{completedCount} / {totalCount}</span>
            </div>
            <div className="w-full bg-cyan-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-indigo-900 h-full rounded-full transition-all duration-300"
                style={{ width: `${totalCount ? (completedCount / totalCount) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Tasks List */}
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`relative flex items-center gap-4 px-6 py-4 rounded-full transition-all duration-200 ${
                  task.completed
                    ? 'bg-indigo-100'
                    : hoveredTask === task.id
                    ? 'bg-cyan-200'
                    : 'bg-cyan-50'
                }`}
                onMouseEnter={() => setHoveredTask(task.id)}
                onMouseLeave={() => setHoveredTask(null)}
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleTask(task.id)}
                  className="flex-shrink-0"
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    task.completed
                      ? 'bg-indigo-900 border-indigo-900'
                      : 'border-cyan-400 bg-white'
                  }`}>
                    {task.completed && (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </button>

                {/* Task Text */}
                {editingTask === task.id ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => saveEdit(task.id)}
                    onKeyPress={(e) => e.key === 'Enter' && saveEdit(task.id)}
                    className="flex-1 bg-transparent border-none outline-none text-gray-800"
                    autoFocus
                  />
                ) : (
                  <span className={`flex-1 text-gray-800 ${task.completed ? 'line-through' : ''}`}>
                    {task.text}
                  </span>
                )}

                {/* Action Buttons */}
                {(hoveredTask === task.id || editingTask === task.id) && !task.completed && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(task)}
                      className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}