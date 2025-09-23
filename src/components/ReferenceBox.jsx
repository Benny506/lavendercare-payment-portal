import React, { useState } from "react";
import { Card, Button, InputGroup, FormControl } from "react-bootstrap";

export default function ReferenceBox({ reference }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // reset after 2s
  };

  return (
    <Card style={{ maxWidth: "400px", margin: "20px auto", textAlign: "center" }}>
      <Card.Body>
        <Card.Title>Transaction Reference</Card.Title>
        <InputGroup className="mb-3">
          <FormControl value={reference} readOnly />
          <Button variant="outline-primary" onClick={handleCopy}>
            {copied ? "Copied!" : "Copy"}
          </Button>
        </InputGroup>
        <Card.Text>
          You will require this in you app
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
