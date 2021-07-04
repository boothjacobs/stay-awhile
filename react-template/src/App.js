import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Splash from "./components/user-auth/Splash";
import LoginForm from "./components/user-auth/LoginForm";
import SignUpForm from "./components/user-auth/SignUpForm";
import NavBar from "./components/navigation/NavBar";
import ProtectedRoute from "./components/user-auth/ProtectedRoute";
import Home from "./components/user-auth/Home";
import RanchDetails from "./components/RanchSide/RanchDetails";
import RanchProfile from "./components/GuestSide/RanchProfile";
import AddCabin from "./components/RanchSide/Cabins/AddCabin";
import SearchResults from "./components/GuestSide/SearchResults";
import BookingsPage from "./components/GuestSide/Bookings/BookingsPage";
import MyInvoices from "./components/GuestSide/Invoices/MyInvoicesPage";
import MyReviews from "./components/GuestSide/Reviews/MyReviews";
import { authenticate } from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      dispatch(authenticate());
      //prevents page load if user is unauthorized
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact={true}>
          <Splash />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/signup" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/home" exact={true} >
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path="/staff/profile" exact={true} >
          <RanchDetails />  {/* "back of house" ranch profile page with edit access */}
        </ProtectedRoute>
        <ProtectedRoute path="/staff/lodgings" exact={true}>
          <AddCabin />
        </ProtectedRoute>
        <Route path="/destination/:id" exact={true} >
          <RanchProfile />  {/* guest facing ranch profile page */}
        </Route>
        <Route path="/destinations" exact={true} >
          <SearchResults />
        </Route>
        <ProtectedRoute path="/guest/bookings" exact={true}>
          <BookingsPage />
        </ProtectedRoute>
        <ProtectedRoute path="/guest/invoices" exact={true}>
          <MyInvoices />
        </ProtectedRoute>
        <ProtectedRoute path="/guest/reviews" exact={true}>
          <MyReviews />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
