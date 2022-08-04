import { React, useContext } from "react";
import { StyledMovieCard } from "./styled/StyledMovieCard";
import { Rating } from "@mui/material";
import { useState } from "react";
import { GoTrashcan } from "react-icons/go";
import MoviesContext from "../MoviesContext";

export default function MovieCard(props) {
  const [valueL, setValueL] = useState(null);
  const [valueV, setValueV] = useState(null);

  const { deleteMovie } = useContext(MoviesContext);

  const onChangeRatingL = (event, newValue) => {
    setValueL(newValue);
  };

  const onChangeRatingV = (event, newValue) => {
    setValueV(newValue);
  };

  const onClickButton = () => {
    deleteMovie(props.id);
  };

  const onClickImg = () => {
    props.detailClick(props.id);
  };

  return (
    <StyledMovieCard>
      <div className="img-trash-container">
        <img
          src={props.imageURL}
          width="138px"
          height="195px"
          //Když kliknu na obrázek, pošlu do funkce props.id itemu, na který jsem klikl.
          onClick={onClickImg}
        />
        <GoTrashcan className="trash-icon" onClick={onClickButton} />
      </div>
      <h2>{props.title}</h2>
      <h3>{props.movieYear}</h3>
      <h4>{props.dateWatched}</h4>
      <span>
        L:
        <Rating
          name="simple-controlled"
          value={valueL}
          onChange={onChangeRatingL}
          size="small"
          max={10}
          precision={0.5}
        />
      </span>
      <span>
        V:{" "}
        <Rating
          name="simple-controlled"
          value={valueV}
          onChange={onChangeRatingV}
          size="small"
          max={10}
          precision={0.5}
        />
      </span>
    </StyledMovieCard>
  );
}