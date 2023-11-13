import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MovieCard from "./MovieCard";

const MovieListingSlider = ({ title, movieSlider, path }) => {
  const settings = {
    arrow: true,
    swipeToSlide: true,
    accessibility: true,
    variableWidth: true,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 5,
    speed: 700,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1120,
        settings: {
          slidesToScroll: 4,
          speed: 600,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToScroll: 3,
          speed: 500,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToScroll: 2,
          speed: 400,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToScroll: 1,
          speed: 300,
        },
      },
    ],
  };

  return (
    <div className="movie-list pt-8">
      <Link to={`/TvFlix/movie/all/${path}`}>
        <div className=" hover:opacity-60">
          <h3 className="mb-3 mr-2 inline-block text-[26px] font-bold tracking-[0.5px]">
            {title}
          </h3>
          {path ? (
            <i className="fa-solid fa-caret-right text-[24px]"></i>
          ) : (
            <></>
          )}
        </div>
      </Link>

      <div className="slick-custom">
        <Slider {...settings}>
          {movieSlider.length === 0 ? (
            <></>
          ) : (
            movieSlider
              .slice(0, 10)
              .map((movieCard) => (
                <MovieCard key={movieCard.id} size="200px" data={movieCard} />
              ))
          )}
        </Slider>
      </div>
    </div>
  );
};

export default MovieListingSlider;
