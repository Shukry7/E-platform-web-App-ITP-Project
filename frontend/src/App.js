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
import Delivery from "./Delivery/Pages/Delivery";
import DeleteDelivery from "./Delivery/Pages/DeleteDelivery";
import CreateDelivery from "./Delivery/Pages/CreateDelivery";

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
        <Route path="/Delivery" exact element={<Delivery/>}/>
        <Route path="/Delivery/delete/:id" exact element={<DeleteDelivery/>}/>
        <Route path="/Delivery/create" exact element={<CreateDelivery/>}/>
      </Routes >
    </Router>
  );
};

export default App;
