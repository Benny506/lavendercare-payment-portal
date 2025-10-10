import React, { useEffect, useState } from "react";
import PaystackPop from "@paystack/inline-js";
import { useNavigate, useSearchParams } from "react-router";
import ReferenceBox from "./ReferenceBox";
import AppLoading from "./appLoading/AppLoading";
import { requestApi } from "./apiReqs/requestApi";

export default function PaymentPage() {

    const navigate = useNavigate()

    const [searchParams] = useSearchParams();

    const [reference, setReference] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const amount = searchParams.get("amount")
        const email = searchParams.get("email")
        const sender_id = searchParams.get("sender_id")
        const receiver_id = searchParams.get("receiver_id")
        const payment_for = searchParams.get("payment_for")
        const purchase_id = searchParams.get("purchase_id")

        if (!amount || !email) {
            alert("Missing payment details");
            navigate(-1)
            return;
        }

        const paystack = new PaystackPop();

        paystack.newTransaction({
            // key: "pk_test_77b7c00c5d7243d94da713ca2c6815eae23f99a5", // 🔑 test
            key: "pk_live_32b49947478d77ede1cadf2f6a4698d19812f90f", // 🔑 live
            email,
            amount: amount * 100, // 💵 amount in kobo (500000 = ₦5000)
            currency: "NGN",
            reference: (purchase_id && payment_for) ? `${Date.now()}-${payment_for}-${purchase_id}` : `${Date.now()}`, // unique ref
            onSuccess: async (transaction) => {
                // console.log("✅ Payment success:", transaction);
                // window.location.href = `myapp://payment-success?reference=${transaction.reference}`;

                const ref = transaction?.reference

                if(ref && sender_id && receiver_id && payment_for){
                    setIsLoading(true)

                    const requestInfo = {
                        ref, 
                        sender_id,
                        receiver_id,
                        payment_for,
                        purchase_id
                    }

                    await requestApi({
                        url: 'https://tzsbbbxpdlupybfrgdbs.supabase.co/functions/v1/insert-transaction',
                        method: 'POST',
                        data: requestInfo
                    })
                    
                    setIsLoading(false)
                }

                setReference(ref)
                navigate("/payment-success", { replace: true })
            },
            onCancel: () => {
                // Optionally redirect somewhere else
                navigate("/payment-failure", { replace: true })
            },
        });
    }, []);

    // if(isLoading){
    //     return (
    //         <div style={{
    //             width: '100vw', height:"100vh",
    //         }} className="flex items-center justify-center">
    //             <AppLoading tempLoading={isLoading} />
    //         </div>
    //     )
    // }

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>        

            <h2>Redirecting...</h2>
            <p>Please wait while we process your transaction...</p>

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
