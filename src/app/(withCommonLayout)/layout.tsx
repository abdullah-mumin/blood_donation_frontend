import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";

const commonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
};

export default commonLayout;
