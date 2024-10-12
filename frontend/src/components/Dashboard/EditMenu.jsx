import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllItems,
  fetchMenuItems,
  updateItemOnMenu,
  deleteItem,
} from "../../store/item";
import styles from "./EditMenu.module.css";
import Modal from "./DeleteModal";
import BackToTopButton from "../UI/BackToTopButton";

const EditMenu = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.menu.items);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchAllItems());
  }, [dispatch]);

  const handleCheckboxChange = async (id, currentStatus) => {
    dispatch(updateItemOnMenu({ id, onMenu: !currentStatus }));
    dispatch(fetchMenuItems());
  };

  const openDeleteModal = (id) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (itemToDelete !== null) {
      await dispatch(deleteItem(itemToDelete));
      setIsModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  const renderItems = (itemsList) =>
    itemsList.map((item) => (
      <div key={item.id} className={styles.itemRow}>
        <img src={item.imageUrl} alt={item.name} className={styles.thumbnail} />
        <span className={styles.name}>{item.name}</span>
        <input
          type="checkbox"
          checked={item.onMenu}
          onChange={() => handleCheckboxChange(item.id, item.onMenu)}
          className={styles.checkbox}
        />
        <button
          onClick={() => openDeleteModal(item.id)}
          className={styles.deleteButton}
        >
          Delete
        </button>
      </div>
    ));

  const onMenuItems = items
    .filter((item) => item.onMenu)
    .sort((a, b) => a.name.localeCompare(b.name));
  const offMenuItems = items
    .filter((item) => !item.onMenu)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={styles.container}>
      <div className={styles.onMenuSection}>
        <h2 className={styles.sectionTitle}>On Menu</h2>
        <p className={styles.smallText2}>
          Total number of items on menu: {onMenuItems.length}
        </p>
        <p className={styles.smallText}>
          Check = add to menu &nbsp;&nbsp; || &nbsp;&nbsp; Uncheck = remove from
          menu
        </p>
        {renderItems(onMenuItems)}
      </div>
      <div className={styles.offMenuSection}>
        <h2 className={styles.sectionTitle}>Off Menu</h2>
        <p className={styles.smallText2}>
          Total number of items off menu: {offMenuItems.length}
        </p>
        {renderItems(offMenuItems)}
      </div>
      <BackToTopButton />
      <Modal
        isOpen={isModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        message="Are you sure you want to completely remove this item from the database?"
      />
    </div>
  );
};

export default EditMenu;
