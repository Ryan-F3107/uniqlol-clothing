import { useState } from "react";

const DefaultFormFields =  {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(DefaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;
    console.log("FormFields: ", formFields);
    const handleChange = (event) =>{
        const {name, value} = event.target;// "values" will come from the event.target object, values brought from the input tag - destructred into name and value

        setFormFields({...formFields,[name]: value});// We spread the formfield values and set one value to each component - displayName = JohnnyBoy
    };

    return (
        <div>
            <h1>
                Sign up using Email and Password
            </h1>
            {/* name attribute is used in input tag to link the input tags value to the attribute in defaultFormFields object */}
            <form onSubmit={() =>{}}>
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