import React, { useState, useRef, useEffect } from 'react';

function Doodles() {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(5);
    const [doodles, setDoodles] = useState([]);
    const [title, setTitle] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [activeDoodle, setActiveDoodle] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        context.strokeStyle = color;
        context.lineWidth = brushSize;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        
        fetchDoodles();
    }, []);

    const fetchDoodles = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/doodles');

            const data = await response.json();
            setDoodles(data);
        } catch (error) {
            console.error('Error fetching doodles:', error);
        }
    };

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        context.beginPath();
        context.moveTo(
            e.nativeEvent.offsetX || e.touches[0].clientX - canvas.offsetLeft,
            e.nativeEvent.offsetY || e.touches[0].clientY - canvas.offsetTop
        );
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        context.strokeStyle = color;
        context.lineWidth = brushSize;
        
        context.lineTo(
            e.nativeEvent.offsetX || e.touches[0].clientX - canvas.offsetLeft,
            e.nativeEvent.offsetY || e.touches[0].clientY - canvas.offsetTop
        );
        context.stroke();
    };

    const stopDrawing = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.closePath();
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        setActiveDoodle(null);
    };

    const saveDoodle = async () => {
        if (!title.trim()) {
            alert('Please enter a title for your doodle');
            return;
        }

        setIsSaving(true);
        const canvas = canvasRef.current;
        const imageData = canvas.toDataURL('image/png');

        try {
            const response = await fetch('/api/doodles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    imageData,
                    id: activeDoodle?.id || null
                }),
            });

            if (response.ok) {
                await fetchDoodles();
                setTitle('');
                setActiveDoodle(null);
            } else {
                throw new Error('Failed to save doodle');
            }
        } catch (error) {
            console.error('Error saving doodle:', error);
            alert('Failed to save doodle');
        } finally {
            setIsSaving(false);
        }
    };

    const loadDoodle = (doodle) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        clearCanvas();
        
        const image = new Image();
        image.onload = () => {
            context.drawImage(image, 0, 0);
        };
        image.src = doodle.imageData;
        
        setTitle(doodle.title);
        setActiveDoodle(doodle);
    };

    const deleteDoodle = async (id) => {
        if (!window.confirm('Are you sure you want to delete this doodle?')) return;
        
        try {
            const response = await fetch(`/api/doodles/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                await fetchDoodles();
                if (activeDoodle && activeDoodle.id === id) {
                    clearCanvas();
                    setTitle('');
                    setActiveDoodle(null);
                }
            } else {
                throw new Error('Failed to delete doodle');
            }
        } catch (error) {
            console.error('Error deleting doodle:', error);
            alert('Failed to delete doodle');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8 text black">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">My Doodles</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Draw C */}
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-700">
                                {activeDoodle ? `Editing: ${activeDoodle.title}` : 'New Doodle'}
                            </h2>
                            <button 
                                onClick={clearCanvas}
                                className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                            >
                                Clear
                            </button>
                        </div>
                        
                        <div className="p-4">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="flex items-center">
                                    <span className="mr-2 text-gray-600">Color:</span>
                                    <input 
                                        type="color" 
                                        value={color} 
                                        onChange={(e) => setColor(e.target.value)}
                                        className="w-8 h-8 cursor-pointer"
                                    />
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-2 text-gray-600">Size:</span>
                                    <input 
                                        type="range" 
                                        min="1" 
                                        max="20" 
                                        value={brushSize} 
                                        onChange={(e) => setBrushSize(e.target.value)}
                                        className="w-24"
                                    />
                                    <span className="ml-2 text-gray-600">{brushSize}px</span>
                                </div>
                            </div>
                            
                            <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                                <canvas
                                    ref={canvasRef}
                                    onMouseDown={startDrawing}
                                    onMouseMove={draw}
                                    onMouseUp={stopDrawing}
                                    onMouseLeave={stopDrawing}
                                    onTouchStart={startDrawing}
                                    onTouchMove={draw}
                                    onTouchEnd={stopDrawing}
                                    className="w-full h-96 bg-white touch-none"
                                />
                            </div>
                            
                            <div className="mt-4 flex items-end space-x-4">
                                <div className="flex-grow">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                        Doodle Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter a title for your doodle"
                                        className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <button
                                    onClick={saveDoodle}
                                    disabled={isSaving}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    {isSaving ? 'Saving...' : 'Save Doodle'}
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Saved */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b">
                            <h2 className="text-xl font-semibold text-gray-700">Saved Doodles</h2>
                        </div>
                        
                        <div className="p-4">
                            {doodles.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    No saved doodles yet. Start drawing!
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {doodles.map((doodle) => (
                                        <div 
                                            key={doodle.id} 
                                            className={`p-3 border rounded-lg cursor-pointer transition ${activeDoodle?.id === doodle.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-medium text-gray-800">{doodle.title}</h3>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(doodle.created_at).toLocaleString()}
                                                    </p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button 
                                                        onClick={() => loadDoodle(doodle)}
                                                        className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        onClick={() => deleteDoodle(doodle.id)}
                                                        className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-2 border-t pt-2">
                                                <img 
                                                    src={doodle.imageData} 
                                                    alt={doodle.title}
                                                    className="w-full h-20 object-contain bg-gray-100 rounded"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Doodles;