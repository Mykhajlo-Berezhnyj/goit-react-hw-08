import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectIsLoading, selectContacts } from '../../redux/contacts/selectors';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/contacts/operations';
import ContactForm from '../../components/ContactForm/ContactForm';
import SearchBox from '../../components/SearchBox/SearchBox';
import ContactList from '../../components/ContactList/ContactList';
import { Loader } from '../../components/Loader/Loader';
import toast from 'react-hot-toast';
import { selectIsRefreshing } from '../../redux/auth/selectors';

export default function ContactsPage() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    if (error && !isRefreshing) {
      toast.error(error);
    }
  }, [error, isRefreshing]);

  return (
    <div className="container">
      {isLoading && <Loader />}
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
}
