import Form from "../../components/Form";

export default function Signup() {
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
            url={'http://localhost:4200/api/auth/signup'}
            title="Signup"
            submitBtn="Create account"
            formArr= {formArr}
            errorMessage="Mail already used."
            />
        </section>
    )
}