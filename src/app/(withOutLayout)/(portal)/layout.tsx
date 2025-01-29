import Footer from "../(dashboard)/_components/footer/footer";
import Navbar from "./_components/Navbar/Navber";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar/>
      <main>{children}</main>
      <Footer/>
    </div>
  );
}
