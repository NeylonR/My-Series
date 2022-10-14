import styled from 'styled-components';
import { flex } from './mixins';
import colors from './colors';

const FooterStyle = styled.footer`
    ${flex({})};
    background-color: ${colors.primary};
    padding: .8em 0;
`;
export default FooterStyle;