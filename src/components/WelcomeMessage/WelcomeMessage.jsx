import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import css from './WelcomeMessage.module.css';

export const WelcomeMessage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <p>
      Save your contacts securely.{' '}
      {isLoggedIn ? (
        <>
          To manage your contacts, go to the{' '}
          <Link to="/contacts" className={css.link}>
            contacts page
          </Link>
          . 📇
        </>
      ) : (
        <>
          <Link to="/register" className={css.link}>
            Register
          </Link>{' '}
          or{' '}
          <Link to="/login" className={css.link}>
            log in
          </Link>{' '}
          to get started. 💁‍♀️
        </>
      )}
    </p>
  );
};
