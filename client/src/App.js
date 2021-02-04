import './App.scss';

// Start Importing components
import Sidebar from './component/sidebar/sidebar.component'
import Topbar from './component/topbar/topbar.component'
import AddItem from './component/addItem/addItem.component'
import FulfillPage from './page/fulfillpage/fulfill.page';
import Verification from './component/verification/verification.component'
import AddUser from './component/addUser/adduser.component'
import DeleteUser from './component/deleteUser/deleteuser.component'
import RequestItemComponent from './component/requestItem/requestitem.component'
// End Importing components

// Start importing page components
import HomePage from './page/homepage/home.page'
import LoginPage from './page/loginpage/login.page';
import RequestItemPage from './page/requestitempage/request_item.page';
import RequestListPage from './page/requestlistpage/requestlist.page';
import StoreListPage from './page/storelistpage/storelist.page';
import UserManagementPage from './page/usermanagementpage/usermanagement.page'
// End importing page components

// Start Importing React Router
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import EditItemPage from './page/edititempage/edititem.page';
// End Importing React Router

import { connect } from 'react-redux'

const App = ({ isLoggedIn }) => {
  
  return (
    <Router>
      <div className="App">
      <AddItem />
      <AddUser />
      <DeleteUser />
      <Verification />
      <RequestItemComponent />
      <Route path='/login'>
        <LoginPage />
      </Route>
      {
        isLoggedIn ?
        <div className='App-content'>
          <Sidebar className='sidebar-main'/>
          <Topbar className='topbar-main'/>
          <div className='main'>
              <Route exact path='/'>
                <HomePage />
              </Route>
              <Route path='/request_item'>
                <RequestItemPage />
              </Route>
              <Route path='/fulfill/:request_id'>
                <FulfillPage />
              </Route>
              <Route path='/request_list'>
                <RequestListPage />
              </Route>
              <Route path='/user_management'>
                <UserManagementPage />
              </Route>
              <Route path='/store_list'>
                <StoreListPage />
              </Route>
              <Route path='/history'>
                <RequestListPage />
              </Route>
              <Route path='/edit/:item_id'>
                <EditItemPage />
              </Route>
          </div>
        </div>
        :              
        <Redirect to="/login"/>
      }
      </div>
    </Router>
  );
}

const mapStateToProps = state => ({
  profile: state.UserReducer.profile,
  isLoggedIn: state.UserReducer.isLoggedIn
})

export default connect(mapStateToProps)(App);
