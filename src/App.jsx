import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import ErrorBoundary from './errorHandling/ErrorBoundary';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import Home from './components/Home/Home';
import Food from './components/Food/Food';
import Stay from './components/Stay/Stay';
import Cafe from './components/Cafe/Cafe';
import Services from './components/Services/Services';
import Account from './components/Account/Account';
import CreateTicketFullPage from './components/Home/CreateTicketsPage/CreateTicketFullPage';
//import ActiveTickets from './components/Home/ActiveTickets';
import TicketListFullPage from './components/Home/AllTicketsListPage/TicketListFullPage';
import IndividualTicketPage from './components/Home/IndividualTicketsViewPage/IndividualTicketPage';
import OrderHistoryPage from './components/Cafe/OrderHistory/OrderHistoryPage'; // Import the HistoryPage component
import ProfilePage from './components/Account/Profile/ProfilePage';
import KnowledgeCentre from './components/Account/KC/KnowledgeCentre';
import Feedback from './components/Account/Feedback/Feedback';
//import TicketSuccessPage from './components/Home/TicketSuccessPage';

import AdminNoticePage from './components/AdminPages/AdminNoticePage/AdminNoticePage';
import AdminAccount from './components/AdminPages/AdminAccount/AdminAccount';
import ProtectedRoute from './components/AdminPages/PageProtection/ProtectedRoute';
import TopNavigationBar from './components/Navigation/TopNavigationBar';
import AdminTopNavigationBar from './components/AdminPages/AdminNavigation/AdminTopNavigationBar';
import './App.css';

import Chat from './errorHandling/Chat'; // Corrected the import path for the Chat component

function App() {
  return (
    <Router>
      <div className="app-wrapper"> {/* ADDED: Wrapper div for centering */}
        {/* If a component fails to render, the ErrorBoundary will catch the error and display a message instead of showing a blank page. */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} /> {/* Default route */}

            {/* User Pages */}
            <Route path="/home" element={ <ProtectedRoute allowedRoles={['RESIDENT']}> <Home /> </ProtectedRoute> } />
            <Route path="/food" element={ <ProtectedRoute allowedRoles={['RESIDENT']}> <Food /> </ProtectedRoute> } />
            <Route path="/stay" element={ <ProtectedRoute allowedRoles={['RESIDENT']}> <Stay /> </ProtectedRoute> } />
            <Route path="/cafe" element={ <ProtectedRoute allowedRoles={['RESIDENT']}> <Cafe /> </ProtectedRoute> } />
            <Route path="/services" element={ <ProtectedRoute allowedRoles={['RESIDENT']}> <Services /> </ProtectedRoute> } />
            <Route path="/account" element={ <ProtectedRoute allowedRoles={['RESIDENT']}> <Account /> </ProtectedRoute> } />
            <Route path="/create-ticket-full-page" element={ <ProtectedRoute allowedRoles={['RESIDENT']}> <CreateTicketFullPage /> </ProtectedRoute> } />
            <Route path="/order-history" element={ <ProtectedRoute allowedRoles={['RESIDENT']}> <OrderHistoryPage /> </ProtectedRoute> } />
            
            {/* Admin Pages */}
            <Route path="/admin-notice-page" element={ <ProtectedRoute allowedRoles={['ADMIN']}> <AdminNoticePage /> </ProtectedRoute> }/>
            <Route path="/admin-account" element={ <ProtectedRoute allowedRoles={['ADMIN']}> <AdminAccount /> </ProtectedRoute> }/>

            {/* Common Pages */}
            {/* Render the navigation bar according to the userRole - Admin or resident */}
            <Route path="/profile" element={ <ProtectedRoute allowedRoles={['RESIDENT', 'ADMIN']}>
                  <ProfilePage NavigationBar={ location.state?.NavigationBar === 'AdminTopNavigationBar' ? AdminTopNavigationBar: TopNavigationBar} /> </ProtectedRoute> } />
            <Route path="/knowledge-centre" element={ <ProtectedRoute allowedRoles={['RESIDENT', 'ADMIN']}>
                  <KnowledgeCentre NavigationBar={ location.state?.NavigationBar === 'AdminTopNavigationBar' ? AdminTopNavigationBar: TopNavigationBar} /> </ProtectedRoute> } />
            <Route path="/feedback" element={ <ProtectedRoute allowedRoles={['RESIDENT', 'ADMIN']}>
                  <Feedback NavigationBar={ location.state?.NavigationBar === 'AdminTopNavigationBar' ? AdminTopNavigationBar: TopNavigationBar} /> </ProtectedRoute> } />
            <Route path="/ticket-list-full-page" element={ <ProtectedRoute allowedRoles={['RESIDENT', 'ADMIN']}>
                  <TicketListFullPage NavigationBar={ location.state?.NavigationBar === 'AdminTopNavigationBar' ? AdminTopNavigationBar: TopNavigationBar} /> </ProtectedRoute> } />
            <Route path="/ticket/:id" element={ <ProtectedRoute allowedRoles={['RESIDENT', 'ADMIN']}>
                  <IndividualTicketPage NavigationBar={ location.state?.NavigationBar === 'AdminTopNavigationBar' ? AdminTopNavigationBar: TopNavigationBar} /> </ProtectedRoute> } />

            {/* <Test Pages> */}
            <Route path="/test" element={<Chat />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;