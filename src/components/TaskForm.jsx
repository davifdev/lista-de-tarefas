const TaskForm = ({
  handleSubmit,
  isEdit,
  taskEdit,
  task,
  inputRef,
  setTask,
  setTaskEdit,
}) => {
  const handleChange = (e) => {
    isEdit ? setTaskEdit(e.target.value) : setTask(e.target.value);
  };

  const value = isEdit ? taskEdit : task;

  return (
    <form className="flex items-center gap-1" onSubmit={handleSubmit}>
      {!isEdit ? (
        <input
          type="text"
          placeholder="Digite uma tarefa"
          className="bg-white p-2 rounded-sm text-gray-900 placeholder:text-gray-900 w-90"
          onChange={handleChange}
          value={value}
          ref={inputRef}
          minLength={3}
        />
      ) : (
        <input
          type="text"
          placeholder="Edite uma tarefa"
          className="bg-white p-2 rounded-sm text-gray-900 placeholder:text-gray-900 w-90"
          onChange={handleChange}
          value={value}
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
  );
};

export default TaskForm;
