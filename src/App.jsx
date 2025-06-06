import ContactList from './components/ContactList/ContactList';
import SearchBox from './components/SearchBox/SearchBox';
import ContactForm from './components/ContactForm/ContactForm';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './App.css';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from './redux/contactsOps';

function App() {
  const dispatch = useDispatch();
useEffect(()=> {
  dispatch(fetchContacts());
}, [dispatch])

  return (
    <div className="container">
      <Toaster position="top-left" />
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
}

export default App;
