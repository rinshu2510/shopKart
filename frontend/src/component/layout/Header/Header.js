import React from 'react';
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import PersonIcon from '@mui/icons-material/Person';
import UserOptions from './UserOptions'
// const options = {
//   burgerColorHover: "#eb4034",
//   logo,
//   logoWidth: "20vmax",
//   navColor1: "white",
//   logoHoverSize: "10px",
//   logoHoverColor: "#eb4034",
//   link1Text: "Home",
//   link2Text: "Products",
//   link3Text: "Contact",
//   link4Text: "About",
//   link1Url: "/",
//   link2Url: "/products",
//   link3Url: "/contact",
//   link4Url: "/about",
//   link1Size: "1.3vmax",
//   link1Color: "rgba(35, 35, 35,0.8)",
//   nav1justifyContent: "flex-end",
//   nav2justifyContent: "flex-end",
//   nav3justifyContent: "flex-start",
//   nav4justifyContent: "flex-start",
//   link1ColorHover: "#eb4034",
//   link1Margin: "1vmax",
//   profileIconUrl: "/login",
//   profileIconColor: "rgba(35, 35, 35,0.8)",
//   searchIconColor: "rgba(35, 35, 35,0.8)",
//   cartIconColor: "rgba(35, 35, 35,0.8)",
//   profileIconColorHover: "#eb4034",
//   searchIconColorHover: "#eb4034",
//   cartIconColorHover: "#eb4034",
//   cartIconMargin: "1vmax",
// };

const pages = ["Products", "Contact", "About"]

const Header = () => {
  // return <ReactNavbar {...options} />
  const { user, isAuthenticated } = useSelector((state) => state.user);
  console.log(user)
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#000" }}>
              <Link to='/'>
                <img src={logo} style={{ width: "12vmax", height: "5vmax" }} />
              </Link>
            </Typography>

            <Typography component={Link} to='/products' sx={{ textDecoration: 'none', color: "#000", mr: 2 }}>Products</Typography>
            <Typography component={Link} to='/login' sx={{ display: !isAuthenticated ? null : "none", textDecoration: 'none', color: "#000", mr: 2 }}>Login</Typography>
            <Typography component={Link} to='/login' sx={{ display: !isAuthenticated ? null : "none", textDecoration: 'none', color: "#000", mr: 2 }}>Register</Typography>

          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default Header;