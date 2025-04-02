import {Route, Routes} from "react-router";
import './App.css'
import ProductList from "./pages/productlist/index.jsx";
import ProductCreate from "./pages/productcreate/index.jsx";

function App() {
  return (
    <>
        <Routes>
            <Route path={"/products"} element={<ProductList/>}></Route>
            <Route path="/products/create" element={<ProductCreate/>} />
            {/*<Route path="/products/:pid/edit" element={<UserEdit/>} />*/}
            {/*<Route path="/products/:pid/detail" element={<UserDetail/>} />*/}
        </Routes>
    </>
  )
}

export default App
