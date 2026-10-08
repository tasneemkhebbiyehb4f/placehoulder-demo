import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router";

const Navbar = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <nav>
      <Link to="/users">CRUD PlaceHolder</Link>
      {currentUser && (
        <>
          <Link to="/users/dashboard">Profile</Link>
          <Link to="/dashboard/public-posts">Public Posts</Link>
          <Link to="/dashboard/my-posts">My Posts</Link>
          <Link to="/dashboard/todos">Todos</Link>
          <Link to="/dashboard/my-albums">Albums</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
