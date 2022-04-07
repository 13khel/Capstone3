import AppNavbar from './components/AppNavbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Footer from './components/Footer';
import './App.css';
import {UserProvider} from './UserContext';
import {initialState, reducer} from './reducer/UserReducer';
import {useReducer} from 'react';
import AdminDashboard from './pages/AdminProductDashboard';
import Accounts from './pages/AdminUserDash';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/AdminEditProd';
import AllOrders from './pages/AdminOrders';
import Home from './pages/Home';
import Logout from './pages/Logout';
import NotFoundPage from './pages/NotFoundPage';
import Products from './pages/UserProducts'
import { Container } from 'react-bootstrap';
import ProductDetail from './pages/ProductDetail';
import UserCart from './pages/UserCart';
import UserOrders from './pages/UserOrders';
import UserProfile from './pages/UserDetails';
import OrderDetails from './pages/OrderDetails';

function App() {

  const [state, dispatch] = useReducer(reducer,initialState)

  return (
    <UserProvider value ={{state, dispatch}}>
      <BrowserRouter>
        <Container id="container">
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Home/>}/>     
          <Route path="/products" element={<Products/>}/>
          <Route path="/products/:productId" element={ <ProductDetail/> } />
          <Route path="/user/profile" element={<UserProfile/>}/> 
          <Route path="/user/myCart" element={<UserCart/>}/>
          <Route path="/user/myOrders" element={<UserOrders/>}/>
          <Route path="/user/myOrders/:orderId" element={ <OrderDetails/> } />
          <Route path="/admin/products" element={<AdminDashboard/>}/>
          <Route path="/admin/products/add" element={<AddProduct/>}/>
          <Route path="/admin/products/:productId" element={<EditProduct/>}/>
          <Route path="/admin/accounts" element={<Accounts/>}/>
          <Route path="/admin/orders" element={<AllOrders/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes> 
        </Container>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  )
}

export default App;
