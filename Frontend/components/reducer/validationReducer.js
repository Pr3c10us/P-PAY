'use client';
import * as yup from 'yup';

const passwordRules =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

export const validationSchema = yup.object().shape({
    'FIRST NAME': yup
        .string()
        .required('First name is required')
        .min(1, 'must be more than "one" character')
        .max(30, 'must be more less than "thirty" character'),
    'LAST NAME': yup
        .string()
        .required('Last name is required')
        .min(1, 'must be more than "one" character')
        .max(30, 'must be more less than "thirty" character'),
    USERNAME: yup
        .string()
        .required('Username is required')
        .min(1, 'must be more than "one" character')
        .max(30, 'must be more less than "thirty" character'),
    'EMAIL ADDRESS': yup
        .string()

        .email('Please provide a valid EMAIL ADDRESS')
        .required('Email is required'),
    'PHONE NUMBER': yup
        .string()
        .required('Phone number is required')
        .min(11, 'must be "Eleven" character')
        .max(11, 'must be "Eleven" character'),
    PASSWORD: yup
        .string()
        .required('Password is required')
        .min(8)
        .matches(
            passwordRules,
            'Password must contain at least 8 characters, one uppercase, one number and one special case character'
        ),
    'CONFIRM PASSWORD': yup
        .string()
        .required('Confirm password is required')
        .oneOf([yup.ref('PASSWORD'), null], 'Passwords must match'),
    // BVN: yup.number().required('BVN is required'),
    'DATE OF BIRTH': yup
        .date()
        .transform(function (value, originalValue) {
            if (this.isType(value)) {
                return value;
            }
            const result = parse(originalValue, 'dd.MM.yyyy', new Date());
            return result;
        })
        .typeError('please enter a valid date')
        .required()
        .max(new Date(), 'Date of birth cannot be in the future'),
    // PIN: yup
    //     .number()
    //     .min(4, 'must be "Four" character')
    //     .max(4, 'must be "Four" character'),
});
