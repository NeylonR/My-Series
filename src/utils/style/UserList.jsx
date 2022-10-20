import styled from 'styled-components';
import { flex } from './mixins';
import colors from './colors';

export const SeriesListContainer = styled.div`
    ${flex({direction : 'row', align : 'flex-end'})};
    gap: 1em;
`;

export const SeriesListPaginationContainer = styled.div`
    ${flex({})};
    width: 100%;
    gap: 1em;
    button{
        padding: .5em;
        background-color: ${colors.primary};
        color: white;
        border: none;
        cursor: pointer;
        &:disabled{
            cursor: default;
            filter: grayscale(80%);
        }
    }
`;