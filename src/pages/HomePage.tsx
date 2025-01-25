import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import Image from "../assets/picture.jpg";
import FootBall from "../assets/football.png";
import BaskteBall from "../assets/baskteball.png";
import Tennis from "../assets/tennis.png";

const HomePage = () => {
  const sportsVideos = [
    {
      title: "Football",
      image: FootBall,
      videoUrl: "https://www.example.com/football-video",
    },
    {
      title: "Basketball",
      image: BaskteBall,
      videoUrl: "https://www.example.com/basketball-video",
    },
    {
      title: "Tennis",
      image: Tennis,
      videoUrl: "https://www.example.com/tennis-video",
    },
    // Add more sports videos here
  ];

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        bgcolor="#f5f5f5"
        p={14}
      >
        <Box mt={4} display="flex" gap={10} bgcolor="#f5f5f5">
          <Box maxWidth={500} p={2}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              display="flex"
              justifyContent="center"
            >
              Fun Olympic
            </Typography>
            <Typography variant="body2" color="text.secondary" marginTop={5}>
              Fun Olympic is an innovative app that brings the excitement of
              live matches and highlights to your fingertips. Gone are the days
              of relying on cable TV or searching multiple websites for your
              favorite sports content. With Fun Olympic, you can easily access
              live matches and catch up on highlights from various sports all in
              one place. The app goes beyond just delivering sports content by
              offering personalized recommendations, real-time updates, social
              integration, and comprehensive sports coverage. You can also enjoy
              in-depth analysis, VR experiences, gamification, and participate
              in contests. Fun Olympic even allows offline viewing and supports
              multiple languages, making it accessible and inclusive for a
              global audience. Experience the thrill of sports with Fun Olympic,
              where convenience, entertainment, and community come together in a
              user-friendly app.
            </Typography>
          </Box>
          <Box maxWidth={1000}>
            <img src={Image} alt="picture" style={{ height: 300 }} />
          </Box>
        </Box>
      </Box>
      <Box bgcolor="#f5f5f5">
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          display="flex"
          justifyContent="center"
        >
          Sports Types
        </Typography>
        <Box display="flex" justifyContent="center" mt={5}>
          {sportsVideos.map((video, index) => (
            <div key={index} style={{ margin: "0 30px" }}>
              <Card style={{ maxWidth: 300 }}>
                <CardMedia
                  component="img"
                  alt={video.title}
                  height="200"
                  image={video.image}
                  style={{ margin: "8px" }} // Add margin to the CardMedia component
                />
                <CardContent>
                  <Typography variant="subtitle1" align="center">
                    {video.title}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
