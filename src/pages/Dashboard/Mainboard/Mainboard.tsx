import LivechatBar from "../LivechatBar/LivechatBar";
import MenuBar from "../MenuBar/MenuBar";
import MainContent from "./MainContent";

const Mainboard = () => {
    return (
        <main className="flex overflow-hidden">
            <MenuBar/>
            <MainContent/>
            <LivechatBar/>
        </main>
    )
}

export default Mainboard;