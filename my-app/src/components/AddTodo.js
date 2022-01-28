import { useState } from 'react';

const AddTodo = ({ handleAddTodo }) => {
  const [todo, setTodo] = useState('');
  const [error, setError] = useState(null);

  const validateInput = (value) => {
    if (value.length === 0) {
      return { status: false, message: 'Please enter a non-empty todo' };
    }
    return { status: true };
  };

  const handleOnChange = (e) => {
    if (error) {
      e.target.value.length !== 0 ? setError(null) : '';
    }
    setTodo(e.target.value);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    let validation = validateInput(todo);

    if (validation.status) {
      setError(null);
      const newTodo = { title: todo, completed: false, userId: 1 };
      setTodo('');
      handleAddTodo(newTodo);
    } else {
      setError(validation.message);
    }
  };
  return (
    <section className="add-todo">
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="Add a todo..."
          value={todo}
          onChange={handleOnChange}
        />
        <button type="submit"> + </button>
        {<p className="error-msg">{error}</p>}
      </form>
    </section>
  );
};

export default AddTodo;
