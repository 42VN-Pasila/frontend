import DashboardNavbar from "./DashboardNavbar";
import Mainboard from "./Mainboard/Mainboard";

const Dashboard = () => {
    return (
        <main className="h-[100dvh] flex flex-col">
            <DashboardNavbar/>
            <Mainboard/>
        </main>
    )
}

export default Dashboard;