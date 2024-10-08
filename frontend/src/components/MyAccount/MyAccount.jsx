import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserOrders } from "../../store/order";
import { updateUserInfo } from "../../store/session";
import "./MyAccount.css";

const MyAccount = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [view, setView] = useState("orders");
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState(user?.address || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || "");

  const ordersState = useSelector((state) => state.orders);
  const orders = ordersState?.orders || [];
  const status = ordersState?.status || "idle";
  const error = ordersState?.error || null;

  useEffect(() => {
    if (user) {
      dispatch(fetchUserOrders(user.id));
    }
  }, [dispatch, user]);

  const handleToggleView = (newView) => {
    setView(newView);
  };

  const handleToggleOrder = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await dispatch(updateUserInfo(user.id, { address, phone: phoneNumber }));
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const formatCurrency = (value) => {
    const number = parseFloat(value);
    if (!isNaN(number)) {
      return number.toFixed(2);
    }
    return "0.00";
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="my-account-page">
      <div className="my-account-view-toggle">
        <button onClick={() => handleToggleView("orders")}>Orders</button>
        <button onClick={() => handleToggleView("info")}>My Information</button>
      </div>

      {view === "orders" && (
        <div className="my-account-orders-view">
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="my-account-order">
                <div
                  className="my-account-order-summary"
                  onClick={() => handleToggleOrder(order.id)}
                >
                  <p>Order ID: {order.id}</p>
                  <p>
                    Created: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p>Total: ${formatCurrency(order.total)}</p>
                  <button>
                    {expandedOrderId === order.id ? "Collapse" : "Expand"}
                  </button>
                </div>
                {expandedOrderId === order.id && (
                  <div className="my-account-order-details">
                    <p>
                      Delivery Date:{" "}
                      {order.Route?.deliveryDate
                        ? new Date(
                            order.Route.deliveryDate
                          ).toLocaleDateString()
                        : "Not scheduled"}
                    </p>
                    <h4>Items:</h4>
                    {order.Items &&
                      order.Items.map((item) => (
                        <div key={item.id} className="my-account-order-item">
                          <p className="item-name">{item.name}</p>
                          <p className="item-price">
                            ${formatCurrency(item.OrderItems?.pricePerUnit)} x{" "}
                            {item.OrderItems.quantity} {item.OrderItems.measure}
                          </p>
                          <p className="item-subtotal">
                            Subtotal: $
                            {formatCurrency(
                              item.OrderItems.pricePerUnit *
                                item.OrderItems.quantity
                            )}
                          </p>
                        </div>
                      ))}
                    <p className="order-total">
                      Total: ${formatCurrency(order.total)}
                    </p>
                    <p>Status: {order.status || "Pending"}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {view === "info" && (
        <div className="my-account-info-view">
          <h3>My Information</h3>
          {isEditing ? (
            <>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
              />
              <button onClick={handleSave}>Save</button>
            </>
          ) : (
            <>
              <p>First Name: {user.firstName}</p>
              <p>Last Name: {user.lastName}</p>
              <p>Address: {user.address}</p>
              <p>Phone Number: {user.phone}</p>
              <button onClick={handleEdit}>Edit</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MyAccount;
