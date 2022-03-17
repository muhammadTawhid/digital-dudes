import './App.css';
import React, { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './component/Home/Home/Home';
import ManageService from './component/Dashboard/ManageService/ManageService';
import AddReview from './component/Dashboard/AddReview/AddReview';
import Admin from './component/Dashboard/Admin/Admin';
import NotFound from './component/Home/NotFound/NotFound';
import EditPricing from './component/Dashboard/EditPricing/EditPricing';
import Payment from './component/Home/Payment/Payment';
import Login from './component/Home/Login/Login';
import Subscription from './component/Dashboard/Subscription/Subscription';
import ActionPageForm from './component/Dashboard/ActionPageForm/ActionPageForm';
import PrivetRoute from './component/Home/PrivetRoute/PrivetRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({ name: "", email: "", imgUrl: "", admin: null })
  console.log(loggedInUser)
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="payment/:pricingId" element={<PrivetRoute><Payment /></PrivetRoute>} />
          <Route path="/dashboard/addService" element={<PrivetRoute><ActionPageForm /></PrivetRoute>} />
          <Route path="/dashboard/manageService" element={<PrivetRoute><ManageService /></PrivetRoute>} />
          <Route path="/dashboard/editPricing" element={<PrivetRoute><EditPricing /></PrivetRoute>} />
          <Route path="/dashboard/addAdmin" element={<PrivetRoute><Admin /></PrivetRoute>} />
          <Route path="/dashboard/subscription" element={<PrivetRoute><Subscription /></PrivetRoute>} />
          <Route path="/dashboard/addReview" element={<PrivetRoute><AddReview /></PrivetRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>

  );
}

export default App;
