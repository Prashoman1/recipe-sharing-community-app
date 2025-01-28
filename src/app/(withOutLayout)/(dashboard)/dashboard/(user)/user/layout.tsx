import Footer from "../../../_components/footer/footer";
import Header from "../../../_components/header/header";
import UserSideBar from "../_components/sidebar/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <UserSideBar />

        {/* Main Content Area */}
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
