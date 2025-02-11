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
      <div className="flex mt-20">
      <div className="w-[20%]">
        <UserSideBar />
        </div>

        {/* Main Content Area */}
        <main className="w-[80%] bg-gray-50 min-h-screen px-10 py-6">{children}</main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
