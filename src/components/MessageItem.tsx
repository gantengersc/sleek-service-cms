
import React, { useState } from 'react';
import { Check, CheckCheck, Clock, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read';

interface MessageItemProps {
  id: string;
  content: string;
  sender: 'user' | 'admin';
  timestamp: Date;
  status?: MessageStatus;
  className?: string;
  onReply?: (message: string, messageId: string) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({
  id,
  content,
  sender,
  timestamp,
  status = 'delivered',
  className,
  onReply
}) => {
  const [replyText, setReplyText] = useState('');
  const [showReply, setShowReply] = useState(false);

  const isUser = sender === 'user';

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyText.trim() && onReply) {
      onReply(replyText, id);
      setReplyText('');
      setShowReply(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const StatusIcon = () => {
    switch (status) {
      case 'sending':
        return <Clock className="w-3 h-3 text-muted-foreground/50" />;
      case 'sent':
        return <Check className="w-3 h-3 text-muted-foreground/70" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-muted-foreground/70" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "flex flex-col w-full max-w-[85%] mb-3 animate-fade-in",
      isUser ? "ml-auto items-end" : "mr-auto items-start",
      className
    )}>
      <div className={cn(
        "px-4 py-2.5 rounded-2xl text-sm shadow-sm",
        isUser 
          ? "bg-primary text-white rounded-tr-none" 
          : "bg-gray-100 text-gray-800 rounded-tl-none"
      )}>
        {content}
      </div>
      
      <div className="flex items-center mt-1 text-xs text-muted-foreground">
        <span>{formatTime(timestamp)}</span>
        {isUser && <StatusIcon />}
      </div>

      {!isUser && !showReply && onReply && (
        <button 
          onClick={() => setShowReply(true)}
          className="text-xs text-primary mt-1 hover:underline"
        >
          Reply
        </button>
      )}

      {showReply && onReply && (
        <form 
          onSubmit={handleSubmitReply}
          className="mt-2 w-full flex items-center gap-2 animate-fade-in"
        >
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your reply..."
            className="flex-1 px-3 py-2 text-sm rounded-full border bg-white focus:outline-none focus:ring-1 focus:ring-primary"
            autoFocus
          />
          <button 
            type="submit"
            disabled={!replyText.trim()}
            className={cn(
              "p-2 rounded-full text-white transition-colors duration-200",
              replyText.trim() ? "bg-primary hover:bg-primary/90" : "bg-gray-300"
            )}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
};

export default MessageItem;
