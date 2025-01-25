import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import { Favorite, Share } from "@mui/icons-material";
import { useQuery } from "react-query";
import { GET_LIVE_COMMNET, GET_ONE_LIVE } from "../services/live/query";

const LiveView = () => {
  const props = useLocation();
  const { id } = useParams();
  const [comments, setComments] = useState<
    { firstName: string; content: string }[]
  >([]);
  const [newComment, setNewComment] = useState<string>("");
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const navigate = useNavigate();
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };
  useQuery(["getAllCommnet", id], GET_LIVE_COMMNET, {
    enabled: !!id,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    onSuccess: (data: any) => {
      if (data?.status === 200) {
        data.data.result.forEach((newComment: any) => {
          setComments((prevComments) => [...prevComments, newComment]);
        });
      }
    },
  });
  const { data, isLoading } = useQuery(["getOneLive", id], GET_ONE_LIVE, {
    enabled: !!id,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
  const onBackClick = () => {
    navigate(-1); // Navigates back to the previous page
  };

  const handleAddComment = () => {
    socket.emit("comment", {
      firstName: sessionStorage.getItem("@fun-firstName"),
      content: newComment,
      liveId: props.state.result.id,
      userId: sessionStorage.getItem("@fun-userId"),
    });
    setComments((prevComments) => [
      ...prevComments,
      {
        firstName: sessionStorage.getItem("@fun-firstName") ?? "",
        content: newComment,
      },
    ]);
    setNewComment("");
  };

  const handleLike = () => {
    // Call API to update the like status
    // Example API call:
    // updateLikeStatus(props.state.result.id, !isLiked);

    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  const handleShare = () => {
    setOpenShareDialog(true);
  };

  const handleCloseShareDialog = () => {
    setOpenShareDialog(false);
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const socket = io.connect("http://localhost:8000");
  useEffect(() => {
    socket.on(
      "broadcast-message",
      (comment: { firstName: string; content: string }) => {
        setComments((prevComments) => [...prevComments, comment]);
      }
    );

    return () => {
      socket.off("broadcast-message");
    };
  }, [socket]);

  useEffect(() => {
    socket.emit("user_connected", {
      email: sessionStorage.getItem("@fun-email"),
      liveId: data?.data?.result?.id,
    });
  }, []);
  if (isLoading) {
    return <></>;
  }

  return (
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
        width={"100%"}
      >
        <Button
          size="large"
          onClick={onBackClick}
          color="primary"
          sx={{ mb: 1 }}
          variant="contained"
          style={{
            marginRight: "100px",
          }}
        >
          Back
        </Button>
        <div style={{ marginLeft: "250px" }}>Live Match</div>
      </Typography>

      <Box
        mt={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={5}
        bgcolor="#f5f5f5"
      >
        <Card sx={{ bgcolor: "white", overflowY: "scroll" }}>
          <iframe
            width="800"
            height="500"
            src={data?.data?.result?.url}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          ></iframe>
          <CardContent>
            <Box display={"flex"} justifyContent={"flex-start"}>
              <Box display="flex" alignItems="center">
                <IconButton
                  color={isLiked ? "primary" : "default"}
                  onClick={handleLike}
                >
                  <Favorite />
                </IconButton>
                <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
                  Like
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <IconButton onClick={handleShare}>
                  <Share />
                </IconButton>
                <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
                  Share
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card style={{ height: "550px" }}>
          <CardContent style={{ height: "100%" }}>
            <Typography variant="h6">Live Comment</Typography>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              flexDirection={"column"}
              height={"90%"}
            >
              <Box
                sx={{
                  maxHeight: 500,
                  overflowY: "scroll",
                  marginTop: 2,
                  marginBottom: 2,
                }}
                bgcolor={"lightgrey"}
              >
                {comments.map((comment, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ marginRight: 1, fontWeight: "bold" }}
                    >
                      {comment.firstName}:
                    </Typography>
                    <Typography variant="body1">{comment.content}</Typography>
                  </Box>
                ))}
              </Box>
              <Box>
                <TextField
                  label="Add a comment"
                  value={newComment}
                  onChange={handleCommentChange}
                  variant="outlined"
                  fullWidth
                  rows={2}
                  margin="normal"
                />
                <Button variant="contained" onClick={handleAddComment}>
                  Add Comment
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Dialog open={openShareDialog} onClose={handleCloseShareDialog}>
        <DialogTitle>Share</DialogTitle>
        <DialogContent>
          <Typography>Link to the website: {window.location.href}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseShareDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LiveView;
