import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function PaymentFailure() {

    const navigate = useNavigate()

    return (
        <Container className="d-flex vh-100 justify-content-center align-items-center">
            <Card className="text-center shadow p-4" style={{ borderRadius: "1rem" }}>
                <div className="mb-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="64"
                        fill="red"
                        className="bi bi-x-circle-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646 8 7.293l2.646-2.647.708.708L8.707 8l2.647 2.646-.708.708L8 8.707l-2.646 2.647-.708-.708L7.293 8 4.646 5.354l.708-.708z" />
                    </svg>
                </div>
                <h3 className="text-danger">Payment Failed</h3>
                <p>We couldn’t process your transaction. Please try again.</p>
                <Button
                    variant="primary"
                    style={{ backgroundColor: "#6f42c1", border: "none" }}
                    onClick={() => navigate('/', { replace: true })}
                >
                    Try Again
                </Button>
            </Card>
        </Container>
    );
}
