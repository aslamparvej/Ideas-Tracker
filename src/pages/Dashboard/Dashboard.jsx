import { Link } from "react-router-dom";
import { useProjects } from "../../lib/context/projects";
import Loading from "../Loading";
import { Globe, LinkIcon} from "lucide-react";

import "./Dashboard.css";

const Dashboard = () => {
  const { projects, loading } = useProjects();

  if (loading) return <Loading />;

  const getDashboardStats = (projects) => {
    return projects.reduce(
      (acc, project) => {
        acc.total++;

        if (project.status === "PENDING") acc.pending++;
        if (project.status === "COMPLETED") acc.completed++;
        if (project.status === "INPROGRESS") acc.inProgress++;

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

      <div className="dashboard-card-container">
        <div className="dashboard-card chart-card">
        </div>
        <div className="dashboard-card chart-card"></div>
        <div className="dashboard-card recent-activities"></div>
        <div className="dashboard-card recent-project-card">
          <div className="dashboard-card__header">
            <h2 className="dashboard-card__title">Recent Project</h2>
            <button className="custom-btn custom-btn-primary">
              Add Project
            </button>
          </div>
          <div className="dashboard-card__body">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Live Link</th>
                  <th>GitHub Link</th>
                </tr>
              </thead>
              <tbody>
                {projects.slice(0, 5).map((p) => (
                  <tr key={p.$id}>
                    <td><Link to={`/project/${p.$id}`}>{p.title}</Link></td>
                    <td>{p.status}</td>
                    <td>
                      {p.websiteLink ? (
                        <a
                          href={p.websiteLink || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="card-link"
                        >
                          <Globe size={14} /> View
                        </a>
                      ) : (
                        "NA"
                      )}
                    </td>
                    <td>
                      {p.githubLink ? (
                        <a
                          href={p.githubLink || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="card-link"
                        >
                          <LinkIcon size={14} /> View
                        </a>
                      ) : (
                        "NA"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
