import {
  BrowserRouter as Router,
  Route,
  Routes ,
} from "react-router-dom";
import AddProduct from "./Product/Pages/Addproduct";
import Updateproduct from "./Product/Pages/Updateproduct";
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
import CCForm from "./Payment/Pages/Components/CreditCardForm";
import Customers from "./Customer/Customers";
import RegisterCustomer from "./Customer/RegisterCustomer";
import UpdateCustomer from "./Customer/UpdateCustomer";
import ViewCustomer from "./Customer/ViewCustomer";
import AssignmentDelivery from "./Delivery/Pages/AssignmentDelivery"
import Dashboard from "./Dashboard/Dashboard";
import Cart from "./Cart/Pages/Cart";


const App = () => {
  return (
    
    <Router>
      <Routes >
        <Route path="/Dashboard" exact element={<Dashboard/>}/>
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
        <Route path="/Customer/view/:id" exact element={<ViewCustomer/>}/>
        <Route path="/AssignDelivery" exact element={<AssignmentDelivery/>}/>
          <Route path="/Cart" exact element={<Cart/>}/>
        
      </Routes >
    </Router>
  );
};

export default App;
