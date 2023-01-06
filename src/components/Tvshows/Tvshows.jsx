import { useContext } from "react";
import { Link } from "react-router-dom";
import { MediaContext } from "../../Context/MediaStore";

export default function Tvshows() {
  let { getTv } = useContext(MediaContext);

  return (
    <div className="row py-4 gy-3">
      <div className="col-md-4">
        <div>
          <div className="brdr w-25 mb-4"></div>
          <h3>Trending</h3>
          <h3>TV</h3>
          <h3>To watch now</h3>
          <span className="text-muted">most watched TV by day</span>
          <div className="brdr mt-4 w-100"></div>
        </div>
      </div>
      {getTv.slice(0, 10).map((item, index) => (
        <div className="col-md-2 position-relative" key={index}>
          <Link
            className=" nav-link"
            to={`/details/${item.id}/${item.media_type}`}
          >
            <img
              className="w-100"
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              alt=""
            />
            <h2 className="h6">{item.name}</h2>
            <span className=" position-absolute top-0 end-0 p-2 bg-info">
              {item.vote_average.toFixed(1)}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
}
