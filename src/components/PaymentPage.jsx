import React, { useEffect } from "react";
import PaystackPop from "@paystack/inline-js";

export default function PaymentPage() {
  useEffect(() => {
    const paystack = new PaystackPop();

    paystack.newTransaction({
      key: "pk_test_77b7c00c5d7243d94da713ca2c6815eae23f99a5", // 🔑 replace with your public key
      email: "customer@email.com",
      amount: 500000, // 💵 amount in kobo (500000 = ₦5000)
      currency: "NGN",
      reference: "" + Math.floor(Math.random() * 1000000000 + 1), // unique ref
      onSuccess: (transaction) => {
        console.log("✅ Payment success:", transaction);

        // 🔹 Redirect back to your app with the reference
        window.location.href = `myapp://payment-success?reference=${transaction.reference}`;
      },
      onCancel: () => {
        console.log("❌ Payment cancelled");
        // Optionally redirect somewhere else
        window.location.href = "/cancelled"; 
      },
    });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Redirecting to payment...</h2>
      <p>Please wait while we process your transaction.</p>
    </div>
  );
}
