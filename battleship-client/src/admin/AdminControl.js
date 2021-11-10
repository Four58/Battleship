import classes from "./AdminControl.module.css";
import Card from "../components/UI/Card";

const AdminControl = () => {
  return (
    <div className={classes.container}>
      <Card className={classes.login}>
        <div className={classes.control}>
          <label>Reset room id:</label>
          <input />
          <div className={classes.actions}>
            <button>Confirm</button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminControl;
