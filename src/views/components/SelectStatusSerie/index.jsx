import { useEffect, useState } from "react";

export default function SelectStatusSerie({ handleSelect, status, selectDefault }){
    const [option, setOption ] = useState();
    useEffect(()=>{
        selectDisplay(status);
    }, [status]);

    const selectDisplay = (status) => {
        switch (status) {
            case 'watching':
                setOption([
                    { value: 'completed', text: 'Completed' },
                    { value: 'planToWatch', text: 'Plan to watch' }
                ]);
                break;
            case 'completed':
                setOption([
                    { value: 'watching', text: 'Watching' },
                    { value: 'planToWatch', text: 'Plan to watch' }
                ]);
                break;
            case 'planToWatch':
                setOption([
                    { value: 'completed', text: 'Completed' },
                    { value: 'watching', text: 'Watching' },
                ]);
                break;
            default:
                setOption([
                    { value: 'completed', text: 'Completed' },
                    { value: 'watching', text: 'Watching' },
                    { value: 'planToWatch', text: 'Plan to watch' }
                ]);
                break;
        }
    };

    return (
        <select 
            name='addSerieToList' 
            id='addSerieToList' 
            required 
            defaultValue={''}
            onChange={(e)=>{handleSelect(e.target.value)}}
        >
            <option value='' disabled>--{selectDefault === 'PlanToWatch' ? 'Plan to watch' : selectDefault}--</option>
            {option && option?.map(option => {
                return (
                    <option 
                        key={option?.value} 
                        value={option?.value}
                    >{option?.text}</option>
                );
            })}
        </select>
    );
}