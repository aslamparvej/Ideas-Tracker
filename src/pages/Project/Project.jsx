import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useProjects } from "../../lib/context/projects";
import { useTask } from "../../lib/context/task";
import { useUser } from "../../lib/context/user";

import { Edit, Calendar, ChevronLeft, Trash2, FileText } from "lucide-react";

const Project = () => {
  const { id } = useParams();
  const projectsData = useProjects();
  const { init, tasks, add, complete } = useTask();
  const { current } = useUser();

  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("low");

  useEffect(() => {
    if (current?.$id && id) {
      init(current.$id, id);
    }
  }, [current, id, init]);

  const hadleSubmit = async(e) => {
    e.preventDefault();
    const newTask = {
      ideas: id,
      userId: current.$id,
      title: newTaskTitle,
      priority: newTaskPriority,
    };
    await add(newTask);
    clearAddTaskForm();
  };
  const clearAddTaskForm = () => {
    setNewTaskTitle("");
    setNewTaskPriority("low");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getPriorityLabel = (priority) => {
    return {
      low: "Low",
      medium: "Medium",
      high: "High",
    }[priority];
  };

  const project = projectsData.projects.find((idea) => idea.$id === id);

  // Calculate progress
  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const progressPercent =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  if (!project) {
    return (
      <div>
        <h2>Project Not Found</h2>
        <p>The project with ID {id} does not exist.</p>
      </div>
    );
  }

  return (
    <div className="project-view">
      {/* Back button  */}
      <Link to="/" className="back-button">
        <ChevronLeft className="back-button-icon" />
        Back to Projects
      </Link>

      {/* Project Header */}
      <div className="project-header">
        <div className="project-header__top">
          <div className="project-header__title-group">
            <span
              className={`project-header__status project-header__status--${project.status.toLowerCase()}`}
            >
              {project.status}
            </span>
            <h1 className="project-header__title">{project.title}</h1>
            <p className="project-header__description">{project.description}</p>
          </div>

          <div className="project-header__actions">
            <button
              className="custom-btn custom-btn-secondary"
              title="Edit Project"
            >
              <Edit size={16} />
            </button>
            <button
              className="custom-btn custom-btn-danger"
              title="Delete Project"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="project-header__meta">
          <div className="project-header__meta-item">
            <span>
              <Calendar />
            </span>
            <span>Created {formatDate(project.$createdAt)}</span>
          </div>
          <div className="project-header__meta-item">
            <span>
              <Edit />
            </span>
            <span>Last updated {formatDate(project.$updatedAt)}</span>
          </div>
          <div className="project-header__meta-item">
            <span>
              <ChevronLeft />
            </span>
            <span>
              {completedTasks} of {totalTasks} tasks completed
            </span>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="progress-section">
        <div className="progress-section__header">
          <span className="progress-section__title">Task Progress</span>
          <span className="progress-section__stats">
            {progressPercent}% Complete
          </span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-bar__fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Tasks Section */}
      <div className="tasks-section">
        <div className="tasks-section__header">
          <div>
            <span className="tasks-section__title">Tasks</span>
            <span className="tasks-section__count">({tasks.length})</span>
          </div>
          <button
            className="custom-btn custom-btn-primary"
            onClick={() => setShowAddTask(!showAddTask)}
          >
            {showAddTask ? "✕ Cancel" : "+ Add Task"}
          </button>
        </div>

        {showAddTask && (
          <form className="add-task-form" onSubmit={hadleSubmit}>
            <div className="add-task-form__input-group">
              <input
                type="text"
                className="add-task-form__input"
                placeholder="Enter task title..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                autoFocus
              />

              <select
                className="add-task-form__select"
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div className="add-task-form__actions">
              <button className="custom-btn custom-btn-primary" type="submit">
                Add Task
              </button>
              <button
                type="button"
                className="custom-btn custom-btn-secondary"
                onClick={() => {
                  setShowAddTask(false);
                  setNewTaskTitle("");
                  setNewTaskPriority("medium");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Tasks List */}
        {tasks.length > 0 ? (
          <div className="tasks-list">
            {tasks.map((task) => (
              <div
                key={task.$id}
                className={`task-item ${
                  task.completed ? "task-item--completed" : ""
                }`}
              >
                <div
                  className={`task-item__checkbox${
                    task.completed ? " task-item__checkbox--checked" : ""
                  }`}
                  onClick={() => complete(task.$id)}
                >
                  {task.completed && "✓"}
                </div>

                <div className="task-item__content">
                  <span className="task-item__title">{task.title}</span>
                  <span
                    className={`task-item__priority task-item__priority--${task.priority}`}
                  >
                    {getPriorityLabel(task.priority)}
                  </span>
                </div>

                <div className="task-item__actions">
                  <button
                    className="task-item__action-btn"
                    onClick={() => handleEditTask(task)}
                    title="Edit task"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="task-item__action-btn task-item__action-btn--danger"
                    onClick={() => handleDeleteTask(task.id)}
                    title="Delete task"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="tasks-empty">
            <div className="tasks-empty__icon">
              <FileText size={48} />
            </div>
            <div className="tasks-empty__text">No tasks yet</div>
            <div className="tasks-empty__subtext">
              Add your first task to get started
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;
