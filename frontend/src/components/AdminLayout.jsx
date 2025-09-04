import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-[#111] text-white p-8">{children}</main>
    </div>
  );
};

export default AdminLayout;
