import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen relative z-10">
      <Sidebar />
      <main 
        className="flex-1 p-8 md:p-12"
        style={{ marginLeft: 'var(--sidebar-width)' }}
      >
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
