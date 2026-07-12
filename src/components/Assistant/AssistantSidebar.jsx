import { Plus } from "lucide-react";

const AssistantSidebar = () => {
  return (
    <div className="assistant-sidebar">
      <div className="assistant-sidebar__top">
        <h1 className="assistant-sidebar__title">AI Assistant</h1>
        <p className="assistant-sidebar__description">
          Ask me anything about your projects!
        </p>
        <button className="custom-btn custom-btn-primary new-chat-btn">
          <Plus sx={{ fontSize: 18 }} /> New Chat
        </button>
      </div>
      <div className="assistant-sidebar__history-container"></div>
    </div>
  );
};

export default AssistantSidebar;
