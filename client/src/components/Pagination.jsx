import React from "react";

const Pagination = ({ dogsPerPage, totalDogs, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <div key={number} className="page-item">
            {/* <a onClick={() => paginate(number)} href="!#" className="page-link"> */}
            <button onClick={() => paginate(number)}>{number}</button>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Pagination;
