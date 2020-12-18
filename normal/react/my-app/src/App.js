import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom'

import Header from './components/Header/Header'
import NavBar from './components/NavBar/NavBar'
import Profile from './components/Profile/Profile'
import Users from './components/Users/Users'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import UsersContainer from './components/Users/UsersContainer'

const App = (props) => {
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Header />
        <NavBar />
        <div>
          <Route path='/dialogs' render={() => <DialogsContainer /*store={props.store}*/ />} />
          <Route path='/profile' render={() => <Profile /*store={props.store}*/ />} />
          <Route path='/users' render={() => <UsersContainer />} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
