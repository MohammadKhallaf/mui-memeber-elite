import * as Yup from 'yup';
import { EGender, EMmemberShipType } from './members.modal';

const memberSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z0-9]*$/, 'Name must be alphanumeric characters only')
    .required('Name is required'),

  email: Yup.string().email('Email must be a valid email format').required('Email is required'),

  phone: Yup.string()
    .test(
      'phone-number',
      'Phone must be a valid phone number format',
      (value) => value && /^\+?[0-9]\d{1,11}$/.test(value)
    )
    .required('Phone is required'),

  photo_url: Yup.string().url().notRequired(),

  is_newsletter_subscribe: Yup.boolean().notRequired(),

  id_number: Yup.string()
    .test(
      'id-number',
      'ID Number must be exactly 14 digits',
      (value) => value && /^[0-9]{14}$/.test(value)
    )
    .required('ID Number is required'),

  gender: Yup.mixed<EGender>()
    .oneOf(Object.values(EGender), 'Invalid gender option')
    .required('Gender is required'),

  address: Yup.string().required('Address is required'),

  date_of_birth: Yup.date().required('Date of Birth is required'),

  membership_type: Yup.mixed<EMmemberShipType>()
    .oneOf(Object.values(EMmemberShipType), 'Invalid membership type')
    .required('Membership Type is required'),

  membership_start_date: Yup.date()
    .required('Membership Start Date is required')
    .typeError('Membership Start Date must be a valid date'),
});

export default memberSchema;
