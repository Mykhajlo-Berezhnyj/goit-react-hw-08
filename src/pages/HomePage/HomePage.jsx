import css from './HomePage.module.css';
import { WelcomeMessage } from '../../components/WelcomeMessage/WelcomeMessage';

export default function HomePage() {
  return (
    <>
      <title>Welcome to Phonebook 📞</title>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to Phonebook 📞</h1>
        <WelcomeMessage className={css.text} />
      </div>
    </>
  );
}
