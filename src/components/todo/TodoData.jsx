const TodoData = (props) => {
    console.log(">>> check props: ", props);
    const { name, age, data, todoList } = props;
    return (
        <div className="todo-data">
            <div>My name is {name}</div>
            <div>Learning React</div>
            <div>Watching video</div>
            <div>{JSON.stringify(todoList)}</div>
        </div>
    );
};
export default TodoData;
