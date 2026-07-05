import { Link } from "react-router-dom";
import { useProjects } from "../../lib/context/projects";
import Loading from "../Loading";
import "./Dashboard.css";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Dashboard = () => {
  const { projects, loading } = useProjects();

  if (loading) return <Loading />;

  const getDashboardStats = (projects) => {
    return projects.reduce(
      (acc, project) => {
        acc.total++;

        if (project.status === "PENDING") acc.pending++;
        if (project.status === "COMPLETED") acc.completed++;
        if (project.status === "IN_PROGRESS") acc.inProgress++;

        return acc;
      },
      {
        total: 0,
        pending: 0,
        completed: 0,
        inProgress: 0,
      },
    );
  };

  const stats = getDashboardStats(projects);
  console.log(stats);

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h3 className="page-title">Dashboard</h3>
        <div className="page-action-buttons">
          <Link to="/project/new">
            <button className="custom-btn custom-btn-primary">
              Add Project
            </button>
          </Link>
        </div>
      </div>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h4 className="stat-card__label">Total Projects</h4>
          <h2 className="stat-card__value">{stats.total}</h2>
        </div>
        <div className="stat-card">
          <h4 className="stat-card__label">Ended Projects</h4>
          <h2 className="stat-card__value">{stats.completed}</h2>
        </div>
        <div className="stat-card">
          <h4 className="stat-card__label">Running Projects</h4>
          <h2 className="stat-card__value">{stats.inProgress}</h2>
        </div>
        <div className="stat-card">
          <h4 className="stat-card__label">Pending Projects</h4>
          <h2 className="stat-card__value">{stats.pending}</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
