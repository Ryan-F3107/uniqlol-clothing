import { FormInputLabel, Input, Group } from './form-input.styles';
import { InputHTMLAttributes, FC } from 'react';
//spread the other values in the input field as otherProps
type FormInputProps = { label: string} & InputHTMLAttributes<HTMLInputElement>;
const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
    return (
        <Group>
            <Input {...otherProps} />
            {label && //if label exists
                (<FormInputLabel shrink={Boolean(
                    otherProps.value && 
                    typeof otherProps.value == 'string' && 
                    otherProps.value.length)}>{label}
                </FormInputLabel>
                )}

        </Group>
    )
}
export default FormInput;