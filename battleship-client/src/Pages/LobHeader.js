import shipimg from "../assets/shipimg.jpeg";
import classes from "./LobHeader.module.css";

const LobHeader = () => {
  return (
    <div className={classes["main-image"]}>
      <img src={shipimg} alt="A table food of delicious food!" />
    </div>
  );
};

export default LobHeader;
