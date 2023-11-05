import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { chooseGenre, setShowSideBar } from "../../redux/movieSlice";

const Genre = ({ name, id }) => {
  const dispatch = useDispatch();
  const genreChoosing = useSelector((state) => state.movies.genreChoosing);

  return (
    <section>
      <Link to={`/TvFlix/movie/${id}/${name}`}>
        <span
          className="genere-list"
          onClick={() => {
            dispatch(chooseGenre(name));
            dispatch(setShowSideBar(false));
          }}
          style={{
            color: genreChoosing === name ? "white" : "",
          }}
        >
          {name}
        </span>
      </Link>
    </section>
  );
};

export default Genre;
