import "./todo.css";
const TodoData = (props) => {
    const { todoList, deleteTodo } = props;

    const handleDelete = (id) => {
        deleteTodo(id);
    };
    return (
        <div className="todo-data">
            {todoList.map((item, index) => {
                return (
                    <div className="todo-item" key={item.id}>
                        <div>
                            {index + 1} - {item.name}
                        </div>
                        <button
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDelete(item.id)}
                        >
                            Delete
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
export default TodoData;
