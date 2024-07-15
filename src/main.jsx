import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from "./pages/Login"
import ProductDetails from './pages/ProductDetails'
import ShopingList from './pages/ShopingList'
import Home from './pages/Home'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoutes from "./pages/ProtectedRoutes.jsx"
import Register from './pages/Register.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />}  />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path='/home/:userId' element={<Home />} />
        <Route path='/productDetails/:id' element={<ProductDetails />} />
        <Route path='/home/:userId/shoppingList/:id' element={<ShopingList />} />
      </Route>
    </>
  )
);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
