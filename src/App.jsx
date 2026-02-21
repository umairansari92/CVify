import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <>
      <AppRoutes />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
