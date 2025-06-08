import Content from "../../components/ui/Content";

const UserDashboard = () => {
  return (
    <div className="bg-white bg-opacity-30 backdrop-blur-lg p-10 rounded-3xl shadow-2xl text-center">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        <Content>Dashboard</Content>
      </h2>
      <p className="text-lg text-gray-700">
        <Content>
          Welcome to Nyaya Path! Navigate using the sidebar to file or track
          cases.
        </Content>
      </p>
    </div>
  );
};

export default UserDashboard;
