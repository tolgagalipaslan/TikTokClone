import { Home, MyPostDetails, PostDetails, Profile, Upload } from "../pages";

const routes = [
  { path: "/", component: <Home /> },
  { path: "/profile/:id", component: <Profile /> },
  { path: "/upload", component: <Upload /> },
  { path: "/post/:id", component: <PostDetails /> },
  { path: "/profilePostDetails/:id", component: <MyPostDetails /> },
];

export default routes;
