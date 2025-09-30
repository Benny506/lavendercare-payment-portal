import React, { useEffect, useState } from "react";
import PaystackPop from "@paystack/inline-js";
import { useNavigate, useSearchParams } from "react-router";
import ReferenceBox from "./ReferenceBox";

export default function PaymentPage() {

    const navigate = useNavigate()

    const [searchParams] = useSearchParams();

    const [reference, setReference] = useState('')

    useEffect(() => {
        const amount = searchParams.get("amount")
        const email = searchParams.get("email")
        const user_id = searchParams.get("user_id")
        const provider_id = searchParams.get("provider_id")

        if (!amount || !email) {
            alert("Missing payment details");
            navigate(-1)
            return;
        }

        const paystack = new PaystackPop();

        paystack.newTransaction({
            key: "pk_test_77b7c00c5d7243d94da713ca2c6815eae23f99a5", // 🔑 replace with your public key
            email,
            amount: amount * 100, // 💵 amount in kobo (500000 = ₦5000)
            currency: "NGN",
            reference: user_id && provider_id ? `${Date.now()}-user-${user_id}-provider-${provider_id}` : `${"" + Math.floor(Math.random() * 1000000000 + 1)}`, // unique ref
            onSuccess: (transaction) => {
                // console.log("✅ Payment success:", transaction);
                // window.location.href = `myapp://payment-success?reference=${transaction.reference}`;

                setReference(transaction?.reference)
                navigate("/payment-success", { replace: true })
            },
            onCancel: () => {
                // Optionally redirect somewhere else
                navigate("/payment-failure", { replace: true })
            },
        });
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h2>Redirecting to payment...</h2>
            <p>Please wait while we process your transaction.</p>

            {/* {
                reference
                &&
                    <ReferenceBox 
                        reference={reference}
                    />
            } */}
        </div>
    );
}
