/* import - node_modules */
import React from 'react';
import { createPortal } from 'react-dom';
/* import - CSS */
import styles from './Spinner.module.css';

const SPINNER_ROOT = document.querySelector('#spinner-root');

/*
 * COMPONENT
 */
const Spinner = () =>
  createPortal(
    <div className={styles.backDrop}>
      <div className={styles.loader}>
        <div className={`${styles.face} ${styles.face1}`}>
          <div className={styles.circle} />
        </div>
        <div className={`${styles.face} ${styles.face2}`}>
          <div className={styles.circle} />
        </div>
      </div>
    </div>,
    SPINNER_ROOT,
  );

export default Spinner;
