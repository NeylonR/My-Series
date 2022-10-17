import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../utils/selector";
import { useState } from "react";
import { selectSeriesList } from "../../../utils/selector";
import { querySeries } from "../../../features/seriesList";

export default function Home() {
    const user = useSelector(selectUser);
    const seriesList = useSelector(selectSeriesList);
    const [ searchInput, setSearchInput ] = useState('');
    const [ page, setPage ] = useState(1);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        return setSearchInput(e.target.value)
    }
    const nextPage = () => {
        const nextPage = page +1;
        setPage(page + 1);
        return dispatch(querySeries(nextPage, searchInput));
    }
    console.log(seriesList.data) 
     
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <input onChange={(e) => handleChange(e)}/>
            <button onClick={() => {dispatch(querySeries(1, searchInput))}}>Search</button>
            {seriesList?.data?.tv_shows.length >= 1 ? (
                seriesList?.data?.tv_shows.map(serie => {
                    return (
                        <div>
                            <img src={serie?.image_thumbnail_path} alt="o"/> 
                            <p key={serie?.id}>{serie?.name}</p>
                        </div>
                        
                    )
                })) : (
                    <p>No results.</p>
            )}
            {seriesList?.data?.total >= 21 && (
                <button onClick={() => { nextPage()}}>next page</button>
            )}
        </form>
    );
};