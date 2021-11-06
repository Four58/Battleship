import classes from "./MainHeader.module.css";
import Nav from "./Nav";

const MainHeader = () => {
  return (
    <header className={classes["main-header"]}>
      <h1>BattleShip</h1>
      <Nav />
    </header>
  );
};

export default MainHeader;
