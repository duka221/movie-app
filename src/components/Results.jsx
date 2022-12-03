import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Card, Grid, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";

export default function Results(movie) {
  console.log(movie.movie);

  return (
    <>
      <Stack justifyContent="center" alignItems="center">
        <Box sx={{ maxWidth: "lg", width: 1, py: 5 }}>
          <Stack justifyContent="center" alignItems="center" py={2}>
            <TextField
              id="standard-basic"
              label="Search Movie"
              variant="standard"
              color="primary"
              sx={{ width: "500px" }}
              
            />
          </Stack>

          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {movie &&
              movie.movie.map((item, index) => (
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
                    <CardActions>
                      <Typography variant="body2" color="black">
                        {item.release_date}
                      </Typography>
                      <Button size="small">Share</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Stack>
    </>
  );
}
