import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const containerStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

function RiderSuccess() {
  return (
    <div style={containerStyle}>
      <Result
        status="success"
        title="Thank You for Registering"
        subTitle="You have successfully registered as a rider."
        extra={[
          <Link to="/login" key="login">
            {/* <Button type="primary">Login</Button> */}
          </Link>,
        ]}
      />
    </div>
  );
}

export default RiderSuccess;
