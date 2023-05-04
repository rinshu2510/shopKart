import React, { useState } from 'react'
import "./Header.css"
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShopingCartIcon from "@material-ui/icons/ShoppingCart"
import { Backdrop } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';
import { useDispatch, useSelector } from "react-redux";


const UserOptions = ({ user }) => {

    const { cartItems } = useSelector((state) => state.cart)

    const history = useHistory();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const alert = useAlert();

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        {
            icon: (
                <ShopingCartIcon
                    style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
                />
            ), name: `Cart(${cartItems.length})`, func: cart
        },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser }

    ]

    if (user.role === "admin") {
        options.unshift(
            { icon: <DashboardIcon />, name: "Dashboard", func: dashboard }

        )
    }

    function dashboard() {
        history.push("/admin/dashboard")
    }
    function orders() {
        history.push("/orders")
    }
    function account() {
        history.push("/account")
    }
    function cart() {
        history.push("/cart")
    }
    function logoutUser() {
        dispatch(logout())
        alert.success("Logout Successfully")
    }

    return (
        <>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                style={{ zIndex: "11" }}
                open={open}
                direction="up"
                className='speedDial'
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<img
                    className='speedDialIcon'
                    src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                    alt="Profile"
                />}
            >

                {options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                ))}
            </SpeedDial>
        </>
    )
}

export default UserOptions;