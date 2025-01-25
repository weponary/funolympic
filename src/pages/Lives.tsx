import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Link,
  // CardActionArea,
} from "@mui/material";
// import Image from "../assets/circket.jpg";
import { GET_ALL_NEWS } from "../services/news/query";
import { useQuery } from "react-query";
import Image from "../assets/fixture.jpg";
import { GET_ALL_HIGHLIGHT } from "../services/highlight/query";
import { GET_ALL_LIVE } from "../services/live/query";
import { useNavigate } from "react-router-dom";

const Live = () => {
  const [isHovered, setIsHovered] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const [result, setResult] = useState([]);

  const handleCardClick = () => {
    setExpanded(!expanded);
  };
  const { isLoading, data, error, refetch } = useQuery(
    ["getAllLives"],
    GET_ALL_LIVE
  );
  const navigate = useNavigate();
  const onClick = (data: any) => {
    navigate(`/liveView/${data.id}`, {
      state: {
        result: data,
      },
    });
  };
  if (isLoading) {
    return <>Loading.....</>;
  }

  return (
    <>
      {data && (
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
            Latest Live
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
                      <Card
                        onClick={handleCardClick}
                        style={{ margin: "50px" }}
                      >
                        <Grid container alignItems="center" spacing={2}>
                          <Grid>
                            <CardMedia
                              component="img"
                              height={"100%"}
                              width={"100%"}
                              src={`http://localhost:8000/uploads/${item.image}`}
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
                                <Typography
                                  variant="h5"
                                  style={{
                                    cursor: "pointer",
                                    textDecoration: isHovered
                                      ? "underline"
                                      : "none",
                                  }}
                                >
                                  <div onClick={() => onClick(item)}>
                                    {item.title}
                                  </div>
                                </Typography>
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
      )}
    </>
  );
};

export default Live;
