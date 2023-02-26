import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Signup from "./components/Signup";
import { getInitialData } from "./store/order-actions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInitialData());
  }, [dispatch]);

  return (
    <div>
      <Signup />
    </div>
  );
}

export default App;
