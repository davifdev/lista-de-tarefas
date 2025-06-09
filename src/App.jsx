import { useEffect, useRef, useState } from "react";
import { httpConfig } from "./hooks/useFetch";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const endPoint = "http://localhost:3000/tarefas";

function App() {
  const [task, setTask] = useState("");
  const [taskEdit, setTaskEdit] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [taskName, setTaskName] = useState("");
  const inputRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await fetch(endPoint);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log("Erro ao buscar dados", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setTaskEdit(taskName);
  }, [taskName]);

  const postData = async () => {
    if (task.trim().length < 3) return;
    const objConfig = {
      tarefa: task,
    };

    await httpConfig(endPoint, "POST", objConfig);
    await fetchData();
  };

  const patchData = async () => {
    if (taskEdit.trim().length < 3) return;
    const objConfig = {
      tarefa: taskEdit,
    };

    await httpConfig(endPoint, "PATCH", objConfig, taskId);

    setIsEdit(false);
    setTaskEdit("");
    inputRef.current.focus();

    await fetchData();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      await patchData();
      setTaskEdit("");
    } else {
      await postData();
      setTask("");
    }

    inputRef.current.focus();
  };

  const handleEdit = (_task) => {
    setIsEdit(true);
    setTaskId(_task.id);
    setTaskName(_task.tarefa);
    inputRef.current.focus();
  };

  const handleDelete = async (_task) => {
    await httpConfig(endPoint, "DELETE", null, _task.id);
    await fetchData();
  };

  return (
    <div className="m-6 flex flex-col items-center justify-center gap-12">
      <div className="flex flex-col gap-2">
        <TaskForm
          handleSubmit={handleSubmit}
          isEdit={isEdit}
          taskEdit={taskEdit}
          task={task}
          inputRef={inputRef}
          setTask={setTask}
          setTaskEdit={setTaskEdit}
        />

        <TaskList
          tasks={tasks}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
