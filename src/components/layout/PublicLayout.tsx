import { PublicHeader } from "./PublicHeader";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="min-h-[calc(100vh-8rem)]">
        {children}
      </main>
    </div>
  );
}