import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Alert = () => {
  const dispatch = useDispatch();
  const alerts = useSelector(state => state.alert); // alert reducer should be array

  return (
    <div >
      {alerts && alerts.length > 0 &&
        alerts.map(alert => (
          <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
          </div>
        ))
      }
    </div>
  );
};

export default Alert;
