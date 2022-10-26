import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchList, deleteFromList, editList } from "../../../features/userSeriesList";
import { selectUserSeriesList, selectUser } from "../../../utils/selector";
import { UserSeriesStatus, UserSeriesSection, UserSeriesListContainer, UserSeriesListContainerLi } from "../../../utils/style/UserList";
import SelectStatusSerie from "../../components/SelectStatusSerie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faCheck, faWrench } from '@fortawesome/free-solid-svg-icons'
import { Button } from "../../../utils/style/GlobalStyle";
library.add(faTrash, faCheck, faWrench);

export default function UserSeriesList() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const userToken = user?.data?.token?.token;
    const userSeriesList = useSelector(selectUserSeriesList);
    const [ status, setStatus ] = useState('completed');
    const statusString = status.charAt(0).toUpperCase() + status.slice(1);
    const [ formSelect, setFormSelect ] = useState('');

    useEffect(() => {
        dispatch(fetchList(userToken))
    }, []);

    //copy the series list array to order it alphabetically by serie's name
    const sortedUserSeriesList = userSeriesList?.data?.series.slice().sort(function(a, b) {
        var serieA = a.name.toUpperCase();
        var serieB = b.name.toUpperCase();
        return (serieA < serieB) ? -1 : (serieA > serieB) ? 1 : 0;
    });

    const deleteSerie = (e, serie) => {
        e.preventDefault();
        if(window.confirm('Are you sure you want to remove this serie from your list?')){
            dispatch(deleteFromList(serie?.id, serie?._id, userToken));
        };
    };

    const handleSubmit = (e, serie) => {
        e.preventDefault();
        dispatch(editList(serie?.id, formSelect, userToken));
    };

    return (
        <>
        <UserSeriesSection>
            <UserSeriesStatus>
                <h2 
                    onClick={() => {setStatus('completed')}}
                    data-status={status === 'completed' ? 'focus' : 'default'}
                >Completed</h2>
                <h2 
                    onClick={() => {setStatus('watching')}}
                    data-status={status === 'watching' ? 'focus' : 'default'}
                >Watching</h2>
                <h2 
                    onClick={() => {setStatus('planToWatch')}}
                    data-status={status === 'planToWatch' ? 'focus' : 'default'}
                >Plan to watch</h2>
            </UserSeriesStatus>

            <h2>{statusString}</h2>
            <UserSeriesListContainer>
                {userSeriesList?.data?.series?.length > 0 && sortedUserSeriesList?.map(serie => {
                    if(serie?.status === status) {
                        return (
                            <UserSeriesListContainerLi key={serie?.id}>
                                
                                <Link to={`/detail/${serie?.id}`}>
                                    <img src={serie?.image_url} alt={`${serie?.name}`} />
                                </Link>
                                <Link to={`/detail/${serie?.id}`}>
                                    {serie?.name}
                                </Link>
                                <div>
                                    <FontAwesomeIcon 
                                        icon="trash" 
                                        onClick={(e) => {
                                            deleteSerie(e, serie);
                                        }}
                                    />
                                    <form onSubmit={(e) => {
                                        handleSubmit(e, serie);
                                    }}>
                                        <SelectStatusSerie 
                                            handleSelect={setFormSelect} 
                                            status={serie?.status}
                                            selectDefault={'Edit status'}
                                        />
                                        <Button>Edit</Button>
                                    </form>
                                </div>
                            </UserSeriesListContainerLi>
                        );
                    }
                })}
            </UserSeriesListContainer>
        </UserSeriesSection>
        </>
    );
};