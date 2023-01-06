import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Details() {
  const [getDetails, setDetails] = useState([]);
  let params = useParams();
  let getDetailsApi = async () => {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${params.mediaType}/${params.id}?api_key=533271a7ebe462542dc7fd7f7b559f72&language=en-US`
    );
    setDetails(data);
    console.log(data);
  };

  useEffect(() => {
    getDetailsApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="row my-4 py-4">
      <div className="col-md-3">
        <img
          className="w-100"
          src={`https://image.tmdb.org/t/p/w500${getDetails.poster_path}`}
          alt=""
        />
      </div>
      <div className="col-md-9">
        <h1>
          {getDetails.original_title} {getDetails.name}
        </h1>
        <h2>{getDetails.tagline}</h2>
        <p>{getDetails.overview}</p>

        {getDetails.genres?.map((item, id) => (
          <span className="p-2 badge bg-info m-2" key={id}>
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}
