import {
  BrowserRouter as Router,
  Route,
  Routes ,
} from "react-router-dom";
import AddProduct from "./Product/Pages/Addproduct";
import Products from "./Product/Pages/Products";
import Updateproduct from "./Product/Pages/Updateproduct";
import Suppliers from "./Supplier/Pages/Suppliers";
import CreateSupplier from "./Supplier/Pages/CreateSupplier";
import Updatesupplier from "./Supplier/Pages/Updatesupplier";
import Delivery from "./Delivery/Pages/Delivery";
import DeleteDelivery from "./Delivery/Pages/DeleteDelivery";
import CreateDelivery from "./Delivery/Pages/CreateDelivery";
import AddEmployee from "./Employee/Pages/AddEmployee";
import Employee from "./Employee/Pages/Employee";
import Updateemployee from "./Employee/Pages/Updateemployee";


const App = () => {
  return (
    
    <Router>
      <Routes >
        <Route path="/Product" exact element={<Products/>}/>
        <Route path="/Product/update/:id" exact element={<Updateproduct/>}/> 
        <Route path="/Product/new" exact element={<AddProduct/>}/>
        <Route path="/Supplier" exact element={<Suppliers/>}/>
        <Route path="/Supplier/create" exact element={<CreateSupplier/>}/>
        <Route path="/Supplier/update/:id" exact element={<Updatesupplier/>}/>
        <Route path="/Delivery" exact element={<Delivery/>}/>
        <Route path="/Delivery/delete/:id" exact element={<DeleteDelivery/>}/>
        <Route path="/Delivery/create" exact element={<CreateDelivery/>}/>
        <Route path="/Employee" exact element={<Employee/>}/>
        <Route path="/Employee/update/:id" exact element={<Updateemployee/>}/> 
        <Route path="/Employee/new" exact element={<AddEmployee/>}/>
        
      </Routes >
    </Router>
  );
};

export default App;
