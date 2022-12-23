import { Box, Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Detailed = () => {
  const [movie, setMovie] = useState();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1&#39"
      )
      .then((res) => {
        setMovie(res.data.results.find((item) => item.id === JSON.parse(id))); // useparamsidan მიღებულ id-s ვადარებთ resultshi arsebuli item-is id-s anu konkretuli filmis id-s
        console.log(
          res.data.results.find((item) => item.id === JSON.parse(id))
        );
      });
  }, [id]);
  return (
    <>
      {movie && (
        <Box sx={{ height: "800px", width: 1 }}>
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              backgroundImage: `linear-gradient(0deg, rgba(11,12,23,1) 15%,rgba(11,12,23,0.8) 100%), url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: 1,
              width: 1,
            }}
          >
            <Container maxWidth="xl">
              <Stack
                alignItems={{
                  lg: "center",
                  md: "center",
                  sm: "center",
                  xs: "center",
                }}
                gap={2}
                direction={{
                  lg: "column",
                  md: "column",
                  sm: "column",
                  sx: "column",
                }}
                justifyContent="space-around"
              >
                <Box sx={{ width: { lg: 1, md: 1, sm: 200, xs: 200 } }}>
                  <Box sx={{ width: "200px", height: "300px" }}>
                    <Box
                      component="img"
                      width={200}
                      height={300}
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      sx={{ objectFit: "cover" }}
                    />
                  </Box>

                  <Box mt={2} mb={1}>
                    <Typography
                      fontSize={{ lg: 26, md: 26, sm: 20, xs: 20 }}
                      textAlign={{
                        lg: "left",
                        md: "left",
                        sm: "center",
                        sx: "center",
                      }}
                      lineHeight={1.2}
                      color="text.primary"
                    >
                      {movie.title} ({movie.release_date.split("-")[0]})
                    </Typography>
                  </Box>
                  <Stack
                    direction={{
                      lg: "row",
                      md: "row",
                      sm: "column",
                      xs: "column",
                    }}
                    gap={{ lg: 2, md: 2, sm: 1, xs: 1 }}
                    alignItems="center"
                  >
                    <Stack direction="row" gap={2} alignItems="center">
                      <Stack direction="row" gap={0.2}>
                        <Typography
                          fontSize={18}
                          textAlign="left"
                          color="text.primary"
                        >
                          {movie.length}
                        </Typography>
                        <Typography
                          fontSize={14}
                          textAlign="left"
                          color="#E2B616"
                          sx={{ opacity: 0.6 }}
                        >
                          IMDB {movie.vote_average}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Box>
                <Stack alignItems="center">
                  <Typography variant="h6" color="text.secondary">
                    {movie.overview}
                  </Typography>
                </Stack>
              </Stack>
            </Container>
          </Stack>
        </Box>
      )}
    </>
  );
};
