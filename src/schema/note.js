import * as Yup from 'yup';
export const noteSchema = () =>
  Yup.object().shape({
    notes: Yup.string().required('Please enter notes'),
  });
