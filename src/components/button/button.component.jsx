/*
Types of buttons on site:
default,
inverted,
google Sign-in
*/
import { BaseButton, 
    GoogleButton, 
    InvertedButton, 
    ButtonSpinner 
} from './button.styles';

export const BUTTON_TYPE_CLASS = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted',
};

// if nothing is passed for buttonType, the default value is base button type
const getButton = (buttonType = BUTTON_TYPE_CLASS.base) =>
({
    [BUTTON_TYPE_CLASS.base]: BaseButton,
    [BUTTON_TYPE_CLASS.google]: GoogleButton,
    [BUTTON_TYPE_CLASS.inverted]: InvertedButton,
}[buttonType]);

const Button = ({ children, buttonType, isLoading = false, ...otherProps }) => {
    const CutomButton = getButton(buttonType);
    return <CutomButton disabled={isLoading} {...otherProps}> {isLoading? <ButtonSpinner/> : children}</CutomButton>;
};

export default Button;