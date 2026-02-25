import React from "react";

import AddIcon from "@mui/icons-material/Add";

const AssistantSidebar = () => {
  return (
    <div className="assistant-sidebar">
      <div className="assistant-sidebar__top">
        <h1 className="assistant-sidebar__title">AI Assistant</h1>
        <p className="assistant-sidebar__description">
          Ask me anything about your projects!
        </p>
        <button className="custom-btn custom-btn-primary new-chat-btn">
          <AddIcon sx={{ fontSize: 18 }} /> New Chat
        </button>
      </div>
      <div className="assistant-sidebar__history-container"></div>
    </div>
  );
};

export default AssistantSidebar;
