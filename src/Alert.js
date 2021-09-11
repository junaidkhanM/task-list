import React, { useContext, useEffect } from 'react';
import { listContext } from './FormInput';

const Alert = () => {
  const {
    alert: { type, msg },
    showAlert,
    list,
  } = useContext(listContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
