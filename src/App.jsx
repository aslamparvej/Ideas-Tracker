import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddIdea from "./pages/Project/AddProject";
import Assistant from "./pages/Assistant";

import Project from "./pages/Project/Project";
import Projects from "./pages/Project/Projects";

import { UserProvider } from "./lib/context/user";
import { TaskProvider } from "./lib/context/task";
import { ProjectsProvider } from "./lib/context/projects";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <UserProvider>
          <ProjectsProvider>
            <TaskProvider>
              <Header />
              <Routes>
                <Route path="/">
                  <Route index element={<Home />}></Route>

                  <Route path="login" element={<Login />}></Route>
                  <Route path="register" element={<Register />}></Route>

                  <Route path="add-idea" element={<AddIdea />}></Route>
                  <Route path="assistant" element={<Assistant />}></Route>
                  <Route path="projects" element={<Projects />}></Route>
                  <Route path="project/new" element={<AddIdea />}></Route>
                  <Route path="project/:id" element={<Project />}></Route>
                </Route>
              </Routes>
            </TaskProvider>
          </ProjectsProvider>
        </UserProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
