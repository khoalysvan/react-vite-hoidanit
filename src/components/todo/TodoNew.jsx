import { useState } from "react";

const TodoNew = (props) => {
    // useState hook
    // const valueInput = "khoa";
    const [valueInput, setValueInput] = useState("");

    const { addNewTodo } = props;
    const handleClick = () => {
        addNewTodo(valueInput);
    };
    const handleOnChange = (name) => {
        console.log(">>> handle on change", name);
        setValueInput(name);
    };
    return (
        <div className="todo-new">
            <input
                type="text"
                onChange={(event) => handleOnChange(event.target.value)}
            />
            <button style={{ cursor: "pointer" }} onClick={handleClick}>
                Add
            </button>
            <div>My text input is: {valueInput}</div>
        </div>
    );
};
export default TodoNew;
