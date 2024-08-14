import * as Yup from 'yup';
export const calendarSchema = () =>
  Yup.object().shape({
    startDate: Yup.date().required('Please enter state date'),
    endDate: Yup.date()
      .min(Yup.ref('startDate'), 'End date must be later than start date')
      .required('Please enter end-date'),
    // startDate: Yup.string().required('Please enter state date'),
    // endDate: Yup.string().required('Please enter end-date'),
    notes: Yup.string().required('Please enter note'),
  });
