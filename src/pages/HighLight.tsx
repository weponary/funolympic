import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Link,
  styled,
  // CardActionArea,
} from "@mui/material";
// import Image from "../assets/circket.jpg";
import { GET_ALL_NEWS } from "../services/news/query";
import { useQuery } from "react-query";
import Image from "../assets/fixture.jpg";
import { GET_ALL_HIGHLIGHT } from "../services/highlight/query";
import Paper from "@mui/material/Paper";

const Highlight = () => {
  const [isHovered, setIsHovered] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const handleCardClick = () => {
    setExpanded(!expanded);
  };
  const { isLoading, data, error, refetch } = useQuery(
    ["getAllHighlight"],
    GET_ALL_HIGHLIGHT,
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        bgcolor="#f5f5f5"
        p={5}
      >
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          display="flex"
          justifyContent="center"
        >
          Latest Highlight
        </Typography>
        <Box mt={4} display="flex" gap={4} bgcolor="#f5f5f5">
          <Card
            sx={{
              maxWidth: 800,
              maxHeight: 700,
              bgcolor: "white",
              overflowY: "scroll",
            }}
          >
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ xs: 3, sm: 3, md: 3 }}
            >
              {(data?.data?.result ?? []).map((item: any, key: string) => {
                return (
                  <Grid xs={6} item key={key}>
                    <Card onClick={handleCardClick} style={{ margin: "50px" }}>
                      <Grid container alignItems="center" spacing={2}>
                        <Grid>
                          <CardMedia
                            component="iframe"
                            height={"100%"}
                            width={"100%"}
                            src={`http://localhost:8000/uploads/${item.video}`}
                            // allow="autoPlay"
                            allowFullScreen
                          />
                          <Grid>
                            <CardContent>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {item.date}
                              </Typography>
                            </CardContent>
                          </Grid>
                          <Grid item>
                            <CardContent>
                              <Link
                                variant="h5"
                                style={{
                                  cursor: "pointer",
                                  textDecoration: isHovered
                                    ? "underline"
                                    : "none",
                                }}
                                href={item.url}
                                target="_blank"
                              >
                                {item.title}
                              </Link>
                            </CardContent>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Card>

          <Card sx={{ maxWidth: 400 }}>
            <CardMedia
              component="img"
              height="700"
              image={Image}
              alt="picture"
            />
            {/* <CardMedia
            component="img"
            height="200"
            image={Picture}
            alt="picture"
          /> */}
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default Highlight;
