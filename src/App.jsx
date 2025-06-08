import { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

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
      const response = await fetch("http://localhost:3000/tarefas");
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
    await fetch(`http://localhost:3000/tarefas`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        tarefa: task,
      }),
    });

    await fetchData();
  };

  const patchData = async () => {
     if (taskEdit.trim().length < 3) return;
    await fetch(`http://localhost:3000/tarefas/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        tarefa: taskEdit,
      }),
    });

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
    await fetch(`http://localhost:3000/tarefas/${_task.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });

   await fetchData();
  };

  return (
    <div className="m-6 flex flex-col items-center justify-center gap-12">
      <div className="flex flex-col gap-2">
        <form className="flex items-center gap-1" onSubmit={handleSubmit}>
          {!isEdit ? (
            <input
              type="text"
              placeholder="Digite uma tarefa"
              className="bg-white p-2 rounded-sm text-gray-900 placeholder:text-gray-900 w-90"
              onChange={(e) => setTask(e.target.value)}
              value={task}
              ref={inputRef}
              minLength={3}
            />
          ) : (
            <input
              type="text"
              placeholder="Edite uma tarefa"
              className="bg-white p-2 rounded-sm text-gray-900 placeholder:text-gray-900 w-90"
              onChange={(e) => setTaskEdit(e.target.value)}
              value={taskEdit}
              ref={inputRef}
              minLength={3}
            />
          )}

          <button
            type="submit"
            className="bg-blue-500 p-2 rounded-sm cursor-pointer hover:bg-blue-600"
          >
            {!isEdit ? "Criar Tarefa" : "Editar Tarefa"}
          </button>
        </form>

        <div className="flex flex-col gap-2">
          {tasks &&
            tasks.map((task) => (
              <div
                className="bg-white w-full p-2 flex items-center justify-between "
                key={task.id}
              >
                <span className="text-gray-900 ">{task.tarefa}</span>

                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ color: "#1df401" }}
                    className="cursor-pointer"
                    onClick={() => handleEdit(task)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: "#f20707" }}
                    className="cursor-pointer"
                    onClick={() => handleDelete(task)}
                  />
                </div>
              </div>
            ))}
          {tasks.length === 0 && (
            <p className="text-center mt-4">Nenhuma Tarefa foi cadastrada</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
