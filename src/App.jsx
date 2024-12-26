import { TaskContextProvider } from "./context/TaskContext";
import { Header } from "./components/Header";
import {Tasks} from "./components/Tasks";

function App() {
  return (
    <TaskContextProvider>
      <Header />
      <Tasks />
    </TaskContextProvider>
  );
}

export default App;
