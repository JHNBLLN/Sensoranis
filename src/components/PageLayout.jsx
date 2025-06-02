import HeaderBar from "./HeaderBar";
import Footer from "./Footer";

const PageLayout = ({ children }) => {
  return (
    <div className="page-container">
      <HeaderBar />
      <main className="content">{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
