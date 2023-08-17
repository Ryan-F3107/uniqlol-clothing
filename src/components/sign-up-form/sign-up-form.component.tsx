import { useState, ChangeEvent, FormEvent } from "react";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button, {BUTTON_TYPE_CLASS} from "../button/button.component";
import { signUpStart } from "../../store/user/user.action";
import { useDispatch } from "react-redux";

const DefaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(DefaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const dispatch = useDispatch();
    const resetFormFields = () => {
        setFormFields(DefaultFormFields);
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); //We prevent any default value from the form to be passed. We will handle everything related to the form
        //confirm that confirmPassword & password is the same.
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();
        } catch (error) {
            if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert('Cannot create user, email already in use');
            } else {
                console.log("user creation error: ", error);
            }
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;// "values" will come from the event.target object, values brought from the input tag - destructred into name and value

        setFormFields({ ...formFields, [name]: value });// We spread the formfield values and set one value to each component - displayName = JohnnyBoy
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account ?</h2>
            <span>
                Sign up using Email and Password
            </span>
            {/* name attribute is used in input tag to link the input tags value to the attribute in defaultFormFields object */}
            <form onSubmit={handleSubmit}>{/**on submit callback function is called when button of type submit is clicked */}
                <FormInput
                    label={'Display name'}
                    type='text'
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                />

                <FormInput
                    label={'Email'}
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />

                <FormInput
                    label={'Password'}
                    type="password"
                    required onChange={handleChange}
                    name="password"
                    value={password}
                />

                <FormInput
                    label={'Confirm Password'}
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                />

                <Button buttonType={BUTTON_TYPE_CLASS.base} type='submit'>Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;