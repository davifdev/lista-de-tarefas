/* eslint-disable react/prop-types */
import styles from "./styles.module.css";

import { FaRegTrashCan } from "react-icons/fa6";

import { useFetch } from "../../hooks/useFetch";

export const Task = ({ task }) => {
  const { httpConfig, setCallFetch } = useFetch();

  const deleteTask = (product_id) => {
    httpConfig(product_id, "DELETE");
  };

  const updateTask = async (product_id) => {
    const apiUrl = `http://localhost:3000/tarefas/${product_id}`;

    const updatedTask = {
      concluido: true,
    };

    const returnTask = {
      concluido: false,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task.concluido ? returnTask : updatedTask)
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Tarefa atualizada com sucesso:", result);
      } else {
        console.error("Erro ao atualizar tarefa:", response.status);
      }

      setCallFetch(response);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <div className={styles.taskComponent}>
      <div
        className={task.concluido ? styles.checkBoxChecked : styles.checkBox}
        onClick={() => updateTask(task.id)}
      ></div>

      <p className={task.concluido ? styles.taskComplete : ""}>{task.task}</p>

      <div className={styles.trashIcon}>
        <FaRegTrashCan onClick={() => deleteTask(task.id)} />
      </div>
    </div>
  );
};
