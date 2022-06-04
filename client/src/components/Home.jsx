import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "./auxiliar/Pagination.jsx";
import NoResults from "./NoResults";
import SearchBar from "./auxiliar/SearchBar.jsx";
import Card from "./auxiliar/Card.jsx";
import style from "./styles/Home.module.css";
import {
  getAllDogs,
  getAllTemperaments,
  //dogDetail,
  filterDogsApiVsCreated,
  filterByTemperament,
  orderByName,
  orderByWeight,
} from "../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [dispatch]);

  const [order, setOrder] = useState("");
  const [order2, setOrder2] = useState("");

  //**********Paginate**********
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //**********Handlers**********
  function handleFilterApiVsCreated(e) {
    dispatch(filterDogsApiVsCreated(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder({ order });
  }

  function handleSort2(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrder({ order });
  }

  function handleFilterByTemperament(e) {
    e.preventDefault();
    dispatch(filterByTemperament(e.target.value));
    setCurrentPage(1);
    setOrder2({ order2 });
  }

  return (
    <div className={style.homeContainer}>
      <Link to="/create">Create Dog</Link>

      <select onChange={handleFilterApiVsCreated}>
        <option value="All">All dogs</option>
        <option value="api">API dogs</option>
        <option value="created">Created dogs</option>
      </select>

      <div className={style.filterTemperament}>
        <label>Filter by temperament:</label>
        <select defaultValue={"DEFAULT"} onChange={handleFilterByTemperament}>
          <option value="DEFAULT" disabled>
            Choose temperament
          </option>
          {allTemperaments &&
            allTemperaments.map((temperament) => {
              return (
                <option key={temperament.id} value={temperament.name}>
                  {temperament.name}
                </option>
              );
            })}
        </select>
      </div>

      <select onChange={handleSort}>
        <option value="ascend">Ascendent breed</option>
        <option value="descend">Descendent breed</option>
      </select>

      <select onChange={handleSort2}>
        <option value="ascend">Ascendent weight</option>
        <option value="descend">Descendent weight</option>
      </select>

      <SearchBar />

      <ul className={style.dogListContainer}>
        {currentDogs.length > 0 ? (
          currentDogs.map((dog) => {
            return (
              <Link to={`/details/${dog.id}`}>
                <Card
                  key={dog.id}
                  image={dog.image}
                  name={dog.name}
                  temperament={dog.temperament}
                  weight={dog.weight}
                />
              </Link>
            );
          })
        ) : (
          <NoResults />
        )}
      </ul>

      <div className={style.paginationList}>
        <Pagination
          dogsPerPage={dogsPerPage}
          totalDogs={dogs.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default Home;
