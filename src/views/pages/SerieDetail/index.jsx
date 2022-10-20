import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SerieDetailSection, SerieDetailInformation } from "../../../utils/style/SerieDetail";
import { Button } from '../../../utils/style/GlobalStyle';

export default function SerieDetail() {
    const [ data, setData ] = useState();
    const { serieId } = useParams();
    const [ description, setDescription ] = useState('');
    
    useEffect(() => {
        const getSerieDetail = async () => {
            try {
                const response = await axios.get(`https://www.episodate.com/api/show-details?q=${serieId}`);
                setData(response.data?.tvShow);
                // some description contains html tags, so we need to remove them with replaceAll
                setDescription(response.data?.tvShow?.description?.replaceAll(/<.{1,3}>/g, ''));
            } catch (error) {
                console.error(error)
            }
        }
        getSerieDetail();
    }, [serieId]);

    // console.log(data)
    return (
        <SerieDetailSection>
            {data && Object.keys(data).length > 0 ? (
                <>
                    <img src={data.image_path} alt={`Poster of the serie ${data.name}`}/>
                    <SerieDetailInformation>
                        <h1>{data.name}</h1>
                        {data?.network && <p>Run by {data?.network} ({data?.country})</p>}
                        <p>Serie started the {data.start_date}.</p>
                        {data?.status === 'Running' ? (
                            <p>The show is still running.</p>
                            ) : (
                            <p>Serie is now over or has been canceled.</p>
                        )}
                        <p>Total episodes : {data?.episodes.length}</p>
                        <p>{description}</p>
                        <ul>
                            <li>Genre :</li>
                            {data.genres.map((genre, i) => {
                                return <li key={i+genre}>{genre}</li>
                            })}
                        </ul>
                        <Button>Add this serie</Button>
                    </SerieDetailInformation>
                    
                    {/* {data?.rating ? (
                        <p>Has a rating of {Math.round(data?.rating * 10) / 10}/10 on episodate.</p>
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