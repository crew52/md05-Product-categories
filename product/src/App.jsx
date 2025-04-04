import {Route, Routes} from "react-router";
import './App.css'
import ProductList from "./pages/productlist/index.jsx";
import ProductCreate from "./pages/productcreate/index.jsx";
import ProductEdit from "./pages/productedit/index.jsx";
import ProductDetail from "./pages/productdetail/index.jsx";
import MusicList from "./pages/music/musicList/index.jsx";
import MusicCreate from "./pages/music/musicCreate/index.jsx";

function App() {
  return (
    <>
        <Routes>
            <Route path={"/products"} element={<ProductList/>}></Route>
            <Route path="/products/create" element={<ProductCreate/>} />
            <Route path="/products/:pid/edit" element={<ProductEdit/>} />
            <Route path="/products/:pid/detail" element={<ProductDetail/>} />

            <Route path={"/musics"} element={<MusicList/>}></Route>
            <Route path="/musics/create" element={<MusicCreate/>} />
        </Routes>
    </>
  )
}

export default App
