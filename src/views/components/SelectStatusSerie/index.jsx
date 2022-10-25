export default function SelectStatusSerie({ handleSelect }){
    return (
        <select 
            name='addSerieToList' 
            id='addSerieToList' 
            required 
            defaultValue={''}
            onChange={(e)=>{handleSelect(e.target.value)}}
        >
            <option value='' disabled>--Add serie to my list as--</option>
            <option value='watching'>Watching</option>
            <option value='completed'>Completed</option>
            <option value='planToWatch'>Plan to watch</option>
        </select>
    );
}