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
import AddCC from "./Payment/Pages/AddCreditCard";
import MarkAttendance from "./Employee/Pages/Attendance";
import CCForm from "./Payment/Pages/Components/CreditCardForm";
import Customers from "./Customer/Customers";
import RegisterCustomer from "./Customer/RegisterCustomer";
import UpdateCustomer from "./Customer/UpdateCustomer";
import AssignmentDelivery from "./Delivery/Pages/AssignmentDelivery";
import Dashboard from "./Dashboard/Dashboard";
import Cart from "./Cart/Pages/Cart";
import Offpay from "./Payment/Pages/OfflinePayment";
import CC from "./Payment/Pages/CreditCard"

import ViewCustomer from "./Customer/ViewCustomer";
import CreateWholesalecustomer from "./Wholesalecustomer/Pages/CreateWholesalecustomer"
import Wholesalecustomer from "./Wholesalecustomer/Pages/Wholesalecustomer";
import UpdateWholesalecustomer from "./Wholesalecustomer/Pages/UpdateWholesalecustomer";
import LoginPage from "./Login/LoginPage";
import ProductList from "./Product/Pages/Components/ProductList";
import ProductDetails from "./Product/Pages/Components/ProductDetails";
import SalaryCalculatorForm from "./Employee/Pages/Salaryform";
import Loader from "./Shared/Components/UiElements/Loader";

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
        <Route path="/CC/new" exact element={<AddCC/>}/>
        <Route path="/Customer" exact element={<Customers/>}/>
        <Route path="/Customer/create" exact element={<RegisterCustomer/>}/>
        <Route path="/Customer/update/:id" exact element={<UpdateCustomer/>}/>
        <Route path="/Customer/view/:id" exact element={<ViewCustomer/>}/>
        <Route path="/AssignDelivery" exact element={<AssignmentDelivery/>}/>
        <Route path="/Cart" exact element={<Cart/>}/>
        <Route path="/offpay" exact element={<Offpay/>}/>
        <Route path="/CC" exact element={<CC/>}/>
        
        <Route path="/AssignDelivery" exact element={<AssignmentDelivery/>}/>
        <Route path="/ProductList" exact element={<ProductList/>}/>
        <Route path="/ProductList/Details" exact element={<ProductDetails/>}/>
        <Route path="/Login" exact element={<LoginPage/>}/>
        <Route path="/Wholesalecustomer/create" exact element={<CreateWholesalecustomer/>}/>
        <Route path="/Wholesalecustomer" exact element={<Wholesalecustomer/>}/>
        <Route path="/Wholesalecustomer/update/:id" exact element={<UpdateWholesalecustomer/>}/>
        <Route path="/Employee/attendance" exact element={<MarkAttendance />}/>
        <Route path="/Salaryform" exact element={<SalaryCalculatorForm />}/>
        <Route path="/Login" exact element={<LoginPage/>}/>  
        <Route path="/Loader" exact element={<Loader/>}/>
      </Routes >
    </Router>
  );
};

export default App;
