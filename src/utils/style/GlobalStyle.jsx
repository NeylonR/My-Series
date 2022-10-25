import styled,{createGlobalStyle} from 'styled-components';
import {flex} from './mixins';
import colors from './colors';

export const StyledGlobalStyle = createGlobalStyle`
    * {
        list-style-type: none;
        padding: 0;
        margin:0;
        text-decoration: none;
        box-sizing: border-box;
        font-family: Roboto, 'Trebuchet MS', Helvetica, sans-serif;
    }
    body {
        font-size: 16px;
        text-align:center;
    }
    main{
        min-height: 90vh;
        ${flex({ just : 'flex-start', align : 'center', direction : 'column'})};
        padding: 4em 2em;
        word-break:break-word;
    }
    section{
        ${flex({align:"center", direction:"column"})};
        gap:1em;
        word-break:break-word;
    }
    button{
        font-size: 14px;
    }
    input{
        font-size: 16px;
    }
`;

export const Button = styled.button`
margin-bottom: 1em;
    padding: .6em 1em;
    border-radius: 7px;
    border: 1px solid white;
    background-color: ${colors.fourth};
    cursor: pointer;
    transition: ease-in-out .3s all;
    &:hover:not(:disabled){
        background-color: ${colors.third};
        border:1px solid white;
        // color: white;
    }
`;