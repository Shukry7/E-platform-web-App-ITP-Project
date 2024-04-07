import {
  BrowserRouter as Router,
  Route,
  Routes ,
} from "react-router-dom";
import AddProduct from "./Product/Pages/Addproduct";
import Products from "./Product/Pages/Products";
import Suppliers from "./Supplier/Pages/Suppliers";
import CreateSupplier from "./Supplier/Pages/CreateSupplier";
import Updatesupplier from "./Supplier/Pages/Updatesupplier";
import ViewSupplier from "./Supplier/Pages/ViewSupplier";
import Delivery from "./Delivery/Pages/Delivery";
import CreateDelivery from "./Delivery/Pages/CreateDelivery";
import UpdateDelivery from "./Delivery/Pages/UpdateDelivery";
import CreateEmployee from "./Employee/Pages/CreateEmployee";
import Employee from "./Employee/Pages/Employee";
import Updateemployee from "./Employee/Pages/Updateemployee";
import Updateproduct from "./Product/Pages/Updateproduct";
import CCForm from "./Payment/Pages/Components/CreditCardForm";
import Customers from "./Customer/Customers";
import RegisterCustomer from "./Customer/RegisterCustomer";
import UpdateCustomer from "./Customer/UpdateCustomer";


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
        <Route path="/Supplier/view/:id" exact element={<ViewSupplier/>}/>
        <Route path="/Delivery" exact element={<Delivery/>}/>
        <Route path="/Delivery/create" exact element={<CreateDelivery/>}/>
        <Route path="/Delivery/update/:id" exact element={<UpdateDelivery/>}/>
        <Route path="/Employee" exact element={<Employee/>}/>
        <Route path="/Employee/update/:id" exact element={<Updateemployee/>}/> 
        <Route path="/Employee/new" exact element={<CreateEmployee/>}/>
        <Route path="/CC/new" exact element={<CCForm/>}/>
        <Route path="/Customer" exact element={<Customers/>}/>
        <Route path="/Customer/create" exact element={<RegisterCustomer/>}/>
        <Route path="/Customer/update/:id" exact element={<UpdateCustomer/>}/>
        
      </Routes >
    </Router>
  );
};

export default App;
