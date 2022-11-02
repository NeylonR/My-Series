import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../utils/selector";
import { useState } from "react";
import { selectSeriesList } from "../../../utils/selector";
import { querySeries } from "../../../features/seriesList";
import { SeriesListContainer, SeriesListPaginationContainer, SeriesListSearchContainerLi } from "../../../utils/style/UserList";
import { Link } from "react-router-dom";
import { Button } from "../../../utils/style/GlobalStyle";

export default function Home() {
    const user = useSelector(selectUser);
    const seriesList = useSelector(selectSeriesList);
    const [ searchInput, setSearchInput ] = useState('');
    const [ page, setPage ] = useState(1);
    const dispatch = useDispatch();
    const numberOfPage = Array.from(Array(seriesList?.data?.pages).keys());

    const handleChange = (e) => {
        return setSearchInput(e.target.value)
    };

    const goToPage = (page) => {
        setPage(page);
        return dispatch(querySeries(page, searchInput));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const request = searchInput.toString();
        if(request && request !== ' ') dispatch(querySeries(1, request));
    };

    return (
        <>
        <form onSubmit={(e) => handleSubmit(e)}>
            <input onChange={(e) => handleChange(e)}/>
            <Button>Search</Button>
        </form>
        {seriesList?.data?.tv_shows.length >= 1 ? (
            <SeriesListContainer>
                {seriesList?.data?.tv_shows.map(serie => {
                    return (
                        <SeriesListSearchContainerLi key={serie?.id}>
                            <Link to={`/detail/${serie?.id}`}>
                                <img src={serie?.image_thumbnail_path} alt="o"/>
                            </Link>
                            <Link to={`/detail/${serie?.id}`}>{serie?.name}</Link>
                        </SeriesListSearchContainerLi>
                        
                    );
                })}
            </SeriesListContainer>
            ) : (
                <p>No results.</p>
        )}
        {seriesList?.data?.tv_shows.length >= 1 && (
            <SeriesListPaginationContainer>
            {page > 1 ? (
                <button onClick={() => goToPage(page-1)}>Previous</button>
                ) : (
                <button disabled>Previous</button>
                ) 
            }
            {numberOfPage.map(paginationPage => {
                if(paginationPage + 1 === page) {
                    return <button 
                        onClick={() => goToPage(paginationPage+1)} 
                        key={paginationPage}
                        disabled
                        >
                            {paginationPage+1}
                        </button>
                }
                return <button onClick={() => goToPage(paginationPage+1)} key={paginationPage}>{paginationPage+1}</button>
            })}
            {page < numberOfPage.length ? (
                <button onClick={() => goToPage(page+1)}>Next</button>
                ) : (
                <button disabled>Next</button>
                ) 
            }
            </SeriesListPaginationContainer>
        )}
        </>
    );
};