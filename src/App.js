import React, { useEffect, useState } from 'react';
import {
  getAllTasks, createTask, updateTask, deleteTask, searchTasks
} from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: '', description: '', dueDate: '', status: 'PENDING', remarks: '',
    createdByName: 'John Doe', createdById: 'U001'
  });
  const [editId, setEditId] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => { loadTasks(); }, []);

  const loadTasks = async () => {
    const res = await getAllTasks();
    setTasks(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateTask(editId, { ...form, updatedByName: 'John Doe', updatedById: 'U001' });
    } else {
      await createTask(form);
    }
    setForm({ title: '', description: '', dueDate: '', status: 'PENDING', remarks: '', createdByName: 'John Doe', createdById: 'U001' });
    setEditId(null);
    loadTasks();
  };

  const handleEdit = (task) => { setEditId(task.id); setForm(task); };
  const handleDelete = async (id) => { await deleteTask(id); loadTasks(); };
  const handleSearch = async () => {
    if (searchText) {
      const res = await searchTasks(searchText);
      setTasks(res.data);
    } else {
      loadTasks();
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Task Manager</h1>
      <input type="text" placeholder="Search by title" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option value="PENDING">PENDING</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
        <input placeholder="Remarks" value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })} />
        <button type="submit">{editId ? 'Update' : 'Create'} Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.status}
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
