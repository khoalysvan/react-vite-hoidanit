import TodoNew from "./components/todo/TodoNew";
import TodoData from "./components/todo/TodoData";
import "./components/todo/todo.css";
import reactLogo from "./assets/react.svg";

const App = () => {
    return (
        <div className="todo-container">
            <div className="todo-title">Todo List</div>
            <TodoNew />
            <TodoData />
            <div className="todo-image">
                <img src={reactLogo} className="logo" alt="logo" />
            </div>
        </div>
    );
};

export default App;
