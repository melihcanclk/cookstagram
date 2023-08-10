export const FormFieldError = (props: Props) => {
    const { errors, fieldname, placeholder, min } = props;
    return (
        errors[fieldname]?.type === 'required' && <span className="error-msg">{placeholder} is required</span> ||
        errors[fieldname]?.type === 'minLength' && <span className="error-msg">Min length is {min}</span> ||
        errors[fieldname]?.type === 'validate' && <span className="error-msg">Passwords don't match</span> ||
        errors[fieldname]?.type === 'pattern' && <span className="error-msg">Invalid email pattern</span>
    )
}

export const Validate = (props: PasswordProps) => {
    const { errors } = props;
    return (

        errors.validate && <span className="error-msg">Passwords don't match</span>
    )
}