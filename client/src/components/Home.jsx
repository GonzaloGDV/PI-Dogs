import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from './auxiliar/Pagination.jsx';
import NoResults from './auxiliar/NoResults.jsx';
import Card from './auxiliar/Card.jsx';
import Loading from './auxiliar/Loading.jsx';
import style from './styles/Home.module.css';
import {
  getAllDogs,
  getAllTemperaments,
  filterDogsApiVsCreated,
  filterByTemperament,
  orderByName,
  orderByWeight,
  getDogByName,
} from '../redux/actions';

const Home = () => {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);
  const searchResult = useSelector((state) => state.noResults);
  const loading = useSelector((state) => state.loading);

  const [name, setName] = useState('');

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [dispatch]);

  const [order, setOrder] = useState('');

  //**********Paginate**********
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //**********Handlers**********
  function handleFilterApiVsCreated(e) {
    e.preventDefault();
    dispatch(filterDogsApiVsCreated(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterByTemperament(e) {
    e.preventDefault();
    dispatch(filterByTemperament(e.target.value));
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

  function refreshPage() {
    window.location.reload(false);
  }

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      alert('You should type a breed to start your search');
    } else {
      dispatch(getDogByName(name));
      setCurrentPage(1);
      setName('');
    }
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={style.homeContainer}>
          <div className={style.menuContainer}>
            <Link to='/create' className={style.linkCreate}>
              Create Dog
            </Link>

            <div className={style.filterApiVsCreated}>
              <label>API or Created breed </label>
              <select onChange={handleFilterApiVsCreated}>
                <option value='All'>All dogs</option>
                <option value='api'>API dogs</option>
                <option value='created'>Created dogs</option>
              </select>
            </div>

            <div className={style.filterTemperament}>
              <label>Temperament </label>
              <select
                defaultValue={'DEFAULT'}
                onChange={handleFilterByTemperament}
              >
                <option value='DEFAULT' disabled>
                  Choose a temperament
                </option>
                <option value='All'>All dogs</option>
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
              <label>Breed </label>
              <select onChange={handleSort}>
                <option value='ascend'>A-Z breed name</option>
                <option value='descend'>Z-A breed name</option>
              </select>
            </div>

            <div className={style.orderWeight}>
              <label>Weight </label>
              <select onChange={handleSort2}>
                <option value='lighter'>Ascendent</option>
                <option value='heavier'>Descendent</option>
              </select>
            </div>

            <div className={style.searchBar}>
              <input
                type='text'
                placeholder='Type a breed'
                onChange={(e) => handleInputChange(e)}
              />
              <button type='submit' onClick={(e) => handleSubmit(e)}>
                Submit a search
              </button>
            </div>

            <Pagination
              dogsPerPage={dogsPerPage}
              totalDogs={dogs.length}
              paginate={paginate}
              currentPage={currentPage}
            />

            <button className={style.allDogsButton} onClick={refreshPage}>
              Reset all dogs
            </button>
          </div>

          <div className={style.dogListContainer}>
            <ul className={style.dogList}>
              {searchResult === false ? (
                <NoResults />
              ) : (
                currentDogs.map((dog) => {
                  return (
                    <Link
                      className={style.link}
                      key={dog.id}
                      to={`/details/${dog.id}`}
                    >
                      <Card
                        key={dog.id}
                        image={dog.image}
                        name={dog.name}
                        temperaments={
                          !dog.created
                            ? dog.temperament
                            : dog.temperaments.map((temp) => temp.name + ', ')
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
      )}
    </>
  );
};

export default Home;
