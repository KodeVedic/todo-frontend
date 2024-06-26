import React, { useState, useEffect } from 'react';
import axios from 'axios';
const App = () => {
 const [todos, setTodos] = useState([]);
 const [text, setText] = useState('');
 useEffect(() => {
 axios.get('http://localhost:5000/todos')
 .then(response => setTodos(response.data))
 .catch(error => console.error('Error fetching data: ', error));
 }, []);
 const addTodo = () => {
 if (text) {
 axios.post('http://localhost:5000/todos', { text })
 .then(response => setTodos([...todos, response.data]))
 .catch(error => console.error('Error adding todo: ', error));
 setText('');
 }
 };
 const deleteTodo = (id) => {
 axios.delete(`http://localhost:5000/todos/${id}`)
 .then(response => setTodos(todos.filter(todo => todo._id !== id)))
 .catch(error => console.error('Error deleting todo: ', error));
 };
 return (
 <div className="App">
 <h1>To-Do List</h1>
 <input
 type="text"
 value={text}
 onChange={(e) => setText(e.target.value)} 
 placeholder="Add a new task" 
 />
 <button onClick={addTodo}>Add</button>
 <ul>
 {todos.map(todo => (
 <li key={todo._id}>
 {todo.text}
 <button onClick={() => deleteTodo(todo._id)}>Delete</button>
 </li>
 ))}
 </ul>
 </div>
 );
};
export default App