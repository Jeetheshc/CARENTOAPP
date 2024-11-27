import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes"; // Correct path to your router file

const App = () => (
    <RouterProvider router={router} />
);

export default App;
