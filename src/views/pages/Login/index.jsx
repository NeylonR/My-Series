import Form from "../../components/Form";

export default function Login() {
    const formArr = [
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
    ];

    return (
        <section>
            <Form 
            url={'http://localhost:4200/api/auth/login'}
            title="Login"
            submitBtn="Login"
            formArr= {formArr}
            errorMessage="Wrong email or/and password."
            formLogin={true}
            />
        </section>
    )
}