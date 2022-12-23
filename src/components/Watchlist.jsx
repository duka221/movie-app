import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Watchlist = () => {
  const navigate = useNavigate();
  let [item, setItem] = useState(
    JSON.parse(localStorage.getItem("watchlist")) ?? []
  );
  const removeItem = (id) => {
    let arr = item.filter((movie) => movie !== id);
    localStorage.setItem("watchlist", JSON.stringify(arr));
    setItem(arr);
    toast.info("Movie has been deleted");
  };
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1&#39"
      )
      .then((res) => {
        setMovie(res.data.results);
        console.log(res.data.results);
      });
  }, []);
  return (
    <>
      <Typography color="#D9AF15" variant="h4" my={1}>
        {" "}
        Watchlist{" "}
      </Typography>

      <Stack justifyContent="center" alignItems="center">
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {movie && item.length > 0 ? (
            movie
              .filter((movieItem) =>
                item.find((id) => id === movieItem.id) ? movieItem : null
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
                      <Typography gutterBottom variant="h5" component="div">
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
                        <Button
                          onClick={() => navigate(`/detailed/${item.id}`)}
                        >
                          {" "}
                          Detailed{" "}
                        </Button>
                      </CardActions>
                      <CardActions>
                        <Button onClick={() => removeItem(item.id)}>
                          {" "}
                          Remove{" "}
                        </Button>
                      </CardActions>
                    </Stack>
                  </Card>
                </Grid>
              ))
          ) : (
            <Stack alignItems="center" width={1}>
              <Typography color="white" variant="h3">
                {" "}
                Empty!{" "}
              </Typography>
            </Stack>
          )}
        </Grid>
      </Stack>
    </>
  );
};
