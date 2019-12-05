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
      <p className={styles.text}>Loading...</p>
    </div>,
    SPINNER_ROOT,
  );

export default Spinner;
