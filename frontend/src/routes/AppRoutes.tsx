import { Navigate, Route, Routes } from "react-router";
import Users from "../pages/Users/Users";
import Dashboard from "../pages/Dashboard/Dashboard";
import PublicPosts from "../pages/Dashboard/PublicPosts";
import MyPosts from "../pages/Dashboard/MyPosts";
import Albums from "../pages/Dashboard/Albums";
import AlbumPhotos from "../components/Albums/AlpumPhotos";
import Todos from "../pages/Dashboard/Todos";
const AppRoutes = () => {
   
  return (
    <Routes>
      <Route path="/" element={<Navigate to="users" />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/public-posts" element={<PublicPosts />} />
      <Route path="/dashboard/my-posts" element={<MyPosts />} />
      <Route path="/dashboard/my-albums" element={<Albums />} />
      <Route path="/dashboard/my-albums/:albumId" element={<AlbumPhotos />} />
      <Route path="/dashboard/Todos" element={<Todos />} />
    </Routes>
  );
};

export default AppRoutes;
