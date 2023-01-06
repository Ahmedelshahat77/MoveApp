import { useContext } from "react";
import { MediaContext } from "../../Context/MediaStore";

export default function People() {
  let { getPerson } = useContext(MediaContext);
  return (
    <div className="row py-4 gy-3">
      <div className="col-md-4">
        <div>
          <div className="brdr w-25 mb-4"></div>
          <h3>Trending</h3>
          <h3>People</h3>
          <div className="brdr mt-4 w-100"></div>
        </div>
      </div>
      {getPerson.slice(0, 10).map((item, index) => (
        <div className="col-md-2 position-relative" key={index}>
          {item.profile_path == null ? (
            <img className="w-100" src="images/Avatar.png" alt="" />
          ) : (
            <img
              className="w-100"
              src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
              alt=""
            />
          )}

          <h2 className="h6">{item.name}</h2>
        </div>
      ))}
    </div>
  );
}
