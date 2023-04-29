import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";
import { 
    createUserDocumentFromAuth, 
    signInWithGooglePopup,
    signInAuthUserFromEmailandPassword
} from "../../utils/firebase/firebase.utils";

const DefaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(DefaultFormFields);
    const {email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(DefaultFormFields);
    }
    const signInwithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user); //we create a userDoc
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); //We prevent any default value from the form to be passed. We will handle everything related to the form
        try {
            await signInAuthUserFromEmailandPassword(email,password);
            resetFormFields();
        } catch (error) {
            switch(error.code){
                case 'auth/wrong-password':
                    alert("Incorrect password for email");
                    break;
                case 'auth/user-not-found':
                    alert("Incorrect/invalid email or password");
                    break;
                default:
                    console.log("Error from signing-in: ",error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;// "values" will come from the event.target object, values brought from the input tag - destructred into name and value

        setFormFields({ ...formFields, [name]: value });// We spread the formfield values and set one value to each component - displayName = JohnnyBoy
    };

    return (
        <div className="sign-in-container">
            <h2>Already have an account ?</h2>
            <span>
                Sign in using Email and Password
            </span>
            {/* name attribute is used in input tag to link the input tags value to the attribute in defaultFormFields object */}
            <form onSubmit={handleSubmit}>{/**on submit callback function is called when button of type submit is clicked */}
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
                <div className="buttons-container">
                    <Button buttonType={''} type='submit'>Sign In</Button>
                    <Button type='button' buttonType={'google'} onClick={signInwithGoogle}>Google Sign In</Button> {/**If type is button, no longer type submit by default --not bound to form rules */}
                </div>
            </form>
        </div>
    );
};

export default SignInForm;