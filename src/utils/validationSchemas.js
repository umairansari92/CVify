import * as yup from 'yup';

export const personalInfoSchema = yup.object().shape({
  firstName: yup.string().required('First name is required').min(2, 'Too short'),
  lastName: yup.string().required('Last name is required'),
  phoneNumber: yup.string().nullable(),
  location: yup.string().nullable(),
});

export const brandingSchema = yup.object().shape({
  username: yup.string().required('Username is required').matches(/^[a-zA-Z0-9_-]+$/, 'Invalid characters'),
  headline: yup.string().nullable(),
  identityLabel: yup.string().nullable(),
  availability: yup.string().oneOf(['Open to Work', 'Freelance Available', 'Available for Internship', 'Currently Employed', 'Not Available']),
  industry: yup.string().required('Industry is required'),
});

export const socialLinksSchema = yup.object().shape({
  linkedin: yup.string().url('Invalid URL').nullable().transform((v) => (v === "" ? null : v)),
  github: yup.string().url('Invalid URL').nullable().transform((v) => (v === "" ? null : v)),
  twitter: yup.string().url('Invalid URL').nullable().transform((v) => (v === "" ? null : v)),
  portfolio: yup.string().url('Invalid URL').nullable().transform((v) => (v === "" ? null : v)),
});

export const experienceSchema = yup.object().shape({
    company: yup.string().required('Company is required'),
    role: yup.string().required('Role is required'),
    startDate: yup.string().required('Start date is required'),
    endDate: yup.string().when('isCurrent', {
        is: false,
        then: (schema) => schema.required('End date is required'),
        otherwise: (schema) => schema.nullable(),
    }),
    isCurrent: yup.boolean(),
    achievements: yup.string().nullable(),
});

export const educationSchema = yup.object().shape({
    institution: yup.string().required('Institution is required'),
    degree: yup.string().required('Degree is required'),
    fieldOfStudy: yup.string().nullable(),
    graduationDate: yup.string().required('Graduation date is required'),
    description: yup.string().nullable(),
});

export const serviceSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().nullable(),
});

export const projectSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    image: yup.string().nullable(),
    link: yup.string().url('Invalid URL').nullable().transform((v) => (v === "" ? null : v)),
    githubLink: yup.string().url('Invalid URL').nullable().transform((v) => (v === "" ? null : v)),
    isFeatured: yup.boolean(),
});

export const securitySchema = yup.object().shape({
    currentPassword: yup.string().required('Current password is required'),
    newPassword: yup.string()
        .required('New password is required')
        .min(7, 'Minimum 7 characters')
        .matches(/[A-Z]/, 'One uppercase required')
        .matches(/[0-9]/, 'One number required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm your password'),
});

export const awardSchema = yup.object().shape({
    title: yup.string().required('Award title is required'),
    issuer: yup.string().required('Issuer is required'),
    date: yup.string().required('Date is required'),
    description: yup.string().nullable(),
});

export const certificationSchema = yup.object().shape({
    name: yup.string().required('Certification name is required'),
    issuer: yup.string().required('Issuer is required'),
    date: yup.string().required('Date is required'),
    link: yup.string().url('Invalid URL').nullable().transform((v) => (v === "" ? null : v)),
    description: yup.string().nullable(),
});

export const languageSchema = yup.object().shape({
    name: yup.string().required('Language name is required'),
    proficiency: yup.string().oneOf(['Native', 'Beginner', 'Professional', 'Advanced'], 'Invalid proficiency').required('Proficiency is required'),
});
