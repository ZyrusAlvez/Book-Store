import "./App.css"
import Create from "./pages/Create Book/Create";
import Delete from "./pages/Delete Book/Delete";
import Edit from "./pages/Edit Book/Edit";
import Home from "./pages/Home/Home.jsx"
import NotFound from "./pages/Not Found/NotFound.jsx"
import Show from "./pages/Show Book/Show.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/create',
      element: <Create />
    },
    {
      path: '/show/:id',
      element: <Show />
    },
    {
      path: '/delete/:id',
      element: <Delete />
    },
    {
      path: '/edit/:id',  
      element: <Edit />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
} 