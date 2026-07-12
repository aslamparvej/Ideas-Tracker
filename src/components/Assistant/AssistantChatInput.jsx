import { ArrowUp } from 'lucide-react';

const AssistantChatInput = ({ onSubmitHandler, inputValue, setInputValue }) => {

  return (
    <div className="assistant-chat-container">
      <form className="assistant-chat__form" onSubmit={onSubmitHandler}>
        <div className={`assistant-chat__input-wrapper`}>
          <textarea
            className="assistant-chat__input"
            value={inputValue}
            placeholder="Type your message..."
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key === "Enter" && !e.shiftKey){
                e.preventDefault();
                onSubmitHandler(e);
              }
            }}
            rows={1}
          ></textarea>
          <button
            type="submit"
            className="custom-btn custom-btn-lg custom-btn-primary assistant-chat__send-btn"
            disabled={inputValue.trim() === ""}
          >
            <ArrowUp sx={{ fontSize: 18 }} /> Send
          </button>
        </div>

        <p className="assistant-chat__instructions">Press Enter to send, Shift + Enter for new line</p>
      </form>
    </div>
  );
};

export default AssistantChatInput;
