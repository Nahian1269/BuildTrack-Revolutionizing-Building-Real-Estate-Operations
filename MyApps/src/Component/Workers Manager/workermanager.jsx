import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Trash2, Download } from 'lucide-react';

const calendarEvents = [
    { date: '2024-06-01', event: 'Safety Training' },
    { date: '2024-06-05', event: 'Site Inspection' },
    { date: '2024-06-10', event: 'Project Review' },
];

const bookmarks = [
    { label: 'Attendance Policy', url: '#' },
    { label: 'Safety Guidelines', url: '#' },
    { label: 'Working Hours Rules', url: '#' },
];

const LOCAL_STORAGE_KEY = 'construction_workers';

const defaultWorker = {
    name: '',
    attendance: false,
    safetyTrained: false,
    workingHours: 0,
};

const WorkerManager = () => {
    const [workers, setWorkers] = useState([]);
    const [form, setForm] = useState(defaultWorker);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (data) setWorkers(JSON.parse(data));
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(workers));
    }, [workers]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    };

    const handleAddWorker = (e) => {
        e.preventDefault();
        if (!form.name.trim()) return;
        setWorkers([...workers, { ...form }]);
        setForm(defaultWorker);
    };

    const updateWorkingHours = (index, hours) => {
        const updated = [...workers];
        updated[index].workingHours = Number(hours);
        setWorkers(updated);
    };

    const handleDelete = (index) => {
        const updated = workers.filter((_, i) => i !== index);
        setWorkers(updated);
    };

    const filteredWorkers = workers.filter(worker =>
        worker.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleDownload = () => {
        const date = new Date().toISOString().split('T')[0];
        const header = ['Name', 'Attendance', 'Safety Trained', 'Working Hours'];
        const rows = workers.map(w => [
            w.name,
            w.attendance ? 'Present' : 'Absent',
            w.safetyTrained ? 'Yes' : 'No',
            w.workingHours
        ]);
        const csvContent = [header, ...rows]
            .map(row => row.map(String).join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `daily_progress_${date}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const SideCalendar = () => (
        <div className="bg-blue-50 rounded-lg shadow p-4 mb-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-3">Upcoming Events</h3>
            <ul>
                {calendarEvents.map((ev, i) => (
                    <li key={i} className="mb-2 text-sm">
                        <span className="font-medium">{ev.date}:</span> {ev.event}
                    </li>
                ))}
            </ul>
        </div>
    );

    const SideBookmarks = () => (
        <div className="bg-blue-50 rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-blue-700 mb-3">Bookmarks</h3>
            <ul>
                {bookmarks.map((bm, i) => (
                    <li key={i} className="mb-2 text-sm">
                        <a href={bm.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                            {bm.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );

    const handleBack = () => {
        if (window.history.length > 1) window.history.back();
        else window.location.href = '/';
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 text-black">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleBack}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg shadow-sm transition"
                                >
                                    &larr; Back
                                </button>
                                <h2 className="text-2xl font-bold text-blue-700 ml-2">Construction Workers Manager</h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <input 
                                    type="text"
                                    placeholder="Search Worker"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
                                />
                                <button
                                    onClick={handleDownload}
                                    className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
                                >
                                    <Download size={18} /> Download
                                </button>
                            </div>
                        </div>

                        <form
                            onSubmit={handleAddWorker}
                            className="flex flex-wrap gap-4 items-end mb-10 bg-blue-50 p-6 rounded-xl shadow"
                        >
                            <div className="flex-1 min-w-[180px]">
                                <label className="block text-sm font-medium mb-1">Worker Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Worker Name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="attendance"
                                        checked={form.attendance}
                                        onChange={handleChange}
                                        className="h-5 w-5 text-blue-600 rounded"
                                    /> Present
                                </label>
                            </div>
                            <div>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="safetyTrained"
                                        checked={form.safetyTrained}
                                        onChange={handleChange}
                                        className="h-5 w-5 text-green-600 rounded"
                                    /> Safety Trained
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Working Hours</label>
                                <input
                                    type="number"
                                    name="workingHours"
                                    placeholder="Hours"
                                    value={form.workingHours}
                                    min="0"
                                    onChange={handleChange}
                                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
                            >
                                Add Worker
                            </button>
                        </form>

                        <div className="overflow-x-auto rounded-lg">
                            <table className="min-w-full bg-white rounded-lg shadow text-sm">
                                <thead>
                                    <tr className="bg-blue-100 text-blue-800">
                                        <th className="py-3 px-4 text-left font-semibold">Name</th>
                                        <th className="py-3 px-4 text-center font-semibold">Attendance</th>
                                        <th className="py-3 px-4 text-center font-semibold">Safety</th>
                                        <th className="py-3 px-4 text-center font-semibold">Hours</th>
                                        <th className="py-3 px-4 text-center font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredWorkers.map((worker, idx) => (
                                        <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                            <td className="py-3 px-4">{worker.name}</td>
                                            <td className="py-3 px-4 text-center">
                                                {worker.attendance ? <CheckCircle className="text-green-500 mx-auto" /> : <XCircle className="text-red-500 mx-auto" />}
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                                {worker.safetyTrained ? <CheckCircle className="text-green-500 mx-auto" /> : <XCircle className="text-red-500 mx-auto" />}
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                                <input
                                                    type="number"
                                                    value={worker.workingHours}
                                                    min="0"
                                                    onChange={e => updateWorkingHours(idx, e.target.value)}
                                                    className="w-20 px-2 py-1 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-400 transition"
                                                />
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                                <button
                                                    onClick={() => handleDelete(idx)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
                                                    aria-label="Delete Worker"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredWorkers.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="py-6 text-center text-gray-500">
                                                No workers found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* Side Items */}
                <aside className="w-full lg:w-80 flex flex-col gap-6">
                    <SideCalendar />
                    <SideBookmarks />
                </aside>
            </div>
        </div>
    );
};

export default WorkerManager;
