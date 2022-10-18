import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../utils/selector";
import { useState } from "react";
import { selectSeriesList } from "../../../utils/selector";
import { querySeries } from "../../../features/seriesList";
import { SeriesListContainer, SeriesListPaginationContainer } from "../../../utils/style/UserList";

export default function Home() {
    const user = useSelector(selectUser);
    const seriesList = useSelector(selectSeriesList);
    const [ searchInput, setSearchInput ] = useState('');
    const [ page, setPage ] = useState(1);
    const dispatch = useDispatch();
    // const [ totalPage, setTotalPage ] = useState([]);
    // const [ pagination, setPagination ] = useState({
    //     totalPage: seriesList?.data?.pages,
    //     actualPage: page,
    //     renderPage: []
    // });
    const numberOfPage = Array.from(Array(seriesList?.data?.pages).keys());

    const handleChange = (e) => {
        return setSearchInput(e.target.value)
    }
    const goToPage = (page) => {
        setPage(page);
        return dispatch(querySeries(page, searchInput));
    }
    console.log(page) 

    const handleSearch = async () => {
        dispatch(querySeries(1, searchInput));
    }

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <input onChange={(e) => handleChange(e)}/>
            <button onClick={() => { handleSearch() }}>Search</button>
            {seriesList?.data?.tv_shows.length >= 1 ? (
                <SeriesListContainer>
                    {seriesList?.data?.tv_shows.map(serie => {
                        return (
                            <div key={serie?.id}>
                                <img src={serie?.image_thumbnail_path} alt="o"/> 
                                <p >{serie?.name}</p>
                            </div>
                        );
                    })}
                    <SeriesListPaginationContainer>
                        {page > 1 ? (
                            <button onClick={() => goToPage(page-1)}>Previous</button>
                            ) : (
                            <button disabled>Previous</button>
                            ) 
                        }
                        {numberOfPage.map(page => {
                            return <button onClick={() => goToPage(page+1)}>{page+1}</button>
                        })}
                        {page < numberOfPage.length ? (
                            <button onClick={() => goToPage(page+1)}>Next</button>
                            ) : (
                            <button disabled>Next</button>
                            ) 
                        }
                    </SeriesListPaginationContainer>
                </SeriesListContainer>
                ) : (
                    <p>No results.</p>
            )}
        </form>
    );
};