import React from "react";
import style from "./styles/Pagination.module.css";

const Pagination = ({ dogsPerPage, totalDogs, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={style.Container}>
      {pageNumbers &&
        pageNumbers.map((number) => (
          <div key={number} className={style.pageNumber}>
            <button
              key={number}
              className={
                currentPage === number ? style.activeButton : style.button
              }
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </div>
        ))}
    </div>
  );
};

export default Pagination;
