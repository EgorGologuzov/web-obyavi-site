import { useEffect } from "react";
import ArtemsContainer from "../components/ArtemsContainer";
import EgorsContainer from "../components/EgorsContainer";
import { useAppContext } from "../contexts/AppContext";

export default function Elements() {
    const appContext = useAppContext();

    const handleCheckboxChange = () => {
        appContext.changeTheme();
    }

    useEffect(() => {
        document.title = "Элементы";
    })

    return (
        <div style={{padding: "10px"}}>
            <input type="checkbox" onClick={handleCheckboxChange} />
            <EgorsContainer />
            <ArtemsContainer />
        </div>
    )
}
