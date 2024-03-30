import {
  BrowserRouter as Router,
  Route,
  Routes ,
} from "react-router-dom";
import AddProduct from "./Product/Pages/Addproduct";
import Products from "./Product/Pages/Products";
import Updateproduct from "./Product/Pages/Updateproduct";
import Suppliers from "./Supplier/Pages/Suppliers";
import DeleteSupplier from "./Supplier/Pages/DeleteSupplier";
import CreateSupplier from "./Supplier/Pages/CreateSupplier";

const App = () => {
  return (
    
    <Router>
      <Routes >
        <Route path="/Product" exact element={<Products/>}/>
        <Route path="/Product/update/:id" exact element={<Updateproduct/>}/> 
        <Route path="/Product/new" exact element={<AddProduct/>}/>
        <Route path="/Supplier" exact element={<Suppliers/>}/>
        <Route path="/Supplier/delete/:id" exact element={<DeleteSupplier/>}/>
        <Route path="/Supplier/create" exact element={<CreateSupplier/>}/>
      </Routes >
    </Router>
  );
};

export default App;
