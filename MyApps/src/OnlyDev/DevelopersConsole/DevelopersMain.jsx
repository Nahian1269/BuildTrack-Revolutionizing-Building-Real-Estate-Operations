import { useState, useEffect, useCallback } from 'react';
import {
  PlusCircle, UserPlus, ListTodo, Pencil, Trash2, Users, Briefcase, ChevronRight, MessageSquareText, XCircle, GanttChart, Loader2, Save
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:3001/api';

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  try {
    return new Date(dateString).toLocaleDateString(undefined, options);
  } catch {
    console.error("Invalid date string:", dateString);
    return 'Invalid Date';
  }
};

const makeApiCall = async (endpoint, method = 'GET', data = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

function JobTaskSchedulingPage() {
  const [activeTab, setActiveTab] = useState('tasks');
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddVacancyModal, setShowAddVacancyModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [currentTaskToEdit, setCurrentTaskToEdit] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [jobVacancies, setJobVacancies] = useState([]);
  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [isNotesExpanded, setIsNotesExpanded] = useState(true);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await makeApiCall('/tasks');
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks.');
      console.error('Fetch tasks error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await makeApiCall('/users');
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch users.');
      console.error('Fetch users error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchJobVacancies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await makeApiCall('/vacancies');
      setJobVacancies(data);
    } catch (err) {
      setError('Failed to fetch job vacancies.');
      console.error('Fetch vacancies error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await makeApiCall('/notes');
      setNotes(data);
    } catch (err) {
      setError('Failed to fetch notes.');
      console.error('Fetch notes error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
    fetchUsers();
    fetchJobVacancies();
    fetchNotes();
  }, [fetchTasks, fetchUsers, fetchJobVacancies, fetchNotes]);

  const addTask = async (newTask) => {
    setLoading(true);
    setError(null);
    try {
      const data = await makeApiCall('/tasks', 'POST', newTask);
      setTasks(prevTasks => [...prevTasks, data]);
      setShowAddTaskModal(false);
    } catch (err) {
      setError('Failed to add task.');
      console.error('Add task error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (updatedTask) => {
    setLoading(true);
    setError(null);
    try {
      const data = await makeApiCall(`/tasks/${updatedTask.id}`, 'PUT', updatedTask);
      setTasks(prevTasks => prevTasks.map(task => task.id === data.id ? data : task));
      setShowEditTaskModal(false);
      setCurrentTaskToEdit(null);
    } catch (err) {
      setError('Failed to update task.');
      console.error('Update task error:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setLoading(true);
      setError(null);
      try {
        await makeApiCall(`/tasks/${taskId}`, 'DELETE');
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      } catch (err) {
        setError('Failed to delete task.');
        console.error('Delete task error:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const openEditTaskModal = (task) => {
    setCurrentTaskToEdit(task);
    setShowEditTaskModal(true);
  };

  const addUser = async (newUser) => {
    setLoading(true);
    setError(null);
    // Validate user fields before sending to API
    if (!newUser.name || !newUser.email || !newUser.role) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }
    try {
      const data = await makeApiCall('/users', 'POST', {
        name: newUser.name.trim(),
        email: newUser.email.trim(),
        role: newUser.role.trim()
      });
      setUsers(prevUsers => [...prevUsers, data]);
      setShowAddUserModal(false);
    } catch (err) {
      setError('Failed to add user. Please check if the email is unique and all fields are valid.');
      console.error('Add user error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addVacancy = async (newVacancy) => {
    setLoading(true);
    setError(null);
    try {
      const data = await makeApiCall('/vacancies', 'POST', newVacancy);
      setJobVacancies(prevVacancies => [...prevVacancies, data]);
      setShowAddVacancyModal(false);
    } catch (err) {
      setError('Failed to add vacancy.');
      console.error('Add vacancy error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async () => {
    if (noteText.trim()) {
      setLoading(true);
      setError(null);
      try {
        const data = await makeApiCall('/notes', 'POST', { text: noteText });
        setNotes(prevNotes => [...prevNotes, data]);
        setNoteText('');
      } catch (err) {
        setError('Failed to add note.');
        console.error('Add note error:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const deleteNote = async (noteId) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      setLoading(true);
      setError(null);
      try {
        await makeApiCall(`/notes/${noteId}`, 'DELETE');
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
      } catch (err) {
        setError('Failed to delete note.');
        console.error('Delete note error:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const AddTaskModal = ({ onAddTask, onClose, usersList }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [status, setStatus] = useState('Pending');

    const handleSubmit = (e) => {
      e.preventDefault();
      onAddTask({ title, description, dueDate, assignedTo, status });
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 text-black">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New Task</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="task-title" className="block text-sm font-medium text-gray-700">Task Title</label>
              <input type="text" id="task-title" value={title} onChange={(e) => setTitle(e.target.value)} required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label htmlFor="task-description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea id="task-description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"></textarea>
            </div>
            <div>
              <label htmlFor="task-dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
              <input type="date" id="task-dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label htmlFor="task-assignedTo" className="block text-sm font-medium text-gray-700">Assign To</label>
              <select id="task-assignedTo" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500">
                <option value="">Select User</option>
                {usersList.map(user => (
                  <option key={user.id} value={user.id}>{user.name} ({user.role})</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="task-status" className="block text-sm font-medium text-gray-700">Status</label>
              <select id="task-status" value={status} onChange={(e) => setStatus(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500">
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Add Task
            </button>
          </form>
        </div>
      </div>
    );
  };

  const EditTaskModal = ({ task, onUpdateTask, onClose, usersList }) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState(task.dueDate);
    const [assignedTo, setAssignedTo] = useState(task.assignedTo);
    const [status, setStatus] = useState(task.status);

    const handleSubmit = (e) => {
      e.preventDefault();
      onUpdateTask({ ...task, title, description, dueDate, assignedTo, status });
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Edit Task</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="edit-task-title" className="block text-sm font-medium text-gray-700">Task Title</label>
              <input type="text" id="edit-task-title" value={title} onChange={(e) => setTitle(e.target.value)} required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label htmlFor="edit-task-description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea id="edit-task-description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"></textarea>
            </div>
            <div>
              <label htmlFor="edit-task-dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
              <input type="date" id="edit-task-dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label htmlFor="edit-task-assignedTo" className="block text-sm font-medium text-gray-700">Assign To</label>
              <select id="edit-task-assignedTo" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500">
                <option value="">Select User</option>
                {usersList.map(user => (
                  <option key={user.id} value={user.id}>{user.name} ({user.role})</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="edit-task-status" className="block text-sm font-medium text-gray-700">Status</label>
              <select id="edit-task-status" value={status} onChange={(e) => setStatus(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500">
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Update Task
            </button>
          </form>
        </div>
      </div>
    );
  };

  const AddUserModal = ({ onAddUser, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Developer');

    const handleSubmit = (e) => {
      e.preventDefault();
      onAddUser({ name, email, role });
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New User</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="user-name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="user-name" value={name} onChange={(e) => setName(e.target.value)} required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label htmlFor="user-email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="user-email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label htmlFor="user-role" className="block text-sm font-medium text-gray-700">Role</label>
              <select id="user-role" value={role} onChange={(e) => setRole(e.target.value)} required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="Developer">Developer</option>
                <option value="Project Manager">Project Manager</option>
                <option value="QA Engineer">QA Engineer</option>
                <option value="Designer">Designer</option>
              </select>
            </div>
            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add User
            </button>
          </form>
        </div>
      </div>
    );
  };

  const AddVacancyModal = ({ onAddVacancy, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [requirements, setRequirements] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      onAddVacancy({ title, description, requirements, status: 'Open' });
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Post New Job Vacancy</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="vacancy-title" className="block text-sm font-medium text-gray-700">Job Title</label>
              <input type="text" id="vacancy-title" value={title} onChange={(e) => setTitle(e.target.value)} required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500" />
            </div>
            <div>
              <label htmlFor="vacancy-description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea id="vacancy-description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500"></textarea>
            </div>
            <div>
              <label htmlFor="vacancy-requirements" className="block text-sm font-medium text-gray-700">Requirements</label>
              <textarea id="vacancy-requirements" value={requirements} onChange={(e) => setRequirements(e.target.value)} rows="3" required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500"></textarea>
            </div>
            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
              Post Vacancy
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 font-inter antialiased">
      <header className="bg-gray-800 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-extrabold text-white">DevHub</h1>
            <p className="text-gray-400 text-sm">Scheduler & HR</p>
          </div>
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-4 py-2 rounded-xl text-lg font-medium transition duration-200
                ${activeTab === 'tasks' ? 'bg-green-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
            >
              <ListTodo size={20} className="inline mr-2" /> Tasks
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-xl text-lg font-medium transition duration-200
                ${activeTab === 'users' ? 'bg-green-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
            >
              <Users size={20} className="inline mr-2" /> Users
            </button>
            <button
              onClick={() => setActiveTab('vacancies')}
              className={`px-4 py-2 rounded-xl text-lg font-medium transition duration-200
                ${activeTab === 'vacancies' ? 'bg-green-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
            >
              <Briefcase size={20} className="inline mr-2" /> Vacancies
            </button>
          </nav>
        </div>
      </header>

      <main className="p-8 max-w-7xl mx-auto">
        {loading && (
          <div className="flex items-center justify-center py-4 text-blue-600">
            <Loader2 size={24} className="animate-spin mr-2" />
            Loading data...
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {activeTab === 'tasks' && (
          <section className="bg-white p-8 rounded-2xl shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Task Management</h2>
              <button
                onClick={() => setShowAddTaskModal(true)}
                className="flex items-center px-6 py-3 bg-green-600 text-white font-bold rounded-xl shadow-md hover:bg-green-700 transition"
              >
                <PlusCircle size={20} className="mr-2" /> Add New Task
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider rounded-tl-lg">
                      Task
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Assigned To
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider rounded-tr-lg">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.length === 0 && !loading ? (
                    <tr>
                      <td colSpan="6" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center italic">No tasks added yet.</td>
                    </tr>
                  ) : (
                    tasks.map(task => (
                      <tr key={task.id} className="hover:bg-gray-50">
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-medium">{task.title}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-600 text-xs max-w-xs truncate">{task.description}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {users.find(u => u.id === task.assignedTo)?.name || 'Unassigned'}
                            {users.find(u => u.id === task.assignedTo)?.role && (
                              <span className="block text-xs text-gray-500">({users.find(u => u.id === task.assignedTo)?.role})</span>
                            )}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{formatDate(task.dueDate)}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                            task.status === 'Completed' ? 'text-green-900' :
                            task.status === 'In Progress' ? 'text-blue-900' :
                            task.status === 'Blocked' ? 'text-red-900' : 'text-yellow-900'
                          }`}>
                            <span aria-hidden="true" className={`absolute inset-0 opacity-50 rounded-full ${
                              task.status === 'Completed' ? 'bg-green-200' :
                              task.status === 'In Progress' ? 'bg-blue-200' :
                              task.status === 'Blocked' ? 'bg-red-200' : 'bg-yellow-200'
                            }`}></span>
                            <span className="relative">{task.status}</span>
                          </span>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center space-x-3">
                            <button onClick={() => openEditTaskModal(task)} className="text-indigo-600 hover:text-indigo-900 transition">
                              <Pencil size={18} />
                            </button>
                            <button onClick={() => deleteTask(task.id)} className="text-red-600 hover:text-red-900 transition">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-12 text-center bg-gray-50 p-8 rounded-2xl shadow-inner border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center">
                <GanttChart size={30} className="mr-3 text-green-600" /> Project Timeline Overview
              </h3>
              <div className="h-64 flex items-center justify-center bg-white rounded-lg border border-dashed border-gray-300 text-gray-500">
                <p>Interactive Gantt Chart Placeholder (Integration required)</p>
              </div>
              <p className="text-sm text-gray-400 mt-4">This area would typically display a visual Gantt chart of tasks and dependencies.</p>
            </div>
          </section>
        )}

        {activeTab === 'users' && (
          <section className="bg-white p-8 rounded-2xl shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">User Management</h2>
              <button
                onClick={() => setShowAddUserModal(true)}
                className="flex items-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 transition"
              >
                <UserPlus size={20} className="mr-2" /> Add New User
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider rounded-tl-lg">
                      Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider rounded-tr-lg">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 && !loading ? (
                    <tr>
                      <td colSpan="4" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center italic">No users added yet.</td>
                    </tr>
                  ) : (
                    users.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-medium">{user.name}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-600 whitespace-no-wrap">{user.email}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{user.role}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <button className="text-gray-400 hover:text-gray-600" title="Edit User (not implemented)">
                            <Pencil size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'vacancies' && (
          <section className="bg-white p-8 rounded-2xl shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Job Vacancies</h2>
              <button
                onClick={() => setShowAddVacancyModal(true)}
                className="flex items-center px-6 py-3 bg-orange-600 text-white font-bold rounded-xl shadow-md hover:bg-orange-700 transition"
              >
                <PlusCircle size={20} className="mr-2" /> Post New Vacancy
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobVacancies.length === 0 && !loading ? (
                <div className="md:col-span-3 text-center py-8 italic text-gray-500">No job vacancies posted yet.</div>
              ) : (
                jobVacancies.map(vacancy => (
                  <div key={vacancy.id} className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{vacancy.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">{vacancy.description}</p>
                    <p className="text-gray-700 text-xs font-medium mb-4">
                      <span className="font-semibold">Requirements:</span> {vacancy.requirements}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Status: <span className="font-medium text-green-700">{vacancy.status}</span></span>
                      <button className="text-blue-600 hover:underline">View Details <ChevronRight size={16} className="inline ml-1" /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        <section className="bg-white p-8 rounded-2xl shadow-md mt-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <MessageSquareText size={24} className="mr-3 text-blue-600" /> Quick Notes
            </h3>
            <button
              onClick={() => setIsNotesExpanded(!isNotesExpanded)}
              className="text-gray-500 hover:text-gray-700 transition"
              aria-expanded={isNotesExpanded}
            >
              {isNotesExpanded ? <ChevronRight size={20} className="transform rotate-90" /> : <ChevronRight size={20} />}
            </button>
          </div>
          {isNotesExpanded && (
            <div>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-2">
                {notes.length === 0 && <p className="text-gray-500 text-sm italic">No notes yet. Add one below!</p>}
                {notes.map(note => (
                  <div key={note.id} className="bg-gray-100 p-3 rounded-lg flex justify-between items-start text-sm text-gray-800 border border-gray-200">
                    <span>{note.text}</span>
                    <button onClick={() => deleteNote(note.id)} className="text-gray-400 hover:text-red-500 transition ml-2 flex-shrink-0">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <form onSubmit={(e) => { e.preventDefault(); addNote(); }} className="flex mt-4">
                <input
                  type="text"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Add a quick note..."
                  className="flex-grow p-3 rounded-l-md bg-gray-50 text-gray-800 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                <button type="submit" className="bg-blue-600 text-white p-3 rounded-r-md hover:bg-blue-700 transition">
                  <Save size={20} />
                </button>
              </form>
            </div>
          )}
        </section>
      </main>

      {/* Modals */}
      {showAddTaskModal && <AddTaskModal onAddTask={addTask} onClose={() => setShowAddTaskModal(false)} usersList={users} />}
      {showEditTaskModal && currentTaskToEdit && <EditTaskModal task={currentTaskToEdit} onUpdateTask={updateTask} onClose={() => setShowEditTaskModal(false)} usersList={users} />}
      {showAddUserModal && <AddUserModal onAddUser={addUser} onClose={() => setShowAddUserModal(false)} />}
      {showAddVacancyModal && <AddVacancyModal onAddVacancy={addVacancy} onClose={() => setShowAddVacancyModal(false)} />}
    </div>
  );
}

export default JobTaskSchedulingPage;

