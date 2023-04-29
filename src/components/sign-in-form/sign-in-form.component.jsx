import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";

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

    const handleSubmit = async (event) => {
        event.preventDefault(); //We prevent any default value from the form to be passed. We will handle everything related to the form
        try {
            resetFormFields();
        } catch (error) {
            
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;// "values" will come from the event.target object, values brought from the input tag - destructred into name and value

        setFormFields({ ...formFields, [name]: value });// We spread the formfield values and set one value to each component - displayName = JohnnyBoy
    };

    return (
        <div>
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
                <Button buttonType={''} type='submit'>Sign In</Button>
            </form>
        </div>
    );
}

export default SignInForm;