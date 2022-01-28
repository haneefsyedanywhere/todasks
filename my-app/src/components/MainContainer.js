import Header from './Header.js';
// import AddTodo from './AddTodo.js';
import TodoContainer from './TodoContainer.js';
import Filter from './Filter';
import { useState, useEffect } from 'react';

const DOMAIN = 'https://jsonplaceholder.typicode.com';

const MainContainer = () => {
  const [todos, setTodos] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const fetchData = (url) => {
    const abortController = new AbortController();
    fetch(url, { signal: abortController.signal })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then((data) => {
        setIsPending(false);
        setTodos(data);
        setError(null);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('Fetch Aborted!');
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => abortController.abort();
  };
  // const updateData = (id, data) => {
  //   fetch(`${DOMAIN}/todos/${id}`, {
  //     method: 'Put',
  //     headers: { 'Content-type': 'application/json' },
  //     body: JSON.stringify(data),
  //   })
  //     .then(() => {
  //       fetchData(`${DOMAIN}/todos`);
  //     })
  //     .catch((e) => {
  //       setError('Todo update failed');
  //       console.log(e.message);
  //     });
  // };

  useEffect(() => {
    fetchData(`${DOMAIN}/todos`);
  }, []);

  // const handleAddTodo = (newTodo) => {
  //   fetch(`${DOMAIN}/todos`, {
  //     method: 'Post',
  //     headers: { 'Content-type': 'application/json' },
  //     body: JSON.stringify(newTodo),
  //   }).then(() => {
  //     fetchData(`${DOMAIN}/todos`);
  //   });
  // };

  // const handleTodoDone = (id) => {
  //   console.log(id);
  //   const todo = todos.filter((todo) => todo.id == id)[0];
  //   todo.done = !todo.done;
  //   updateData(id, todo);
  // };

  // const handleDeleteTodo = (id) => {
  //   fetch(`${DOMAIN}/todos/${id}`, {
  //     method: 'Delete',
  //   })
  //     .then(() => fetchData(`${DOMAIN}/todos`))
  //     .catch((err) => {
  //       setError('Delete todo failed');
  //       console.error(err);
  //     });
  // };
  const handleSelectedFilter = (filterSelected) => {
    setSelectedFilter(filterSelected);
  };
  return (
    <>
      {isPending && <div className="toast">Loading Todos...</div>}
      {error && <div className="toast error">{error}</div>}
      <Header />
      {/* <AddTodo handleAddTodo={handleAddTodo} /> */}
      {todos && (
        <TodoContainer
          todos={todos}
          selectedFilter={selectedFilter}
          // handleTodoDone={handleTodoDone}
          // handleDeleteTodo={handleDeleteTodo}
        />
      )}
      <Filter handleSelectedFilter={handleSelectedFilter} />
    </>
  );
};

export default MainContainer;
