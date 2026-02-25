import React from "react";

const AssistantChatContent = () => {
  const predefinedPrompts = [
    "Generate budget for Food Delivery project.",
    "Generate a project plan for the new marketing campaign.",
    "What are the key milestones for the upcoming product launch?",
    "Can you summarize the progress of the current sprint?",
  ];

  return (
    <div className="assistant-content__messages-container">
      <div className="assistant-content__placeholder">
        <h3 className="assistant-content__placeholder-title">
          Start a Conversation
        </h3>
        <p className="assistant-content__placeholder-description">
          Ask me anything about your projects, tasks, or team!
        </p>
        <div className="assistant-content__predefined-prompt">
          {predefinedPrompts.map((prompt, index) => (
            <div
              key={index}
              className="assistant-content__predefined-prompt-item"
              onClick={() => {
                console.log("Predefined prompt clicked:", prompt);
              }}
            >
              {prompt}
            </div>
          ))}
        </div>
      </div>

      <div
        className="assistant-content__chat-container"
        style={{ display: "none" }}
      >
        <div className="assistant-content__chat-header">
          <h2 className="assistant-content__chat-title">Chat Title</h2>
          <p className="assistant-content__chat-timestamp">
            Last message timestamp
          </p>
        </div>
        <div className="assistant-content__chat-messages">
          {/* Chat messages will be rendered here */}
        </div>
      </div>
    </div>
  );
};

export default AssistantChatContent;
