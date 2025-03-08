import Footer from "../(dashboard)/_components/footer/footer";
import UserSideBar from "../(dashboard)/dashboard/(user)/_components/sidebar/sidebar";
import Navbar from "./_components/Navbar/Navber";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="hidden lg:inline-block lg:w-[20%] h-screen max-h-screen overflow-hidden relative">
          <UserSideBar />
        </div>
        <div className="w-full lg:w-[80%]">
          <main>{children}</main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
