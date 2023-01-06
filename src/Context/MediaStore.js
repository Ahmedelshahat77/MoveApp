import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let MediaContext = createContext(null);

export default function MediaContextProvider(props) {
  const [getMovies, setMovies] = useState([]);
  const [getTv, setTv] = useState([]);
  const [getPerson, setPerson] = useState([]);

  let getItemsApi = async (item, callback) => {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${item}/week?api_key=533271a7ebe462542dc7fd7f7b559f72`
    );
    console.log(data.results);
    callback(data.results);
  };

  useEffect(() => {
    getItemsApi("movie", setMovies);
    getItemsApi("tv", setTv);
    getItemsApi("person", setPerson);
  }, []);

  return (
    <MediaContext.Provider value={{ getMovies, getTv, getPerson }}>
      {props.children}
    </MediaContext.Provider>
  );
}
