import Todo from './Todo.js';

const TodoContainer = ({
  todos,
  selectedFilter,
  handleTodoDone,
  handleDeleteTodo,
}) => {
  let todosToRender = [];
  if (selectedFilter === 'all') {
    todosToRender = todos;
  } else if (selectedFilter === 'active') {
    todosToRender = todos.filter((todo) => todo.completed === false);
  } else if (selectedFilter === 'completed') {
    todosToRender = todos.filter((todo) => todo.completed === true);
  }
  const EmptyTodos = () => {
    if (todos.length === 0 || selectedFilter === 'all') {
      return <p>No todos present, please add todos!</p>;
    } else if (selectedFilter === 'active') {
      return <p>Hurray, all todos completed!</p>;
    } else if (selectedFilter === 'completed') {
      return <p>No completed todos present, please complete active todos!</p>;
    }
  };
  return (
    <section className="todo-list">
      <ul>
        {todosToRender.map((todo) => (
          <Todo
            todo={todo}
            key={todo.id}
            doneHandler={handleTodoDone}
            deleteHandler={handleDeleteTodo}
          />
        ))}
      </ul>
      {todosToRender.length === 0 && <EmptyTodos />}
    </section>
  );
};

export default TodoContainer;
