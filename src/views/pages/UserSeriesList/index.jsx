import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../../../features/userSeriesList";
import { selectUserSeriesList, selectUser } from "../../../utils/selector";

export default function UserSeriesList() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const userSeriesList = useSelector(selectUserSeriesList)
    // console.log(user)
    useEffect(() => {
        dispatch(fetchList(user?.data?.token?.token))
    }, []);
    console.log(userSeriesList)
    return (
        <>
        <h1>oui</h1>
        {userSeriesList?.data?.completed?.length > 0 && userSeriesList?.data?.completed?.map(serie => {
            return <p>{serie?.id}</p>
        })}
        </>
    );
};