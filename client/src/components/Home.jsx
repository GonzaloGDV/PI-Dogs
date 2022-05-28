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
            <h3>{e.name}</h3>
            <h6>{e.height}</h6>
            <h6>{e.weight}</h6>
            <h6>{e.life_span}</h6>
            {/* <img src={e.image} alt={e.name} /> */}
          </div>
        );
      })}
    </div>
  );
}

export default Home;
