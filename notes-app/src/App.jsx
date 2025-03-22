import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";
import Home from "./components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <div className="container mx-auto p-6">
          <Home />
        </div>
      </>
    ),
  },
  {
    path: "/pastes",
    element: (
      <>
        <Navbar />
        <div className="container mx-auto p-6">
          <Paste />
        </div>
      </>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <>
        <Navbar />
        <div className="container mx-auto p-6">
          <ViewPaste />
        </div>
      </>
    ),
  },
]);

function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
