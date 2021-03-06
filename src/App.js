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
import Sidebar from './component/Dashboard/Sidebar/Sidebar';
import { useEffect } from 'react';

export const UserContext = createContext();

function App() {
  const [sidebar, setSidebar] = useState(true);
  const newLoggedInUser = localStorage.getItem("newLoggedInUser")
  const [loggedInUser, setLoggedInUser] = useState({ name: "", email: "", imgUrl: "", admin: null })

  console.log(loggedInUser, "i am from app js")

  useEffect(() => {
    if (newLoggedInUser) {
      setLoggedInUser(JSON.parse(newLoggedInUser))
    }
    else {
      setLoggedInUser({ name: "", email: "", imgUrl: "", admin: null })
    }
  }, [])

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser, sidebar, setSidebar]}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="payment/:pricingId" element={<PrivetRoute><Payment /></PrivetRoute>} />
          <Route path="/dashboard/service/editService/:serviceUpdateId" element={<PrivetRoute><ActionPageForm /></PrivetRoute>} />
          <Route path="/dashboard/service/addService" element={<PrivetRoute><ActionPageForm /></PrivetRoute>} />
          <Route path="/dashboard/manageService" element={<PrivetRoute><ManageService /></PrivetRoute>} />
          <Route path="/dashboard/editPricing" element={<PrivetRoute><EditPricing /></PrivetRoute>} />
          <Route path="/dashboard/addAdmin" element={<PrivetRoute><Admin /></PrivetRoute>} />
          <Route path="/dashboard/subscription" element={<PrivetRoute><Subscription /></PrivetRoute>} />
          <Route path="/dashboard/addReview" element={<PrivetRoute><AddReview /></PrivetRoute>} />
          <Route path="/dashboard/addReview" element={<PrivetRoute><Sidebar /></PrivetRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>

  );
}

export default App;
