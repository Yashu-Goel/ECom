import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, incrementByAmount } from "./CreateSlice";

const Random = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.carts);
  // console.log(state);
  return (
    <div>
      {/* <button onClick={() => dispatch(decrement())}>-</button> */}
      {"Hello"}
      {/* <button onClick={() => dispatch(increment())}>+</button> */}
    </div>
  );
};

export default Random;
