import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
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

 const handleSubmit = async (values, { resetForm }) => {
    const { email, password } = values;
    try {
      await dispatch(login({ email, password })).unwrap();
      toast.success('Log In successful!');
      resetForm();
    } catch (error) {
      toast.error(error.message || 'Log In failed');
    }
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
                      className={`${css.field} ${
                        meta.touched
                          ? meta.error
                            ? css.fieldError
                            : css.fieldValid
                          : ''
                      }`}
                      aria-invalid={meta.touched && meta.error ? 'true' : 'false'}
                    />
                    {meta.touched && meta.error && (
                      <span className={css.error}>{meta.error}</span>
                    )}
                  </>
                )}
              </Field>
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
                      className={`${css.field} ${
                        meta.touched
                          ? meta.error
                            ? css.fieldError
                            : css.fieldValid
                          : ''
                      }`}
                      aria-invalid={meta.touched && meta.error ? 'true' : 'false'}
                    />
                    {meta.touched && meta.error && (
                      <span className={css.error}>{meta.error}</span>
                    )}
                  </>
                )}
              </Field>
            </label>
            <button type="submit" className={css.btnReg} disabled={isSubmitting}>
              {isSubmitting ? 'Log In...' : 'Log In'}
            </button>
          </Form>
        )}
      </Formik>
    );
  }
  