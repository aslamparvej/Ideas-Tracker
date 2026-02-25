import React, {useState} from "react";

import AssistantSidebar from "../components/Assistant/AssistantSidebar";
import AssistantChatContent from "../components/Assistant/AssistantChatContent";
import AssistantChatInput from "../components/Assistant/AssistantChatInput";
import Loading from "./Loading";

import "../components/Assistant/Assistant.css";


const Assistant = () => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = (e) =>{
    e.preventDefault();
    console.log("Message sent: ", inputValue);

    if(inputValue.trim() === ""){
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setInputValue("");
    }, 2000);
  }

  return (
    <div className="assistant-container">
      <AssistantSidebar />
      {loading && <Loading />}
      <div className="assistant-content">
        <AssistantChatContent />
        <AssistantChatInput onSubmitHandler={handleSendMessage} inputValue={inputValue} setInputValue={setInputValue} />
      </div>
    </div>
  );
};

export default Assistant;
