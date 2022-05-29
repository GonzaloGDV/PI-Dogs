import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs } from "../redux/actions";

function Home() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  return (
    <div>
      {dogs?.map((e) => {
        return (
          <div key={e.id}>
            <img src={e.image} alt={e.name} />
            <h3>{e.name}</h3>
            <h6>{e.temperament}</h6>
            <h6>{e.weight}</h6>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
