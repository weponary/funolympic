import React from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Image from "../assets/picture.jpg";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      bgcolor="#f5f5f5"
      p={14}
    >
      <Box mt={4} display="flex" gap={10}>
        <Card sx={{ maxWidth: 500, bgcolor: "white" }}>
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                display="flex"
                justifyContent="center"
              >
                Fun Olympic
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                display={"flex"}
                marginTop={5}
              >
                Fun Olympic is an innovative app that brings the excitement of
                live matches and highlights to your fingertips. Gone are the
                days of relying on cable TV or searching multiple websites for
                your favorite sports content. With Fun Olympic, you can easily
                access live matches and catch up on highlights from various
                sports all in one place. The app goes beyond just delivering
                sports content by offering personalized recommendations,
                real-time updates, social integration, and comprehensive sports
                coverage. You can also enjoy in-depth analysis, VR experiences,
                gamification, and participate in contests. Fun Olympic even
                allows offline viewing and supports multiple languages, making
                it accessible and inclusive for a global audience. Experience
                the thrill of sports with Fun Olympic, where convenience,
                entertainment, and community come together in a user-friendly
                app.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                sx={{ mt: 10, ml: 14 }}
                component={Link}
                to="/auth/login"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Login for live Match
                </Box>
              </Button>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 1000 }}>
          <CardMedia component="img" height="500" image={Image} alt="picture" />
        </Card>
      </Box>
    </Box>
  );
};

export default LandingPage;
