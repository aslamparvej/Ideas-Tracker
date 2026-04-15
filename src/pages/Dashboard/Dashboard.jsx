import { useProjects } from "../../lib/context/projects";
import Loading from "../Loading";
import "./Dashboard.css";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Dashboard = () => {
  const { projects, loading } = useProjects();

  if (loading) return <Loading />;

  return (
    <div className="dashboard-container">
      <h2>Project {projects.length}</h2>
    </div>
  );
};

export default Dashboard;
