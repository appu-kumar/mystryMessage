/// write react-email component , firstly install it

import * as React from 'react';
import { Html, Body, Container, Heading, Text, Button } from '@react-email/components';

// Define the props interface
interface OTPEmailProps {
  username: string;
  otp: string;
}

export const OTPEmail: React.FC<OTPEmailProps> = ({ username, otp }) => {
  return (
    <Html lang="en">
      <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', padding: '20px' }}>
        <Container
          style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          }}
        >
          <Heading style={{ fontSize: '20px', marginBottom: '10px', color: '#333' }}>
            Hello {username},
          </Heading>
          <Text style={{ fontSize: '16px', marginBottom: '20px', color: '#555' }}>
            Your One-Time Password (OTP) is:
          </Text>
          <Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#000', marginBottom: '20px' }}>
            {otp}
          </Text>
          <Text style={{ fontSize: '14px', color: '#777', marginBottom: '20px' }}>
            Please use this OTP to proceed with your request. It will expire in 10 minutes.
          </Text>
          <Button
            href="https://yourapp.com/verify"
            style={{
              backgroundColor: '#4CAF50',
              color: '#fff',
              padding: '10px 20px',
              textDecoration: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              fontSize: '16px',
            }}
          >
            Verify Now
          </Button>
        </Container>
      </Body>
    </Html>
  );
};

export default OTPEmail;



