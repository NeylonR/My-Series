import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SerieDetailSection, SerieDetailInformation } from "../../../utils/style/SerieDetail";
import { Button } from '../../../utils/style/GlobalStyle';
import { useDispatch, useSelector } from "react-redux";
import { selectSerieDetail, selectUser } from "../../../utils/selector";
import { querySerieDetail } from "../../../features/serieDetail";
import { addToList } from "../../../features/userSeriesList";

export default function SerieDetail() {
    const data = useSelector(selectSerieDetail);
    const { serieId } = useParams();
    const dispatch = useDispatch();
    const serieDetail = data?.data?.tvShow;
    // some description contains html tags, so we need to remove them with replaceAll
    const serieDescription = serieDetail?.description?.replaceAll(/<.{1,3}>/g, '');
    const [ formSelect, setFormSelect ] = useState('');
    const user = useSelector(selectUser);
    const userToken = user?.data?.token?.token;

    useEffect(() => {
        dispatch(querySerieDetail(serieId));
    }, [dispatch, serieId]);

    console.log(formSelect)
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
                        <form 
                        onSubmit={(e)=>{
                            e.preventDefault();
                            dispatch(addToList(serieDetail.id, formSelect, userToken));
                        }}>
                            <select 
                                name='addSerieToList' 
                                id='addSerieToList' 
                                required 
                                defaultValue={''}
                                onChange={(e)=>{setFormSelect(e.target.value)}}
                            >
                                <option value='' disabled>--Add serie to my list as--</option>
                                <option value='watching'>Watching</option>
                                <option value='completed'>Completed</option>
                                <option value='planToWatch'>Plan to watch</option>
                            </select>
                            <Button>Add to my list</Button>
                        </form>
                        
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