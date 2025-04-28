import Menu from "../components/Menu";

const DashBoardPage: React.FC = () => {
  return (
    <>
      <div className="w-screen h-screen relative flex justify-center items-center">
        <Menu />
        <h1>Tổng quan</h1>
      </div>
    </>
  );
};

export default DashBoardPage;
