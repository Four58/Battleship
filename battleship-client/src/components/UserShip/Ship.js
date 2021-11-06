import "../../BoardGame/BoardGame.css";
import { useEffect } from "react";

const Ship = () => {
  useEffect(() => {
    const square = [];
    const createSquare = () => {
      square.push(<div></div>);
    };
    createSquare();
  });

  return (
    <div className="grid-container">
      <div></div>
    </div>
  );
};

export default Ship;
