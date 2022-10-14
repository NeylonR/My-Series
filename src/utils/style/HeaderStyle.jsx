import styled from 'styled-components';
import { flex } from './mixins';
import colors from './colors';

const HeaderStyle = styled.header`
    ${flex({})};
    background-color: ${colors.primary};
    padding: 1em 1em;

    nav{
        ${flex({})}
        width: 50%;

        ul{
            ${flex({})}
            gap: 1.5em;
        }
        a{
            color:white;
        }
        button{
            color: white;
            background-color: transparent;
            border:none;
            outlet:none;
            font-family:"trebuchet ms";
            font-size:16px;
            cursor:pointer;
        }

        // White line under button when hover
        li{
            display: inline;
            position: relative;
            &::after{
                content: '';
                position: absolute;
                height: 3px;
                width: 100%;
                background-color: white;
                border-radius: 50px;
                top: 100%;
                left: 0;
                transform-origin: 100% 50%;
                transform: scale3d(0, 1, 1);
                transition: transform .3s;
            }
    
            &:hover::after{
                transform-origin: 0% 50%;
                transform: scale3d(1, 1, 1);
            }
        }
    }
`;

export default HeaderStyle;
