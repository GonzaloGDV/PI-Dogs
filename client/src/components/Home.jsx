import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs } from "../redux/actions";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import NoResults from "./NoResults";

const Home = () => {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  //Paginate start
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;

  //Get current dogs
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // Paginate end

  // if (loading) {
  //   return <h2>Loading...</h2>;
  // }

  return (
    <div>
      <Link to="/create">Create Dog</Link>
      <select>
        <option value="asc">Ascendent nombre</option>
        <option value="desc">Descendent</option>
      </select>
      <select>
        <option value="asc">Ascendent peso</option>
        <option value="desc">Descendent</option>
      </select>
      <select>
        <option value="All">All dogs</option>
        <option value="api">API dogs</option>
        <option value="created">Created dogs</option>
      </select>
      <ul className="list-group">
        {currentDogs.length > 0 ? (
          currentDogs.map((dog) => {
            return (
              <div key={dog.id}>
                <div className="container">
                  <img src={dog.image} alt={dog.name} />
                  <h3>{dog.name}</h3>
                  <h6>{dog.temperament}</h6>
                  <h6>{dog.weight} kgs.</h6>
                </div>
              </div>
            );
          })
        ) : (
          <NoResults />
        )}
      </ul>
      <Pagination
        // currentPage={currentPage}
        dogsPerPage={dogsPerPage}
        totalDogs={dogs.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Home;
