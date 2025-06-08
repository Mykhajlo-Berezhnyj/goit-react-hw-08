import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <>
      <title>Welcome to Phonebook 📞</title>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to Phonebook 📞</h1>
        <p className={css.text}>
          Save your contacts securely. Register or log in to get started.
          <span role="img" aria-label="Greeting icon">
            💁‍♀️
          </span>
        </p>
      </div>
    </>
  );
}
