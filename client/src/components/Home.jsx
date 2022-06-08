import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "./auxiliar/Pagination.jsx";
import NoResults from "./auxiliar/NoResults.jsx";
import SearchBar from "./auxiliar/SearchBar.jsx";
import Card from "./auxiliar/Card.jsx";
import style from "./styles/Home.module.css";
import {
  getAllDogs,
  getAllTemperaments,
  filterDogsApiVsCreated,
  filterByTemperament,
  orderByName,
  orderByWeight,
  //currentPage,
} from "../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);
  const searchResult = useSelector((state) => state.noResults);

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
    setCurrentPage(1);
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
      <div className={style.menuContainer}>
        <Link to="/create" className={style.linkCreate}>
          Create Dog
        </Link>

        <div className={style.filterApiVsCreated}>
          <label>Filter API or Created breed </label>
          <select onChange={handleFilterApiVsCreated}>
            <option value="All">All dogs</option>
            <option value="api">API dogs</option>
            <option value="created">Created dogs</option>
          </select>
        </div>

        <div className={style.filterTemperament}>
          <label>Filter by temperament </label>
          <select defaultValue={"DEFAULT"} onChange={handleFilterByTemperament}>
            <option value="DEFAULT" disabled>
              Choose a temperament
            </option>
            <option value="All">All dogs</option>
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

        <div className={style.orderBreed}>
          <label>Order by breed </label>
          <select onChange={handleSort}>
            <option value="ascend">A-Z breed name</option>
            <option value="descend">Z-A breed name</option>
          </select>
        </div>

        <div className={style.orderWeight}>
          <label>Order by weight </label>
          <select onChange={handleSort2}>
            <option value="lighter">Ascendent weight</option>
            <option value="heavier">Descendent weight</option>
          </select>
        </div>

        <SearchBar />

        <Pagination
          dogsPerPage={dogsPerPage}
          totalDogs={dogs.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>

      <div className={style.dogListContainer}>
        <ul className={style.dogList}>
          {searchResult === false ? (
            <NoResults />
          ) : (
            currentDogs.map((dog) => {
              return (
                <Link to={`/details/${dog.id}`}>
                  <Card
                    key={dog.id}
                    image={dog.image}
                    name={dog.name}
                    temperaments={
                      !dog.created
                        ? dog.temperament
                        : dog.temperaments.map((temp) => temp.name + " ")
                    }
                    weight={`${dog.weight} kg`}
                  />
                </Link>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
