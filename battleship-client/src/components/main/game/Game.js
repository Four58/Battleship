import UserContainer from "./boardcontainer/UserContainer";
import EnemyContainer from "./boardcontainer/EnemyContainer";

const Game = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "baseline",
        marginBottom: "1vh",
      }}
    >
      <UserContainer />
      <EnemyContainer />
    </div>
  );
};

export default Game;
