export interface Message {
    id: string; 
    text: string;
    sender: "user" | "bot";
  }
  
  export interface Chat {
    id: string;
    title: string;
    timestamp: number;
    messages: Message[];
  }
  