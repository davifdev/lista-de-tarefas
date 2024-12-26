import styles from "./styles.module.css";

export const TaskEmpyt = () => {
  return (
    <div className={styles.taskEmpyt}>
      <div className={styles.taskEmpytInfo}>
        <img src="/clipboard.svg" alt="Clipboard Icon" />
        <strong>Você ainda não tem tarefas cadastradas</strong>
        <span>Crie tarefas e organize seus itens a fazer</span>
      </div>
    </div>
  );
};
