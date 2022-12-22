import { Typography } from "@mui/material"
import axios from "axios"
import { useEffect,useState } from "react"
import Movies from "./Movies"


export const Main = () => {
    const [movie, setMovie] = useState([]);
    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1&#39')
        .then(res => {
          setMovie(res.data.results)
          console.log(res.data.results);
        })
    }, [])
    
    return(
        <>
            {movie.length === 0 ? (<Typography> Loading... </Typography>): <Movies movie={movie} setMovie={setMovie}/>}
        </>
            
    )
}