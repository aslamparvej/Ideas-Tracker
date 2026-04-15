import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import SearchIcon from "@mui/icons-material/Search";
import FeedIcon from "@mui/icons-material/Feed";

import { DateRange, Update  } from "@mui/icons-material";

import { useUser } from "../../lib/context/user";
import { useIdeas } from "../../lib/context/project";

const Projects = () => {
  const user = useUser();
  const projects = useIdeas();
  const navigate = useNavigate();

  console.log("Projects: ", projects.current);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setsortBy] = useState("updated");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  // Filter and sort projects
  const getFilteredProjects = () => {
    let filtered = projects.current;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.status === statusFilter.toUpperCase());
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "created") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
    });

    return filtered;
  };
  const filteredProjects = getFilteredProjects();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="projects-page">
      {/* Header */}
      <div className="page-header">
        <div className="page-header__top">
          <div>
            <h1 className="page-header__title">My Projects</h1>
            <p className="page-header__subtitle">
              Manage and track all your project ideas in one place
            </p>
          </div>

          <Link to="/project/new">
            <button className="custom-btn custom-btn-primary">
              <span>+</span> New Project
            </button>
          </Link>
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar__section">
          <div className="toolbar__search">
            <span className="toolbar__search-icon">
              <SearchIcon />
            </span>
            <input
              type="text"
              className="toolbar__search-input"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="toolbar__select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="inprogress">In Progress</option>
            <option value="open">Open</option>
          </select>

          <select
            className="toolbar__select"
            value={sortBy}
            onChange={(e) => setsortBy(e.target.value)}
          >
            <option value="updated">Recently Updated</option>
            <option value="created">Recently Created</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
        <div className="toolbar__view-toggle">
          <button
            className={`toolbar__view-btn ${
              viewMode === "grid" ? "toolbar__view-btn--active" : ""
            }`}
            onClick={() => setViewMode("grid")}
          >
            <CalendarViewMonthIcon />
          </button>
          <button
            className={`toolbar__view-btn${
              viewMode === "list" ? " toolbar__view-btn--active" : ""
            }`}
            onClick={() => setViewMode("list")}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* Projects  */}
      {filteredProjects.length <= 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon">
            <FeedIcon style={{ fontSize: "4rem" }} />
          </div>
          <h2 className="empty-state__title">No Projects Found</h2>
        </div>
      ) : (
        <div
          className={`projects-grid ${
            viewMode === "list" ? "projects-grid--list" : ""
          }`}
        >
          {filteredProjects.map(
            (project, idx) =>
              user.current.$id === project.userId && (
                <div
                  key={idx}
                  className={`project-card${
                    viewMode === "list" ? " project-card--list" : ""
                  }`}
                  onClick={() => navigate(`/project/${project.$id}`)}
                >
                  <div className="project-card__header">
                    <span
                      className={`project-card__status project-card__status--${project.status}`}
                    >
                      {project.status}
                    </span>

                    <div></div>
                  </div>

                  <div>
                    <h3 className="project-card__title">{project.title}</h3>
                    <p className="project-card__description">
                      {project.description}
                    </p>
                  </div>

                  <div className="project-card__meta">
                    <div className="project-card__meta-item">
                      <span>
                        <DateRange />
                      </span>
                      <span>Created {formatDate(project.$createdAt)}</span>
                    </div>
                    <div className="project-card__meta-item">
                      <span>
                        <Update />
                      </span>
                      <span>Updated {formatDate(project.$updatedAt)}</span>
                    </div>
                  </div>
                </div>
              ),
          )}
        </div>
      )}
    </div>
  );
};

export default Projects;
