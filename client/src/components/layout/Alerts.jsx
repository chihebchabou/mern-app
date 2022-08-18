import React from 'react';
import { useSelector } from 'react-redux';

const Alerts = () => {
  const alerts = useSelector(state => state.alertReducer);
  return (
    alerts.length > 0 &&
    alerts.map(alert => (
      <div className={`alert alert-${alert.type}`} role="alert">
        <i className="fas fa-info-circle"></i> {alert.msg}
      </div>
    ))
  );
};

export default Alerts;
