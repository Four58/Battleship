import shipimg from "../../../assets/shipimg.jpeg";
import classes from "./LobHeader.module.css";

const LobHeader = () => {
  return (
    <div className={classes["main-image"]}>
      <a href="/credit">
        <img src={shipimg} alt="Ship shooting!" />
      </a>
    </div>
  );
};

export default LobHeader;
