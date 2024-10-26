import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../features/recipeSlice';

const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage, totalPages } = useSelector((state) => state.recipes);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  return (
    <div className="pagination">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
