import styles from './LoadingSpinner.module.css';

const LoadingSpinner = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.spinnerOverlay}>
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.message}>Uploading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
