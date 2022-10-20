import styled from 'styled-components';
import { flex } from './mixins';
import colors from './colors';

export const SerieDetailSection = styled.section`
    ${flex({just : 'space-around', direction : 'row', align : 'center'})};
    // gap: 1em;
    background-color: ${colors.secondary};
    padding: 2em 1em;
    border-radius: 7px;
    box-shadow: 4px 4px 6px ${colors.third};
`;

export const SerieDetailInformation = styled.div`
    ${flex({direction : 'column', align : 'center'})};
    gap: 1em;
    width: 50%;

    ul{
        ${flex({})};
        gap: .5em;

        li:not(:first-child):not(:last-child):after{
            content:' /'
        }
    }
`;