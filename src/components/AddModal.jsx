import React, { useState } from "react";

export default function AddModal({ hide, handleSave }) {
    const [title, setTitle] = useState("");
    const [tasks, setTasks] = useState([""]); // Simplified tasks array
    const [loading, setLoading] = useState(false);

    const addTask = () => {
        setTasks([...tasks, ""]);
    };

    const removeTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks.length > 0 ? newTasks : [""]);
    };

    const saveTasks = async () => {
        if (!title.trim()) {
            alert("Title is required!");
            return;
        }

        const filteredTasks = tasks.filter(task => task.trim() !== "");
        if (filteredTasks.length === 0) {
            alert("At least one task is required!");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:3000/add-to-do", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: "testUser", // Replace with actual username
                    tittles: title,
                    lists: filteredTasks,
                    status: false // ✅ Always start as "Ongoing"
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert("Task added successfully!");
                handleSave(title, filteredTasks);
                hide();
            } else {
                alert("Failed to add task: " + data.message);
            }
        } catch (error) {
            console.error("Error saving task:", error);
            alert("Error saving task. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-opacity-50">
            <div className="relative max-w-md p-6 bg-white rounded-lg shadow-xl w-96">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">Add Task</h3>
                    <button onClick={hide} className="text-gray-500 hover:text-gray-700">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="mb-3">
                    <label className="block text-sm font-semibold text-gray-900">Task Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 bg-white text-gray-900 placeholder-gray-400"
                        placeholder="Enter task title..."
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-900">Task List</label>
                    {tasks.map((task, index) => (
                        <div key={index} className="flex items-center space-x-2 mt-2">
                            <input
                                type="text"
                                value={task}
                                onChange={(e) => {
                                    const newTasks = [...tasks];
                                    newTasks[index] = e.target.value;
                                    setTasks(newTasks);
                                }}
                                className="p-2 border border-gray-300 rounded-md flex-grow"
                                placeholder={`Task ${index + 1}`}
                            />
                            {tasks.length > 1 && (
                                <button
                                    onClick={() => removeTask(index)}
                                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex justify-between">
                    <button
                        onClick={addTask}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        ADD TASK
                    </button>
                    <button
                        onClick={saveTasks}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "SAVE"}
                    </button>
                </div>
            </div>
        </div>
    );
}
