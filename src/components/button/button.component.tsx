import { FC, ButtonHTMLAttributes } from 'react';// FC = Functional Component

import { BaseButton, 
    GoogleButton, 
    InvertedButton, 
    ButtonSpinner 
} from './button.styles';

export enum BUTTON_TYPE_CLASS {
    base= 'base',
    google= 'google-sign-in',
    inverted= 'inverted',
};

// if nothing is passed for buttonType, the default value is base button type
const getButton = (buttonType = BUTTON_TYPE_CLASS.base): typeof BaseButton =>
({
    [BUTTON_TYPE_CLASS.base]: BaseButton,
    [BUTTON_TYPE_CLASS.google]: GoogleButton,
    [BUTTON_TYPE_CLASS.inverted]: InvertedButton,
}[buttonType]);

export type ButtonProps = {
    buttonType?:BUTTON_TYPE_CLASS;
    isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, buttonType, isLoading = false, ...otherProps }) => {
    const CutomButton = getButton(buttonType);
    return <CutomButton disabled={isLoading} {...otherProps}> {isLoading? <ButtonSpinner/> : children}</CutomButton>;
};

export default Button;
/*
Types of buttons on site:
default,
inverted,
google Sign-in
*/