import { useRef, useState } from "react";
import { useFetch } from "../../hooks/useFetch";

import { Layout } from "../../Layout/Layout";

import styles from "./styles.module.css";

export const Header = () => {
  const [task, setTask] = useState("");
  const inputRef = useRef(null);
  const { httpConfig } = useFetch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskItem = {
      task,
      concluido: false,
    };

    httpConfig(taskItem, "POST");
    
    setTask("");
    inputRef.current.focus();
  };

  return (
    <header className={styles.header}>
      <Layout>
        <div className={styles.headerItems}>
          <div className={styles.iconHeader}>
            <img src="/rocket.svg" alt="Icon Rocket" />
            <strong>Lista de Tarefas</strong>
          </div>
          <form className={styles.formHeader} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Adicione uma nova tarefa"
              required
              onChange={(e) => setTask(e.target.value)}
              value={task}
              ref={inputRef}
            />
            <button>
              Criar <img src="/plus.svg" alt="Icon Plus" />
            </button>
          </form>
        </div>
      </Layout>
    </header>
  );
};
