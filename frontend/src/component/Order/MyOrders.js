import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";
import { darken, lighten } from '@mui/material/styles';
import Box from '@mui/material/Box';


const MyOrders = () => {
    const dispatch = useDispatch();

    const alert = useAlert();

    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);


    const getBackgroundColor = (color, mode) =>
        mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

    const getHoverBackgroundColor = (color, mode) =>
        mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);
    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 0.9 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.4,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.4,
        },

        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.6,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <LaunchIcon />
                    </Link>
                );
            },
        },
    ];
    const rows = [];

    orders &&
        orders.forEach((item, index) => {
            rows.push({
                itemsQty: item.orderItems[0].quantity,
                id: item._id,
                status: item.orderStatus,
                amount: item.totalPrice,
            });
        });

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(myOrders());
    }, [dispatch, alert, error]);

    return (
        <Fragment>
            <MetaData title={`${user.name} - Orders`} />

            {loading ? (
                <Loader />
            ) : (

                <Box sx={{

                    '& .super-app-theme--Filled': {
                        bgcolor: (theme) =>
                            getBackgroundColor(theme.palette.success.main, theme.palette.mode),
                        '&:hover': {
                            bgcolor: (theme) =>
                                getHoverBackgroundColor(
                                    theme.palette.success.main,
                                    theme.palette.mode,
                                ),
                        },
                    },

                    '& .super-app-theme--Rejected': {
                        bgcolor: (theme) =>
                            getBackgroundColor(theme.palette.error.main, theme.palette.mode),
                        '&:hover': {
                            bgcolor: (theme) =>
                                getHoverBackgroundColor(theme.palette.error.main, theme.palette.mode),
                        },
                    },
                }}>
                    <div className="myOrdersPage">
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className="myOrdersTable"
                            autoHeight
                            getRowClassName={(params) => params.getValue(params.id, "status") === "Delivered" ? `super-app-theme--Filled` : 'super-app-theme--Rejected'}

                        />

                        <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
                    </div>
                </Box>

            )}
        </Fragment >
    );
};

export default MyOrders;