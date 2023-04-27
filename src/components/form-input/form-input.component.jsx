import './form-input.styles.scss';
//spread the other values in the input field as otherProps
const FormInput = ({label, ...otherProps}) => {
    return(
        <div className="group">
            <input className="form-input" {...otherProps}/>
            { label && //if label exists
            (<label className={`${otherProps.value.length ? 'shrink': ''} form-input-label`}>{label}</label>
            )}

        </div>
    )
}
export default FormInput;