import { useSelector } from "react-redux";
import { selectUser } from "../../../utils/selector";

export default function Home() {
    const user = useSelector(selectUser);
    console.log(user)
    return (
        <h1>Yoh {JSON.stringify(user)}</h1>
    );
};