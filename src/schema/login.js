import * as Yup from 'yup';
export const loginSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .required('Please enter Email Address')
      .email('Please enter valid Email Address'),
    password: Yup.string().required('Please enter Password'),
  });

export const forgotPasswordSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .required('Please enter Email Address')
      .email('Please enter valid Email Address'),
  });
