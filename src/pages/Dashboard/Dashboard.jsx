import { useIdeas } from "../../lib/context/project";
import "./Dashboard.css";

const Dashboard = () => {
  const projects = useIdeas();


  return <div className="dashboard-container">
    <h2>Project {projects.length}</h2>
  </div>;
};

export default Dashboard;
