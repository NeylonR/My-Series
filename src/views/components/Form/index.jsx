import { FormStyle, FormTitleStyle, InputStyle, LabelStyle, InputContainerStyle , ErrorMessageStyle} from "../../../utils/style/FormStyle";
import { Button } from "../../../utils/style/GlobalStyle";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logout, signupUser } from "../../../features/user";
import { selectUser } from "../../../utils/selector";

export default function Form({ url, title, formArr, submitBtn, formLogin }) {
    //make an object with each key being the name of the input with an empty string as its value
    const prepareForm = (formArr) => {
        return formArr.reduce((r, v) => ({ ...r, [v.name]: "" }), {});
    };

    const initialForm = prepareForm(formArr)
    const [form, setForm] = useState(initialForm);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    //desctructure previous state and use it to change the correct key of the form with the actual input's value
    const onChangeHandler = (e) => setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value}));
    // some validation + errors
    const validate = (values) => {
        const errors = {};
        const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if(!values.email) {
            errors.email = "Email is required."
        } else if(!regexEmail.test(values.email)){
            errors.email = "Invalid email format.";
        }
        if(!values.password) {
            errors.password = "Password is required.";
        } else if(values.password.length < 4 || values.password.length > 15){
            errors.password = "Password must contains between 4 and 15 characters.";
        }
        return errors;
    }
    // console.log(user)
    function handleSubmit(){
        setFormErrors(validate(form));
        setIsSubmit(true);
    };
    
    // POST to create an account or login, according to the props 
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            if(formLogin){
                dispatch(loginUser({...form}))
            } else {
                dispatch(signupUser({...form}))
            };
            if(user.status === 'resolved') {
                setForm(initialForm);
                navigate(from, { replace: true});
            }
            if(user.error){
                setIsSubmit(false);
            }
        } 
        setIsSubmit(false);
    }, [formErrors]);

    useEffect(() => {
        dispatch(logout());
    }, [])

    return (
        <FormStyle onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
            <FormTitleStyle>{formLogin ? 'Login' : 'Signup'}</FormTitleStyle>
            {formArr.map(({label, name, type, placeholder}, index) => (
                <InputContainerStyle key={label + index}>
                    <LabelStyle htmlFor={name} >{label}</LabelStyle>
                    <InputStyle 
                        id={name}
                        type={type} 
                        name={name} 
                        placeholder={placeholder} 
                        autoComplete="off"
                        value={form[name]} 
                        onChange={(e)=>onChangeHandler(e)} 
                        required={true}
                    />
                    {formErrors[name] && (
                        <ErrorMessageStyle>{formErrors[name]}</ErrorMessageStyle>
                    )}
                </InputContainerStyle>
            ))}
            {user.data?.message && <p>{user.data?.message}</p>}
            {user.error && <ErrorMessageStyle>{user.error}</ErrorMessageStyle>}
            <Button type="submit" disabled={isSubmit}>{submitBtn}</Button>
        </FormStyle>
    )
}

Form.defaultProps = {
    title: "Signup",
    formArr: [
        {
            label: "Email",
            name: "email",
            type: "email", 
            placeholder: "Type your email"
        },
        {
            label: "Password",
            name: "password",
            type: "password", 
            placeholder: "Type your password"
        },
    ],
    submitBtn: "Create account",
    errorMessage: "Error.",
    formLogin: false
};

Form.propTypes = {
    title: PropTypes.string.isRequired,
    formArr: PropTypes.arrayOf(
        PropTypes.shape(
            {
                label: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired, 
                placeholder: PropTypes.string.isRequired
            },
            {
                label: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired, 
                placeholder: PropTypes.string.isRequired
            }
        ).isRequired
    ).isRequired,
    submitBtn: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired
};