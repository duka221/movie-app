import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Card, Grid, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import * as React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Movies({ movie }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const addTo = (id, name) => {
    let arr = JSON.parse(localStorage.getItem(name)) ?? []; // თუ ლოკალსთორეიჯიდან არ მოვა მაშინ ცარიელი მასივი იქნება

    if (!arr.find((element) => element === id)) {
      // ვამოწმებთ არსებობაზე
      arr.push(movie.find((element) => element.id === id).id); //ვპოულობ ერთ კონკრეტულ ელემენტის id-ს და ვადარებთ პარამეტრიდან მოსულ id-ს
      toast.success(`Movie added to ${name}`);
    } else {
      toast.error(`This movie already exists in the ${name}`);
    }
    localStorage.setItem(name, JSON.stringify(arr));
  };
  return (
    <>
      <Stack justifyContent="center" alignItems="center">
        <Stack justifyContent="center" alignItems="center" py={2}>
          <TextField
            label="Search Movie"
            variant="standard"
            color="primary"
            sx={{
              width: { lg: "400px", md: "400px", sm: "200px", xs: "200px" },
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Stack>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {movie &&
            movie
              .filter((item) =>
                item.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((item, index) => (
                <Grid
                  item
                  xs={{
                    lg: 4,
                    md: 4,
                    sm: 2,
                    xs: 1,
                  }}
                  key={index}
                >
                  <Card
                    sx={{
                      maxWidth: 360,
                      height: { lg: 605, md: 605, sm: 645, xs: 645 },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="400px"
                      image={
                        "https://image.tmdb.org/t/p/original/" +
                        item.poster_path
                      }
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        color="#E2B616"
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.overview.length <= 90
                          ? item.overview
                          : item.overview.substr(0, 90) + "..."}
                      </Typography>
                    </CardContent>
                    <Stack direction="row">
                      <CardActions>
                        <Button onClick={() => navigate(`detailed/${item.id}`)}>
                          {" "}
                          Detailed{" "}
                        </Button>
                      </CardActions>
                      <CardActions
                        sx={{
                          ":hover": { backgroundColor: "grey" },
                          cursor: "pointer",
                        }}
                        onClick={() => addTo(item.id, "favorites")}
                      >
                        <FavoriteIcon />
                      </CardActions>
                      <CardActions
                        sx={{
                          ":hover": { backgroundColor: "grey" },
                          cursor: "pointer",
                        }}
                        onClick={() => addTo(item.id, "liked")}
                      >
                        <ThumbUpIcon />
                      </CardActions>
                      <CardActions
                        sx={{
                          ":hover": { backgroundColor: "grey" },
                          cursor: "pointer",
                        }}
                        onClick={() => addTo(item.id, "watchlist")}
                      >
                        <VisibilityIcon />
                      </CardActions>
                    </Stack>
                  </Card>
                </Grid>
              ))}
        </Grid>
      </Stack>
    </>
  );
}
