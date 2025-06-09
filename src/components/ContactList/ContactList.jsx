import css from './ContactList.module.css';
import Contact from '../Contact/Contact';
import { useSelector } from 'react-redux';
import { Loader } from '../Loader/Loader';
import { selectIsLoading, selectError } from '../../redux/contacts/selectors';
import { selectFilteredContacts } from '../../redux/contacts/slice';

export default function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts) || [];
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  return (
    <div>
      {isLoading && <p>Loader</p>}
      {error && <p>error</p>}
      {filteredContacts.length > 0 ? (
        <p className={css.infoQuery}>
          Found {filteredContacts.length}{' '}
          {filteredContacts.length === 1 ? 'contact' : 'contacts'}
        </p>
      ) : (
        <p className={css.infoQuery}>Enter a search query to find a contact</p>
      )}
      <ul className={css.list}>
        {filteredContacts.map(contact => (
          <li className={css.item} key={contact.id}>
            <Contact contact={contact} />
          </li>
        ))}
      </ul>
    </div>
  );
}
