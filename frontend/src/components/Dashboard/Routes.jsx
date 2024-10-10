import styles from "./Routes.module.css";

const Routes = () => {
  return (
    <div className={styles.routes}>
      <h2 className={styles.heading}>Routes</h2>
      <p className={styles.message}>Feature Coming Soon</p>
      <p className={styles.small}>
        This feature is currently under development. When completed, you will
        see:{" "}
      </p>
      <ul className={styles.list}>
        <li>
          A list of currently unfilled orders along with previous delivery
          routes and the orders delivered in that route
        </li>
        <li>
          There will be a button for the business staff to click when they want
          to combine all open orders into a delivery route
        </li>
        <li>
          Once this is done, a new route ID is created to associate future
          orders to
        </li>
        <li>
          Also, the plan is to build a feature to optimize the delivery of the
          orders in a route and somehow connect the route with a gps app making
          it possible for the delivery driver to organize the stops and for
          customers to get estimated and updated time of arrival for their
          order.
        </li>
      </ul>
    </div>
  );
};

export default Routes;
