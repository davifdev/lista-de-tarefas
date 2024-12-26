import styles from "./styles.module.css";

import { Layout } from "../../Layout/Layout";
import { Task } from "../TaskComponent";
import { TaskEmpyt } from "../TaskEmpyt";
import { useFetch } from "../../hooks/useFetch";

export const Tasks = () => {
  const { taskList } = useFetch();

  const taskComplete = taskList.filter((task) => task.concluido === true);

  return (
    <Layout>
      <section className={styles.sectionTasks}>
        <div className={styles.taskInfo}>
          <div className={styles.taskLeft}>
            <strong>Tarefas criadas</strong>
            <span>{taskList.length}</span>
          </div>

          <div className={styles.taskRight}>
            <strong>Concluidas</strong>
            <span>{taskComplete.length}</span>
                   <strong>de</strong>
            <span>{taskList.length}</span>
          </div>
        </div>

        <div className={styles.tasks}>
          {taskList.length === 0 && <TaskEmpyt />}
          {taskList.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      </section>
    </Layout>
  );
};
