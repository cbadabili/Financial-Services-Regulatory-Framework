import { useState, useRef, useEffect } from "react";
import { 
  MessageSquare, 
  X, 
  Send, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Search,
  User,
  Bot,
  HelpCircle,
  Phone,
  Mail,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

// Types for our chatbot
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  feedback?: 'positive' | 'negative';
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
  regulatoryReference?: string;
  regulatoryLinks?: Array<{ title: string; url: string }>;
}

interface QuickAction {
  id: string;
  label: string;
  question: string;
}

// Mock data for FAQs - reduced to the 5 most frequently asked questions
const faqData: FAQ[] = [
  {
    id: "faq-1",
    question: "What are the capital requirements for commercial banks in Botswana?",
    answer: "Commercial banks in Botswana must maintain a minimum capital adequacy ratio of 15% of risk-weighted assets, of which at least 10% must be Tier 1 capital. This requirement is stipulated in the Banking Act Amendment 2025.",
    category: "Banking Regulation",
    keywords: ["capital", "requirements", "banks", "CAR", "tier 1"],
    regulatoryReference: "Banking Act Amendment 2025, Section 15",
    regulatoryLinks: [
      { title: "Banking Act Amendment 2025", url: "/documents/banking-act-amendment-2025.pdf" },
      { title: "Capital Requirements Guidelines", url: "/guidelines/capital-requirements.pdf" }
    ]
  },
  {
    id: "faq-2",
    question: "What are the AML/CFT reporting requirements for financial institutions?",
    answer: "Financial institutions must submit Suspicious Transaction Reports (STRs) within 24 hours of identifying suspicious activity. They must also conduct Customer Due Diligence (CDD) for all new clients and periodically review existing clients based on risk assessment.",
    category: "Anti-Money Laundering",
    keywords: ["AML", "CFT", "reporting", "suspicious", "transaction", "STR", "CDD"],
    regulatoryReference: "AML/CFT Act 2022, Section 10",
    regulatoryLinks: [
      { title: "AML/CFT Act 2022", url: "/documents/aml-cft-act-2022.pdf" },
      { title: "STR Reporting Guidelines", url: "/guidelines/str-reporting.pdf" }
    ]
  },
  {
    id: "faq-3",
    question: "What licenses are required for operating a payment service in Botswana?",
    answer: "Payment service providers require a Payment Systems License from the Bank of Botswana. The application process includes submitting business plans, demonstrating technical capabilities, and meeting minimum capital requirements of 5 million Pula.",
    category: "Licensing",
    keywords: ["payment", "license", "PSP", "service provider"],
    regulatoryReference: "National Payment Systems Act 2021, Section 8",
    regulatoryLinks: [
      { title: "National Payment Systems Act 2021", url: "/documents/payment-systems-act-2021.pdf" },
      { title: "Payment License Application Form", url: "/forms/payment-license-application.pdf" }
    ]
  },
  {
    id: "faq-5",
    question: "What are the cybersecurity requirements for financial institutions?",
    answer: "Financial institutions must implement a comprehensive cybersecurity framework, conduct annual penetration testing, appoint a Chief Information Security Officer, maintain an incident response plan, and report security breaches within 24 hours.",
    category: "Technology & Cybersecurity",
    keywords: ["cybersecurity", "security", "breach", "tech", "CISO", "penetration testing"],
    regulatoryReference: "Cybersecurity Directive 2023, Section 5",
    regulatoryLinks: [
      { title: "Cybersecurity Directive 2023", url: "/documents/cybersecurity-directive.pdf" },
      { title: "Cybersecurity Framework Guide", url: "/guidelines/cybersecurity-framework.pdf" }
    ]
  },
  {
    id: "faq-6",
    question: "What is the process for registering a new financial services company?",
    answer: "Registration requires: 1) Company registration with CIPA, 2) Application for financial services license with appropriate regulator (BoB, NBFIRA), 3) Fit and proper assessment for directors, 4) Submission of business plan and capital adequacy proof, 5) Compliance program documentation.",
    category: "Business Registration",
    keywords: ["registration", "new company", "startup", "license", "incorporation"],
    regulatoryReference: "Companies Act 2018, Financial Services Act 2022",
    regulatoryLinks: [
      { title: "Companies Act 2018", url: "/documents/companies-act-2018.pdf" },
      { title: "Financial Services License Guide", url: "/guidelines/financial-services-license.pdf" }
    ]
  }
];

// Quick action buttons
const quickActions: QuickAction[] = [
  { id: "qa-1", label: "Capital Requirements", question: "What are the capital requirements for banks?" },
  { id: "qa-2", label: "AML Reporting", question: "What are the AML reporting requirements?" },
  { id: "qa-3", label: "Licensing", question: "How do I apply for a financial services license?" },
  { id: "qa-4", label: "Cybersecurity", question: "What cybersecurity measures are required?" }
];

// FAQ Categories - reduced to match the reduced FAQ list
const faqCategories = [
  "All",
  "Banking Regulation",
  "Anti-Money Laundering",
  "Licensing",
  "Technology & Cybersecurity",
  "Business Registration"
];

export default function FAQChatbot() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your Regulatory Assistant. How can I help you with financial regulations in Botswana today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [suggestedFAQs, setSuggestedFAQs] = useState<FAQ[]>([]);
  // Initialize with filtered FAQs for the default category
  const [displayedFAQs, setDisplayedFAQs] = useState<FAQ[]>(
    faqData.filter(faq => activeCategory === "All" || faq.category === activeCategory)
  );
  const [analytics, setAnalytics] = useState({
    questionsAsked: 0,
    positiveRatings: 0,
    negativeRatings: 0,
    popularQuestions: {} as Record<string, number>
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update displayed FAQs when category changes
  useEffect(() => {
    setDisplayedFAQs(
      faqData.filter(faq => activeCategory === "All" || faq.category === activeCategory)
    );
  }, [activeCategory]);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  // Toggle chatbot visibility
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized) {
      setIsMinimized(false);
    }
  };

  // Toggle minimize/maximize
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Search FAQs based on query
  const searchFAQs = (query: string) => {
    if (!query.trim()) {
      setSuggestedFAQs([]);
      // When search is cleared, show all FAQs for the current category
      setDisplayedFAQs(
        faqData.filter(faq => activeCategory === "All" || faq.category === activeCategory)
      );
      return;
    }

    const normalizedQuery = query.toLowerCase();
    const results = faqData
      .filter(faq => {
        // Filter by category if one is selected
        if (activeCategory !== "All" && faq.category !== activeCategory) {
          return false;
        }
        
        // Check if query matches question, keywords, or answer
        return (
          faq.question.toLowerCase().includes(normalizedQuery) ||
          faq.answer.toLowerCase().includes(normalizedQuery) ||
          faq.keywords.some(keyword => keyword.toLowerCase().includes(normalizedQuery))
        );
      });
    
    setSuggestedFAQs(results);
  };

  // Handle user message submission
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Track analytics
    setAnalytics(prev => ({
      ...prev,
      questionsAsked: prev.questionsAsked + 1,
      popularQuestions: {
        ...prev.popularQuestions,
        [inputValue.toLowerCase()]: (prev.popularQuestions[inputValue.toLowerCase()] || 0) + 1
      }
    }));

    // Process the message to find a response
    processUserMessage(inputValue);
  };

  // Process user message and generate response
  const processUserMessage = (message: string) => {
    const normalizedMessage = message.toLowerCase();
    
    // Search for matching FAQs
    const matchingFAQs = faqData.filter(faq => {
      return (
        faq.question.toLowerCase().includes(normalizedMessage) ||
        faq.keywords.some(keyword => normalizedMessage.includes(keyword.toLowerCase()))
      );
    });

    setTimeout(() => {
      if (matchingFAQs.length > 0) {
        // Use the best matching FAQ
        const bestMatch = matchingFAQs[0];
        
        let responseContent = bestMatch.answer;
        
        // Add regulatory references if available
        if (bestMatch.regulatoryReference) {
          responseContent += `\n\nReference: ${bestMatch.regulatoryReference}`;
        }
        
        // Add links if available
        if (bestMatch.regulatoryLinks && bestMatch.regulatoryLinks.length > 0) {
          responseContent += "\n\nRelevant Documents:";
          bestMatch.regulatoryLinks.forEach(link => {
            responseContent += `\n- [${link.title}](${link.url})`;
          });
        }

        const botResponse: Message = {
          id: `bot-${Date.now()}`,
          content: responseContent,
          sender: "bot",
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botResponse]);
      } else {
        // No matching FAQ found
        const botResponse: Message = {
          id: `bot-${Date.now()}`,
          content: "I'm sorry, I don't have specific information on that topic. Would you like to contact a regulatory specialist for more detailed assistance?",
          sender: "bot",
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botResponse]);
      }
    }, 500); // Simulate processing time
  };

  // Handle quick action click
  const handleQuickAction = (action: QuickAction) => {
    setInputValue(action.question);
    
    // Auto-send the message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: action.question,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Track analytics
    setAnalytics(prev => ({
      ...prev,
      questionsAsked: prev.questionsAsked + 1,
      popularQuestions: {
        ...prev.popularQuestions,
        [action.question.toLowerCase()]: (prev.popularQuestions[action.question.toLowerCase()] || 0) + 1
      }
    }));

    // Process the message
    processUserMessage(action.question);
  };

  // Handle FAQ selection
  const handleSelectFAQ = (faq: FAQ) => {
    // Add user question
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: faq.question,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Construct bot response
    let responseContent = faq.answer;
    
    // Add regulatory references if available
    if (faq.regulatoryReference) {
      responseContent += `\n\nReference: ${faq.regulatoryReference}`;
    }
    
    // Add links if available
    if (faq.regulatoryLinks && faq.regulatoryLinks.length > 0) {
      responseContent += "\n\nRelevant Documents:";
      faq.regulatoryLinks.forEach(link => {
        responseContent += `\n- [${link.title}](${link.url})`;
      });
    }

    // Add bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        content: responseContent,
        sender: "bot",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    }, 500);

    // Clear search
    setSearchQuery("");
    setSuggestedFAQs([]);
    // Reset displayed FAQs to match the active category
    setDisplayedFAQs(
      faqData.filter(faq => activeCategory === "All" || faq.category === activeCategory)
    );

    // Track analytics
    setAnalytics(prev => ({
      ...prev,
      questionsAsked: prev.questionsAsked + 1,
      popularQuestions: {
        ...prev.popularQuestions,
        [faq.question.toLowerCase()]: (prev.popularQuestions[faq.question.toLowerCase()] || 0) + 1
      }
    }));
  };

  // Handle message feedback
  const handleFeedback = (messageId: string, feedback: 'positive' | 'negative') => {
    // Update message with feedback
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, feedback } 
          : msg
      )
    );

    // Update analytics
    setAnalytics(prev => ({
      ...prev,
      positiveRatings: feedback === 'positive' ? prev.positiveRatings + 1 : prev.positiveRatings,
      negativeRatings: feedback === 'negative' ? prev.negativeRatings + 1 : prev.negativeRatings
    }));

    // Show feedback toast
    toast({
      title: feedback === 'positive' ? "Thank you for your feedback!" : "We'll improve our answers",
      description: feedback === 'positive' 
        ? "We're glad this was helpful." 
        : "Thank you for helping us improve our responses.",
    });
  };

  // Handle contact specialist
  const handleContactSpecialist = () => {
    toast({
      title: "Specialist Request Sent",
      description: "A regulatory specialist will contact you within 24 hours.",
    });
  };

  // Format message content with links
  const formatMessageContent = (content: string) => {
    // Replace markdown-style links with actual links
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const formattedContent = content.replace(linkRegex, '<a href="$2" class="text-primary underline hover:text-primary/80" target="_blank">$1</a>');
    
    // Split by newlines and create paragraphs
    return formattedContent.split('\n\n').map((paragraph, i) => (
      <p key={i} className={i > 0 ? "mt-2" : ""} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\n/g, '<br/>') }} />
    ));
  };

  // Get the latest message for minimized view
  const getLatestMessage = () => {
    if (messages.length === 0) return null;
    return messages[messages.length - 1];
  };

  return (
    <>
      {/* Floating chat button */}
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 rounded-full w-12 h-12 shadow-lg z-50 flex items-center justify-center"
        /* data attribute so external elements (e.g., homepage CTA) can programmatically trigger the chat */
        data-reg-chat-toggle
        size="icon"
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
      </Button>

      {/* Chat widget */}
      {isOpen && (
        <Card
          className={`fixed bottom-20 right-4 sm:right-6 shadow-xl z-50 transition-all duration-300 ease-in-out
            ${isMinimized
              ? 'w-64 sm:w-72 h-auto' // Auto height for minimized view
              : 'w-[350px] sm:w-[400px] h-[36rem] sm:h-[40rem] max-w-[95vw] max-h-[85vh]'}
          `}
        >
          {/* Chat header */}
          <CardHeader className="p-3 flex flex-row items-center justify-between space-y-0 border-b">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/bot-avatar.png" alt="Chatbot" />
                <AvatarFallback className="bg-primary text-primary-foreground">RA</AvatarFallback>
              </Avatar>
              <CardTitle className="text-sm">Regulatory Assistant</CardTitle>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" onClick={toggleMinimize} className="h-8 w-8">
                {isMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
            </div>
          </CardHeader>

          {/* Minimized preview - show last message */}
          {isMinimized && (
            <CardContent className="p-3">
              {getLatestMessage() && (
                <div className="flex items-start gap-2">
                  {getLatestMessage()?.sender === 'bot' && (
                    <Avatar className="h-6 w-6 mt-0.5 flex-shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">RA</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="text-sm line-clamp-2 break-words">
                    {getLatestMessage()?.content.substring(0, 120)}
                    {getLatestMessage()?.content.length > 120 ? "..." : ""}
                  </div>
                </div>
              )}
            </CardContent>
          )}

          {/* Chat content - only show if not minimized */}
          {!isMinimized && (
            <>
              {/* Use shadcn Tabs with clean spacing */}
              <Tabs defaultValue="chat" className="flex flex-col h-full m-0 p-0">
                <TabsList className="mx-2 m-0 p-0 grid w-[calc(100%-1rem)] grid-cols-2">
                  <TabsTrigger value="chat" className="text-sm">Chat</TabsTrigger>
                  <TabsTrigger value="faqs" className="text-sm">FAQs</TabsTrigger>
                </TabsList>
                
                {/* Chat tab */}
                <TabsContent value="chat" className="flex-1 flex flex-col overflow-hidden m-0 p-0 border-0">
                  <ScrollArea className="flex-1 p-3">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex items-start gap-2 max-w-[90%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                            {message.sender === 'bot' && (
                              <Avatar className="h-6 w-6 mt-0.5 flex-shrink-0">
                                <AvatarFallback className="bg-primary text-primary-foreground text-xs">RA</AvatarFallback>
                              </Avatar>
                            )}
                            {message.sender === 'user' && (
                              <Avatar className="h-6 w-6 mt-0.5 flex-shrink-0">
                                <AvatarFallback className="bg-secondary text-secondary-foreground">
                                  <User size={10} />
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div className="min-w-0 break-words w-full">
                              <div 
                                className={`rounded-lg p-2 text-sm ${
                                  message.sender === 'user' 
                                    ? 'bg-primary text-primary-foreground' 
                                    : 'bg-muted'
                                }`}
                              >
                                {formatMessageContent(message.content)}
                              </div>
                              
                              {/* Timestamp and feedback for bot messages */}
                              {message.sender === 'bot' && (
                                <div className="flex items-center mt-1 space-x-2">
                                  <span className="text-xs text-muted-foreground">
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                  <div className="flex items-center space-x-1">
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-4 w-4"
                                      onClick={() => handleFeedback(message.id, 'positive')}
                                      disabled={message.feedback !== undefined}
                                    >
                                      <ThumbsUp 
                                        size={10} 
                                        className={message.feedback === 'positive' ? 'text-success' : ''} 
                                      />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-4 w-4"
                                      onClick={() => handleFeedback(message.id, 'negative')}
                                      disabled={message.feedback !== undefined}
                                    >
                                      <ThumbsDown 
                                        size={10} 
                                        className={message.feedback === 'negative' ? 'text-destructive' : ''} 
                                      />
                                    </Button>
                                  </div>
                                </div>
                              )}
                              
                              {/* Timestamp for user messages */}
                              {message.sender === 'user' && (
                                <div className="flex justify-end mt-1">
                                  <span className="text-xs text-muted-foreground">
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Quick action buttons */}
                  <div className="px-4 py-2 border-t border-b">
                    <p className="text-xs text-muted-foreground mb-1">Quick Actions:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickActions.map((action) => (
                        <Button 
                          key={action.id} 
                          variant="outline" 
                          size="sm" 
                          className="text-xs h-7"
                          onClick={() => handleQuickAction(action)}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Input area */}
                  <CardFooter className="p-2">
                    <div className="relative w-full">
                      <Input
                        ref={inputRef}
                        placeholder="Ask about regulations..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleSendMessage();
                          }
                        }}
                        className="pr-10 h-8 text-sm"
                      />
                      <Button 
                        className="absolute right-0 top-0 h-full px-3" 
                        variant="ghost"
                        onClick={handleSendMessage}
                      >
                        <Send size={14} />
                      </Button>
                    </div>
                  </CardFooter>
                </TabsContent>
                
                {/* FAQs tab - with clean spacing approach */}
                <TabsContent
                  value="faqs"
                  className="m-0 p-0 border-0 flex flex-col h-full data-[state=active]:m-0"
                >
                  {/* Search and filter section */}
                  <div className="p-1 flex-shrink-0">
                    <p className="text-sm font-medium mb-1">
                      {activeCategory === "All" ? "FAQs:" : `${activeCategory} FAQs:`}
                    </p>
                    <div className="relative mb-0">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                      <Input
                        placeholder="Search FAQs..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          searchFAQs(e.target.value);
                        }}
                        className="pl-7 h-7 text-sm"
                      />
                    </div>
                    <div>
                      <ScrollArea className="whitespace-nowrap">
                        <div className="flex space-x-1 py-0">
                          {faqCategories.map((category) => (
                            <Badge 
                              key={category} 
                              variant={activeCategory === category ? "default" : "outline"}
                              className="cursor-pointer text-xs px-1.5 py-0.5"
                              onClick={() => {
                                setActiveCategory(category);
                                setSearchQuery("");
                                setSuggestedFAQs([]);
                              }}
                            >
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                  
                  {/* FAQ content area */}
                  <ScrollArea className="flex-1 p-0 min-h-0">
                    <div className="p-2 space-y-2">
                      {/* Search results */}
                      {searchQuery && suggestedFAQs.length > 0 ? (
                        <>
                          {suggestedFAQs.map((faq) => (
                            <Card 
                              key={faq.id} 
                              className="cursor-pointer hover:bg-muted/50 transition-colors"
                              onClick={() => handleSelectFAQ(faq)}
                            >
                              <CardContent className="p-2">
                                <h4
                                  className="text-sm font-medium break-words leading-tight"
                                  style={{ 
                                    wordBreak: "break-word",
                                    overflowWrap: "break-word",
                                    hyphens: "auto"
                                  }}
                                >
                                  {faq.question}
                                </h4>
                              </CardContent>
                            </Card>
                          ))}
                        </>
                      ) : searchQuery && suggestedFAQs.length === 0 ? (
                        <div className="text-center py-3">
                          <HelpCircle className="h-6 w-6 mx-auto text-muted-foreground mb-1" />
                          <p className="text-sm text-muted-foreground">No matching FAQs found</p>
                          <Button 
                            variant="link" 
                            className="mt-1 text-xs h-6 p-0"
                            onClick={handleContactSpecialist}
                          >
                            Contact a Specialist
                          </Button>
                        </div>
                      ) : (
                        <>
                          {/* FAQ listings by category - always shown when not searching */}
                          {displayedFAQs.length > 0 ? (
                            displayedFAQs.map((faq) => (
                              <Card 
                                key={faq.id} 
                                className="cursor-pointer hover:bg-muted/50 transition-colors"
                                onClick={() => handleSelectFAQ(faq)}
                              >
                                <CardContent className="p-2">
                                  <h4
                                    className="text-sm font-medium break-words leading-tight"
                                    style={{ 
                                      wordBreak: "break-word",
                                      overflowWrap: "break-word",
                                      hyphens: "auto"
                                    }}
                                  >
                                    {faq.question}
                                  </h4>
                                </CardContent>
                              </Card>
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground text-center py-3">
                              No FAQs available for this category.
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </ScrollArea>
                  
                  {/* Contact information – slimmer */}
                  <div className="p-2 border-t flex-shrink-0 bg-background">
                    <p className="text-xs font-medium mb-2">Need more help?</p>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs h-7 px-2 flex items-center flex-1"
                        onClick={handleContactSpecialist}
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs h-7 px-2 flex items-center flex-1"
                        onClick={handleContactSpecialist}
                      >
                        <Mail className="h-3 w-3 mr-1" />
                        Email
                      </Button>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs h-7 px-2 flex items-center flex-1"
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            Hours
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-60 p-3">
                          <h4 className="text-sm font-medium mb-1">Support Hours</h4>
                          <div className="text-sm space-y-0.5">
                            <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                            <p>Saturday: 9:00 AM - 1:00 PM</p>
                            <p>Sunday: Closed</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Urgent inquiries: Call +267 555-1234
                            </p>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </Card>
      )}
    </>
  );
}