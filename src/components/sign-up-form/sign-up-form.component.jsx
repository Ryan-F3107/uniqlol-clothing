import { useState } from "react";
import { createAuthUserFromEmailandPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const DefaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(DefaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () =>{
        setFormFields(DefaultFormFields);
    }

    const handleSubmit = async (event) => {
        console.log("Handle Submit ran")
        event.preventdefault(); //We prevent any default value from the form to be passed. We will handle everything related to the form
        //confirm that confirmPassword & password is the same.
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const { user } = createAuthUserFromEmailandPassword(email, password);
            console.log('user: ',user)
            await createUserDocumentFromAuth(user, { displayName })
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.log("user creation error: ", error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;// "values" will come from the event.target object, values brought from the input tag - destructred into name and value

        setFormFields({ ...formFields, [name]: value });// We spread the formfield values and set one value to each component - displayName = JohnnyBoy
    };

    return (
        <div>
            <h1>
                Sign up using Email and Password
            </h1>
            {/* name attribute is used in input tag to link the input tags value to the attribute in defaultFormFields object */}
            <form onSubmit={handleSubmit}>
                <label>Display name</label>
                <input type='text' required onChange={handleChange} name="displayName" value={displayName} />

                <label>Email</label>
                <input type="email" placeholder="johndoe@gswan.com" required onChange={handleChange} name="email" value={email} />

                <label>Password</label>
                <input type="password" required onChange={handleChange} name="password" value={password} />

                <label>Confirm Password</label>
                <input type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;