import { FormInputLabel, Input, Group } from './form-input.styles';
//spread the other values in the input field as otherProps
const FormInput = ({ label, ...otherProps }) => {
    return (
        <Group>
            <Input {...otherProps} />
            {label && //if label exists
                (<FormInputLabel shrink={otherProps.value.length}>{label}</FormInputLabel>
                )}

        </Group>
    )
}
export default FormInput;