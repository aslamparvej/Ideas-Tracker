import { useUser } from "../lib/context/user";

import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard/Dashboard";
import Loading from "./Loading";

const Home = () => {
  const user = useUser();

  if (user.loading) return <Loading />;

  return (
    <>
      {user.current ? (
        <div className="dashboard-container">
          <Dashboard />
        </div>
      ) : (
        <LandingPage />
      )}
    </>
  );
};

export default Home;
