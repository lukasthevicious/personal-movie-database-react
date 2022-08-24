import { React, useContext, useEffect } from "react";
import { StyledMovieCard } from "./styled";
import { Rating } from "@mui/material";
import { useState } from "react";

import MoviesContext from "../../store/MoviesContext";

export default function MovieCard(props) {
  // *STATES*
  const [valueL, setValueL] = useState(null);
  const [valueV, setValueV] = useState(null);

  const { deleteMovie } = useContext(MoviesContext);

  //Upravení formátu datumu
  const date = new Date(props.dateWatched);
  const month = date.toLocaleString("en-US", { month: "2-digit" });
  const day = date.toLocaleString("en-US", { day: "2-digit" });
  const year = date.getFullYear();

  const myDate = day + "-" + month + "-" + year;

  //Upravení formátu movieDate
  const dateFilmed = props.movieYear;
  const dateFilmedType = typeof dateFilmed;

  //Načítání a zobrazování ratingu z localStorage při vyrenderování komponentu.
  useEffect(() => {
    const localData = localStorage.getItem("movies");
    if (localData) {
      const localDataParsed = JSON.parse(localData);
      const localRatingL = localDataParsed.find(
        (movie) => movie.id === props.id
      ).stars_1;
      const localRatingV = localDataParsed.find(
        (movie) => movie.id === props.id
      ).stars_2;
      setValueL(localRatingL);
      setValueV(localRatingV);
    }
  }, []);

  //Uložení uděleného ratingu do array
  const onChangeRatingL = (event, newValue) => {
    setValueL(newValue);
    props.ratingLUpdate(props.id, newValue);
  };

  const onChangeRatingV = (event, newValue) => {
    setValueV(newValue);
    props.ratingVUpdate(props.id, newValue);
  };

  const onClickButton = () => {
    deleteMovie(props.id);
  };

  const onClickImg = () => {
    props.detailClick(props.id);
  };

  return (
    <StyledMovieCard>
      <div className="img-icon-container">
        <img
          src={props.imageURL}
          width="138px"
          height="195px"
          onClick={onClickImg}
          alt="movie poster"
        />
        <p className="delete-icon" onClick={onClickButton}>
          ❌
        </p>
      </div>
      <h2 className="title-text">{props.title}</h2>
      <h3>
        {dateFilmedType === "number" || dateFilmedType === "string"
          ? dateFilmed
          : "---"}
      </h3>
      <h4>{myDate}</h4>
      <div className="rating">
        L:
        <Rating
          name="simple-controlled"
          value={valueL}
          onChange={onChangeRatingL}
          size="small"
          max={10}
          precision={0.5}
        />
      </div>
      <div className="rating">
        V:{" "}
        <Rating
          name="simple-controlled"
          value={valueV}
          onChange={onChangeRatingV}
          size="small"
          max={10}
          precision={0.5}
        />
      </div>
    </StyledMovieCard>
  );
}
