import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Plant from "./pages/plant";
import Trash from "./pages/trash";
import Co2 from "./pages/co2";
import Harry from "./pages/harry";
import Leaderboard from "./pages/leaderboard";
import Profile from "./pages/profile";
import Login from "./pages/login";
import XpLevelSystem from './components/levels';
import Header from './components/header';
import TestLocation from "./pages/TestLocation";
import Rewards from "./pages/rewards";
import './App.css';

const router = createBrowserRouter([
  {
    index: true,
    element: <Harry />,
  },
  {
    path: "rewards",
    element: <Rewards />
  },
  {
    path: "plant",
    element: <Plant />
  },
  {
    path: "trash",
    element: <Trash />
  },
  {
    path: "co2",
    element: <Co2 />
  },
  {
    path: "profile",
    element: <Profile />
  },
  {
    path: "leaderboard",
    element: <Leaderboard />
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "levels",
    element: <XpLevelSystem />
  },
  {
    path: "header",
    element: <Header />
  },
  {
    path: "location",
    element: <TestLocation />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;