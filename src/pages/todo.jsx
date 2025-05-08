import React, { useState, useEffect } from "react";
import axios from "axios";
import AddModal from "../components/AddModal";


function Todo() {
  const [tasks, setTasks] = useState({ ongoing: {}, done: {} });
  const [expandedTask, setExpandedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [checkedTaskLists, setCheckedTaskLists] = useState({});
  const [showDoneButton, setShowDoneButton] = useState({});

  // Fetch all task titles and lists from the database
  useEffect(() => {
    axios.get(`${process.env.VITE_ENDPOINT_URL}/get-titles`)
      .then(async (response) => {
        if (response.data.ongoing || response.data.done) {
          const newTasks = { ongoing: {}, done: {} };

          // Fetch lists for each ongoing title
          for (const task of response.data.ongoing) {
            const listResponse = await axios.get(`${process.env.VITE_ENDPOINT_URL}/get-task?title=${task.title}`);
            newTasks.ongoing[task.title] = listResponse.data.lists || [];
          }

          // Fetch lists for each done title
          for (const task of response.data.done) {
            const listResponse = await axios.get(`${process.env.VITE_ENDPOINT_URL}/get-task?title=${task.title}`);
            newTasks.done[task.title] = listResponse.data.lists || [];
          }

          setTasks(newTasks);
        }
      })
      .catch((error) => console.error("Error fetching titles:", error));
  }, []);

  // Fetch task details (lists) when clicking a title
  const fetchTaskDetails = (taskTitle) => {
    if (expandedTask === taskTitle) {
      setExpandedTask(null);
      return;
    }

    axios.get(`${process.env.VITE_ENDPOINT_URL}/get-task?title=${taskTitle}`)
      .then((response) => {
        if (response.data && response.data.lists) {
          setTasks(prev => ({
            ...prev,
            ongoing: prev.ongoing[taskTitle] !== undefined
              ? { ...prev.ongoing, [taskTitle]: response.data.lists }
              : prev.ongoing,
            done: prev.done[taskTitle] !== undefined
              ? { ...prev.done, [taskTitle]: response.data.lists }
              : prev.done,
          }));

          // Mark all task lists as checked
          const allChecked = response.data.lists.reduce((acc, _, idx) => ({ ...acc, [idx]: true }), {});
          setCheckedTaskLists(prev => ({
            ...prev,
            [taskTitle]: allChecked
          }));

          setShowDoneButton(prev => ({
            ...prev,
            [taskTitle]: Object.values(allChecked).every(val => val)
          }));
        }
        setExpandedTask(taskTitle);
      })
      .catch((error) => console.error("Error fetching task details:", error));
  };

  // Move task to done section and update database
  const markTaskAsDone = (taskTitle) => {
    setTasks(prev => {
      const newOngoing = { ...prev.ongoing };
      const completedTask = newOngoing[taskTitle];
      delete newOngoing[taskTitle];

      return {
        ongoing: newOngoing,
        done: { ...prev.done, [taskTitle]: completedTask }
      };
    });

    axios.post(`${process.env.VITE_ENDPOINT_URL}/update-task-status`, { title: taskTitle, status: true })
      .then(() => {
        setTasks(prev => ({
          ...prev,
          done: {
            ...prev.done,
            [taskTitle]: prev.done[taskTitle] || []
          }
        }));
      })
      .catch((error) => console.error("Error updating task status:", error));
  };

  const handleEdit = (taskTitle) => {
    console.log("Edit task:", taskTitle);
  };

  const handleDelete = (taskTitle) => {
    console.log("Delete task:", taskTitle);
  };

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center bg-cyan-400 p-4">
        <div className="w-full max-w-4xl bg-pink-400 flex flex-col justify-center p-5 gap-5 rounded-2xl shadow-lg">
          <h1 className="text-3xl md:text-4xl py-3 text-center font-bold text-cyan-500">To-Do List</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Object.keys(tasks).map(category => (
              <div key={category} className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-3 capitalize text-center">{category}</h2>
                <ul className="space-y-2 max-h-80 overflow-auto">
                  {Object.keys(tasks[category]).map((taskTitle, index) => (
                    <li key={index} className="p-2 bg-blue-200 rounded-lg text-center cursor-pointer hover:bg-blue-300 transition">
                      <div className="flex items-center">
                        <span className="flex-grow cursor-pointer" onClick={() => fetchTaskDetails(taskTitle)}>
                          {taskTitle}
                        </span>
                        {category === "ongoing" && (
                          <>
                            <button onClick={() => handleEdit(taskTitle)} className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
                            <button onClick={() => handleDelete(taskTitle)} className="ml-2 px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                          </>
                        )}
                      </div>
                      {expandedTask === taskTitle && (
                        <>
                          <ul className="mt-2 bg-gray-100 p-2 rounded">
                            {tasks[category][taskTitle]?.length > 0 ? (
                              tasks[category][taskTitle].map((detail, idx) => (
                                <li key={idx} className="text-sm p-1 rounded text-gray-700 flex items-center">
                                  {category === "ongoing" && (
                                    <input
                                      type="checkbox"
                                      checked={checkedTaskLists[taskTitle]?.[idx] || false}
                                      className="form-checkbox h-4 w-4 text-green-500 mr-2"
                                      readOnly
                                    />
                                  )}
                                  <span>{detail}</span>
                                </li>
                              ))
                            ) : (
                              <li className="text-sm text-gray-500">No items found.</li>
                            )}
                          </ul>
                          {category === "ongoing" && showDoneButton[taskTitle] && (
                            <button
                              onClick={() => markTaskAsDone(taskTitle)}
                              className="w-full mt-3 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                            >
                              Done
                            </button>
                          )}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModal && <AddModal hide={() => setShowModal(false)} handleSave={handleSave} />}
    </>
  );
}

export default Todo;
