import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { useSelector } from "react-redux";
import Loader from '../layout/Loader/Loader';


const Profile = ({ history }) => {

    const { user, loading, isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (isAuthenticated === false) {
            history.push("/login")
        }
    }, [isAuthenticated, history])

    console.log(user, isAuthenticated, loading)
    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={`${user.name}'s Profile`} />
                    <div className="profileContainer">
                        <div>
                            <h1>My Profile</h1>
                            <img src={user.avatar.url} alt={user.name} />
                            <Link to="/me/update">Edit Profile</Link>
                        </div>
                        <div>
                            <h4>Full Name</h4>
                            <p>{user.name}</p>
                        </div>
                        <div>
                            <h4>Email</h4>
                            <p>{user.email}</p>
                        </div>
                        <div>
                            <h4>Joined On</h4>
                            {/* <p>{String(user.createdAt).substr(0, 10)}</p> */}
                        </div>
                        <div>
                            <link to="/orders">My Orders</link>
                            <link to="/password/update">Change Password</link>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Profile