import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddTodo = () => {
        if (inputValue.trim()) {
            setTodos([...todos, inputValue]);
            setInputValue('');
        }
    };

    const handleDeleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input 
                type="text" 
                value={inputValue} 
                onChange={handleInputChange} 
                placeholder="Add a new todo" 
            />
            <button onClick={handleAddTodo}>Add</button>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        {todo} 
                        <button onClick={() => handleDeleteTodo(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<TodoApp />);