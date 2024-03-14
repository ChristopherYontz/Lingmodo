import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/community">Community</Link>
            <Link to="/progress">Progress</Link>
        </div>
    )
}