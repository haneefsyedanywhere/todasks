import { useRef } from 'react';

const Filter = ({ handleSelectedFilter }) => {
  const filterBtnRef = useRef();
  const handleBtnClick = (e) => {
    let filterSelected = e.target.getAttribute('data-filter-type');
    const filterBtns = [...filterBtnRef.current.children];
    filterBtns.forEach((filterBtn) => {
      filterBtn.classList.remove('selected');
    });
    e.target.classList.add('selected');
    handleSelectedFilter(filterSelected);
  };
  return (
    <section className="todo-filters" ref={filterBtnRef}>
      <button
        className="btn-primary selected"
        data-filter-type="all"
        onClick={handleBtnClick}
      >
        All todos
      </button>
      <button
        className="btn-primary"
        data-filter-type="active"
        onClick={handleBtnClick}
      >
        Active todos
      </button>
      <button
        className="btn-primary"
        data-filter-type="completed"
        onClick={handleBtnClick}
      >
        Completed todos
      </button>
    </section>
  );
};

export default Filter;
