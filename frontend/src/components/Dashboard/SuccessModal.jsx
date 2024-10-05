import styles from './SuccessModal.module.css';

const SuccessModal = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default SuccessModal;
