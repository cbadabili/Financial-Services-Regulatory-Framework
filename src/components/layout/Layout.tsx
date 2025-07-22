import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import FAQChatbot from "../chatbot/FAQChatbot"; // Floating FAQ assistant

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
      {/* Floating FAQ Chatbot available on all pages */}
      <FAQChatbot />
    </div>
  );
}