import { Button, Card, CardActions, CardContent, CardMedia, Grid, Stack, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useEffect, useState } from "react";
import axios from "axios"
import {  toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


export const Favorites = () => {
  const navigate = useNavigate()
    let [item, setItem] =  useState(JSON.parse(localStorage.getItem("favorites"))?? [])
    const removeItem =(id)=>{
        let arr = item.filter(movie => movie !== id) 
        localStorage.setItem("favorites",JSON.stringify(arr))
        setItem(arr)
        toast.info('Movie has been deleted')
    }
    const [movie, setMovie] = useState([])
    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1&#39')
        .then(res => {
          setMovie(res.data.results)
          console.log(res.data.results);
        })
    }, [])
    console.log(movie)
    return(
        <>
        <Typography color="#D9AF15" variant="h4" my={1}> Favorites </Typography>
        <Stack justifyContent="center" alignItems="center">
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {movie && item.length > 0 ?
            movie.filter(movieItem => item.find(id => id === movieItem.id) ? movieItem : null).map((item, index) => (
              <Grid item xs={4} key={index}>
                <Card sx={{ maxWidth: 360 }}>
                  <CardMedia
                    component="img"
                    height="400x"
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
                      {item.overview}
                    </Typography>
                  </CardContent>
                  <Stack direction="row">
                  <CardActions >
                    <Button onClick={()=> navigate(`/detailed/${item.id}`)}> Detailed </Button>
                  </CardActions>
                  <CardActions  >
                    <Button onClick={()=> removeItem(item.id)}> Remove </Button>
                  </CardActions>
                  </Stack>
                </Card>
              </Grid>
            )): <Stack alignItems="center" width={1}>
            <Typography   color="white" variant="h3"> Empty! </Typography>
        </Stack>}
        </Grid>
    </Stack>
  
  </>
    )
};
