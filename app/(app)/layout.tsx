import DashboardLayout from "./_components/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <DashboardLayout>{children}</DashboardLayout>
    </div>
  );
};
export default Layout;
