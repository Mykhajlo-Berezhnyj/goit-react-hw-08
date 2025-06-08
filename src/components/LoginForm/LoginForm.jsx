import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import css from './LoginForm.module.css';

export default function LoginForm() {
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Not valid email').required('Field is required'),
    password: Yup.string()
      .matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/)
      .required('Field is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(login(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <label className={css.label}>
            Email
            <Field name="email">
              {({ field, meta }) => (
                <>
                  <input
                    {...field}
                    type="email"
                    placeholder="Enter email"
                    aria-label="Enter email"
                    className={
                      meta.touched && meta.error ? css.fieldError : css.field
                    }
                    aria-invalid={meta.touched && meta.error ? 'true' : 'false'}
                  />
                  {meta.touched && meta.error && (
                    <span className={css.error}>{meta.error}</span>
                  )}
                </>
              )}
            </Field>
            <ErrorMessage className={css.error} name="email" component="span" />
          </label>

          <label className={css.label}>
            Password
            <Field name="password">
              {({ field, meta }) => (
                <>
                  <input
                    {...field}
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    aria-label="Enter password"
                    className={
                      meta.touched && meta.error ? css.fieldError : css.field
                    }
                    aria-invalid={meta.touched && meta.error ? 'true' : 'false'}
                  />
                  {meta.touched && meta.error && (
                    <span className={css.error}>{meta.error}</span>
                  )}
                </>
              )}
            </Field>
            <ErrorMessage
              className={css.error}
              name="password"
              component="span"
            />
          </label>

          <button type="submit" className={css.btn} disabled={isSubmitting}>
            {isSubmitting ? ' Login...' : 'Login'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
