import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SerieDetailSection, SerieDetailInformation } from "../../../utils/style/SerieDetail";
import { Button } from '../../../utils/style/GlobalStyle';
import { useDispatch, useSelector } from "react-redux";
import { selectSerieDetail, selectUser, selectUserSeriesList } from "../../../utils/selector";
import { querySerieDetail } from "../../../features/serieDetail";
import { addToList, editList } from "../../../features/userSeriesList";
import SelectStatusSerie from "../../components/SelectStatusSerie";
import { fetchList } from "../../../features/userSeriesList";

export default function SerieDetail() {
    const data = useSelector(selectSerieDetail);
    const userSeriesList = useSelector(selectUserSeriesList);
    const { serieId } = useParams();
    const dispatch = useDispatch();
    const serieDetail = data?.data?.tvShow;
    // some description contains html tags, so we need to remove them with replaceAll
    const serieDescription = serieDetail?.description?.replaceAll(/<.{1,3}>/g, '');
    const [ formSelect, setFormSelect ] = useState('');
    const user = useSelector(selectUser);
    const userToken = user?.data?.token?.token;
    const [ serieStatus, setSerieStatus ] = useState('default');
    const statusStringCapitalize = serieStatus.charAt(0).toUpperCase() + serieStatus.slice(1);

    useEffect(() => {
        dispatch(querySerieDetail(serieId));
        if(userSeriesList?.data?.series) dispatch(fetchList(userToken));
    }, []);

    useEffect(() => {
        // we get the status of the displayed serie if it's in the user series list
        userSeriesList?.data?.series?.map(serie => {
            if(serie.id === serieId.toString()){
                setSerieStatus(serie.status);
             }
         })
    }, [userSeriesList]);

    const handleSubmitAddToList = (e, serieDetail) => {
        e.preventDefault();
        dispatch(addToList(serieDetail?.id, serieDetail?.image_path, serieDetail?.name, formSelect, userToken));
    };

    const handleSubmitEditList = (e, serieDetail) => {
        e.preventDefault();
        dispatch(editList(serieDetail?.id, formSelect, userToken));
    };

    return (
        <SerieDetailSection>
            {serieDetail && Object.keys(serieDetail).length > 0 ? (
                <>
                    <img src={serieDetail.image_path} alt={`Poster of the serie ${serieDetail.name}`}/>
                    <SerieDetailInformation>
                        <h1>{serieDetail.name}</h1>
                        {serieDetail?.network && <p>Run by {serieDetail?.network} ({serieDetail?.country})</p>}
                        <p>Serie started the {serieDetail.start_date}.</p>
                        {serieDetail?.status === 'Running' ? (
                            <p>The show is still running.</p>
                            ) : (
                            <p>Serie is now over or has been canceled.</p>
                        )}
                        <p>Total episodes : {serieDetail?.episodes?.length}</p>
                        <p>{serieDescription}</p>
                        <ul>
                            <li>Genre :</li>
                            {serieDetail.genres.map((genre, i) => {
                                return <li key={i+genre}>{genre}</li>
                            })}
                        </ul>
                        
                        {userToken && (
                            serieStatus !== 'default' ? (
                                <form 
                                onSubmit={(e)=>{
                                    handleSubmitEditList(e, serieDetail);
                                }}>
                                    <SelectStatusSerie 
                                    key={serieStatus}
                                    handleSelect={setFormSelect}
                                    selectDefault={statusStringCapitalize}
                                    status={serieStatus}
                                    />
                                    <Button>Edit</Button>
                                </form>
                            ) : (
                                <form 
                                onSubmit={(e)=>{
                                    handleSubmitAddToList(e, serieDetail);
                                }}>
                                    <SelectStatusSerie 
                                    handleSelect={setFormSelect}
                                    selectDefault={'Add serie to my list as'}
                                    status={serieStatus}
                                    />
                                    <Button>Add to my list</Button>
                                </form>
                            )
                        )}
                    </SerieDetailInformation>
                    
                    {/* {serieDetail?.rating ? (
                        <p>Has a rating of {Math.round(serieDetail?.rating * 10) / 10}/10 on episodate.</p>
                    ) : (
                        <p>Has no ratng on episodate.</p>
                    )} */}
                    
                </>
                ) : (
                <p>Sorry we cannot find this serie.</p>
                )
            }
        </SerieDetailSection>
    );
};