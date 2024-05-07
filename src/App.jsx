import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleEdit = (e) => {
    let id = e.target.name;
    let t = todos.filter((item) => {
      return item.id === id;
    });
    setTodo(t[0].todo);

    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e) => {
    const id = e.target.name;
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name; // get the id of todo when clicked checkbox
    // console.log(id);
    let index = todos.findIndex((item) => {
      return item.id === id;
      // returns the index which matches the id.
    });
    console.log(index);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  const toggleFinished = () => {
    setshowFinished(!showFinished);
  };
  return (
    <>
      <Navbar />

      <div className="container mx-auto my-5 rounded-xl p-5 bg-slate-400 min-h-[75vh] max-w-[80vw]">
        <u>
          <h1 className="text-2xl font-bold  text-center mb-5">
            iTask - Manage your todos at one place
          </h1>
        </u>
        <div>
          <h2 className="text-lg font-bold mx-5">Add a Todo</h2>

          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="rounded-md px-3 py-0.5 outline-none my-5 w-1/4"
            placeholder="Enter your todo here"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-900 text-yellow-50 font-bold px-2 mx-5 rounded-md py-0.5 hover:bg-blue-950 disabled:bg-blue-600 disabled:cursor-not-allowed disabled:hover:bg-sky-800"
            disabled={todo.length <= 3}
          >
            Save
          </button>
        </div>
        <input
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />
        <label htmlFor="show" className="ml-2">
          Show finished
        </label>

        <h2 className="text-lg font-bold  mx-5 mt-1">Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && (
            <div className="m-4">No Todos to display!!!</div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex w-2/3 justify-between ml-5 my-1"
                >
                  <div className="flex gap-3">
                    <input
                      checked={item.isCompleted}
                      onChange={handleCheckbox}
                      type="checkbox"
                      name={item.id}
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>

                  <div className="button flex ">
                    <button
                      name={item.id}
                      onClick={handleEdit}
                      className="bg-blue-900 text-yellow-50 font-bold px-3 py-1.5 mx-3 rounded-md  hover:bg-blue-950"
                    >
                      <FaEdit />
                    </button>
                    <button
                      name={item.id}
                      onClick={handleDelete}
                      className="bg-blue-900 text-yellow-50 font-bold px-3 py-1.5 mx-2 rounded-md  hover:bg-blue-950"
                    >
                      <RiDeleteBin6Fill />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
