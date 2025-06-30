import React, { useState } from 'react';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const handleAddTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask('');
        }
    };

    const handleToggleComplete = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Task Manager</h2>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="Enter a new task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    style={styles.input}
                />
                <button onClick={handleAddTask} style={styles.addButton}>Add</button>
            </div>
            <ul style={styles.taskList}>
                {tasks.map((task, index) => (
                    <li key={index} style={{ 
                        ...styles.taskItem, 
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: '#000'
                    }}>
                        <span onClick={() => handleToggleComplete(index)} style={styles.taskText}>
                            {task.text}
                        </span>
                        <button onClick={() => handleDeleteTask(index)} style={styles.deleteButton}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '500px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Arial, sans-serif',
        color: '#000' // Ensures default text is black
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#000'
    },
    inputContainer: {
        display: 'flex',
        marginBottom: '20px'
    },
    input: {
        flex: 1,
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px 0 0 4px',
        color: '#000'
    },
    addButton: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '0 4px 4px 0',
        cursor: 'pointer'
    },
    taskList: {
        listStyle: 'none',
        padding: 0
    },
    taskItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #eee',
        color: '#000'
    },
    taskText: {
        cursor: 'pointer',
        flex: 1,
        color: '#000'
    },
    deleteButton: {
        marginLeft: '10px',
        padding: '5px 10px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default TaskManager;
