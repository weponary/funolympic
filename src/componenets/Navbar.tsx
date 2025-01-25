import {
  AppBar,
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import GamesIcon from "@mui/icons-material/Games";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";

const StyledToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
const Pages = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

interface NavbarProps {
  isAuthenticated: boolean;
  signOut: () => void;
}

const Navbar = ({ isAuthenticated, signOut }: NavbarProps) => {
  const [isHovered] = useState(false);
  const navigate = useNavigate();

  const onClick = (path: string) => {
    navigate(path);
  };

  return (
    <AppBar position="sticky">
      {/* <Toolbar>Navbar</Toolbar> */}
      <StyledToolBar>
        {/* <Logo /> */}
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          FunOlympic
        </Typography>
        <GamesIcon sx={{ display: { xs: "block", sm: "none" } }} />

        <Pages>
          <div
            style={{
              display: "flex",
              gap: 50,
              marginRight: 90,
            }}
          >
            <div onClick={() => onClick("/")}>
              <Typography
                variant="inherit"
                // component={Link}
                // to="/"
                style={{
                  textDecoration: isHovered ? "underline" : "none",
                  color: location.pathname === "/" ? "#C15319" : "white",
                }}
              >
                Home
              </Typography>
            </div>
            {isAuthenticated && (
              <div onClick={() => onClick("/live")}>
                <Typography
                  variant="inherit"
                  // component={Link}
                  // to="/live"
                  style={{
                    textDecoration: isHovered ? "underline" : "none",
                    color: location.pathname === "/live" ? "#C15319" : "white",
                  }}
                >
                  Live Sports
                </Typography>
              </div>
            )}
            <div onClick={() => onClick("/fixture")}>
              <Typography
                variant="inherit"
                // component={Link}
                // to="/fixture"
                style={{
                  textDecoration: isHovered ? "underline" : "none",
                  color: location.pathname === "/fixture" ? "#C15319" : "white",
                }}
              >
                Fixture
              </Typography>
            </div>
            <div onClick={() => onClick("/news")}>
              <Typography
                variant="inherit"
                // component={Link}
                // to="/news"
                style={{
                  textDecoration: isHovered ? "underline" : "none",
                  color: location.pathname === "/news" ? "#C15319" : "white",
                }}
              >
                News
              </Typography>
            </div>
            <div onClick={() => onClick("/highlight")}>
              <Typography
                variant="inherit"
                // component={Link}
                // to="/highlight"
                style={{
                  textDecoration: isHovered ? "underline" : "none",
                  color:
                    location.pathname === "/highlight" ? "#C15319" : "white",
                }}
              >
                Highlight
              </Typography>
            </div>
          </div>
          {/* <div>
            <Avatar sx={{ width: 30, height: 30 }} />
          </div> */}
          {isAuthenticated ? (
            <Profile signOut={signOut} />
          ) : (
            <>
              <Button color="secondary" component={Link} to="/auth/login">
                Login
              </Button>
              <Button color="secondary" component={Link} to="/auth/register">
                Register
              </Button>
            </>
          )}
        </Pages>
      </StyledToolBar>
    </AppBar>
  );
};

export default Navbar;
