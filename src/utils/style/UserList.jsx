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

export const UserSeriesStatus = styled.div`
    ${flex({})};
    gap: 1em;
`;

export const UserSeriesSection = styled.section`
    ${flex({direction: 'column'})};
    gap: 1em;
    width: 85%;
    max-width: 700px;
    [data-status='focus'], [data-status='default']{
        position:relative;
        transition: all .3s ease-in-out;
        &::after{
            content:'';
            width: 100%;
            height: 7px;
            background-color: transparent;
            position: absolute;
            bottom:-7px;
            left:0px;
            tranform: translateX(50%);
            transition: all .3s ease-in-out;
        }
    }
    [data-status='focus']::after{
        background-color: ${colors.primary};
    }
`;

export const UserSeriesListContainer = styled.ul`
    ${flex({direction: 'column'})};
    width: 100%;
`;

export const UserSeriesListContainerLi = styled.li`
    ${flex({just: 'space-between'})};
    width: 100%;
    padding: .3em .5em;
    a{
        line-height:0;
    }
    img{
        width: 55px;
        height: 75px;
    }
    svg{
        color: black;
        font-size: 16px;
        cursor:pointer;
    }

    &:nth-of-type(2n+1){
        background-color:${colors.fourth};
    }
`;