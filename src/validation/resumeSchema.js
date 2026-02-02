import * as yup from 'yup';

export const resumeSchema = yup.object({
  personalInfo: yup.object({
    fullName: yup.string().required('Full name is required'),
    jobTitle: yup.string(),
    phone: yup.string(),
    email: yup.string().email(),
    profileSummary: yup.string()
  }),
  education: yup.array().min(1, 'Education is required'),
  experience: yup.array().min(1, 'Experience is required'),
  competencies: yup.array().min(1, 'At least one competency required'),
  interests: yup.array().min(1, 'At least one interest required')
});
