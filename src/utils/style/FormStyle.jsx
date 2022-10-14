import styled from "styled-components";
import { flex } from "./mixins";
import colors from "./colors";

export const FormStyle = styled.form`
    ${flex({direction:'column'})};
    width: 30%;
    min-width: 400px;
    padding: 2em .5em;
    border-radius: 7px;
    background-color: ${colors.secondary};
`;

export const FormTitleStyle = styled.h2`
    margin-bottom: 1em;
    text-decoration: underline 2px black;
`;

export const LabelStyle = styled.label`
    font-weight: 600;
    padding-bottom: .1em;
`;

export const InputStyle = styled.input`
    padding: .7em;
    border: none;
    outline: none;
    border-radius: 7px;
    margin-bottom: 1em;
    &:last-of-type{
        margin-bottom: 1.5em;
    }
`;

export const InputContainerStyle = styled.div`
    ${flex({direction:'column'})};
`;

export const ErrorMessageStyle = styled.p`
    color: ${colors.error};
    font-weight: 600;
    margin-bottom: 1em;
`;
