import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

const TaskList = ({ tasks, handleEdit, handleDelete }) => {
  const confirmDelete = (task) => {
    if (window.confirm(`Tem certeza que deseja excluir: ${task.tarefa}`)) {
      handleDelete(task);
    }
  };

  return (
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
                onClick={() => confirmDelete(task)}
              />
            </div>
          </div>
        ))}
      {tasks.length === 0 && (
        <p className="text-center mt-4">Nenhuma Tarefa foi cadastrada</p>
      )}
    </div>
  );
};

export default TaskList;
