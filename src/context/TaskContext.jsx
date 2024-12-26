/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useContext, createContext, useState } from "react";

const TaskContext = createContext(0);

export const TaskContextProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);

  return (
    <TaskContext.Provider value={{ taskList, setTaskList }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  
  if (!context) {
    throw new Error("useUser must be used within a TaskContextProvider");
  }

  return context;
};
