import React from "react";
import { Container, Card, Button } from "react-bootstrap";

export default function PaymentSuccess() {
  return (
    <Container className="d-flex vh-100 justify-content-center align-items-center">
      <Card className="text-center shadow p-4" style={{ borderRadius: "1rem" }}>
        <div className="mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            fill="#6f42c1"
            className="bi bi-check-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 11.03 3.47 7.53l1.06-1.06L6.97 8.91l4.47-4.47 1.06 1.06-5.53 5.53z" />
          </svg>
        </div>
        <h3 className="text-success">Payment Successful</h3>
        <p>Your transaction has been completed successfully.</p>
        {/* <Button
          variant="primary"
          style={{ backgroundColor: "#6f42c1", border: "none" }}
          href="/"
        >
          Continue
        </Button> */}
      </Card>
    </Container>
  );
}
