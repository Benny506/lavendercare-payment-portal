import React, { useEffect, useState } from "react";
import PaystackPop from "@paystack/inline-js";
import { useNavigate, useSearchParams } from "react-router";
import ReferenceBox from "./ReferenceBox";
import { createClient } from '@supabase/supabase-js'
import AppLoading from "./appLoading/AppLoading";

export const SUPABASE_URL = 'https://tzsbbbxpdlupybfrgdbs.supabase.co'
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6c2JiYnhwZGx1cHliZnJnZGJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NzU0MTEsImV4cCI6MjA2NzU1MTQxMX0.3MPot37N05kaUG8W84JItSKgH2bymVBee1MxJ905XEk'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    realtime: { params: { eventsPerSecond: 10 } },
    debug: true // This will print realtime connection logs
})

export default function PaymentPage() {

    const navigate = useNavigate()

    const [searchParams] = useSearchParams();

    const [reference, setReference] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const amount = searchParams.get("amount")
        const email = searchParams.get("email")
        const user_id = searchParams.get("user_id")
        const provider_id = searchParams.get("provider_id")
        const payment_for = searchParams.get('payment_for')

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
            onSuccess: async (transaction) => {
                // console.log("✅ Payment success:", transaction);
                // window.location.href = `myapp://payment-success?reference=${transaction.reference}`;

                const ref = transaction?.reference
                const sender_id = user_id
                const receiver_id = provider_id

                if(ref && sender_id && receiver_id && payment_for){
                    setIsLoading(true)

                    const requestInfo = {
                        ref, 
                        sender_id,
                        receiver_id,
                        payment_for
                    }

                    const { data, error } = await supabase
                        .from("transactions")
                        .insert(requestInfo)
                    
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

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            
            <AppLoading tempLoading={isLoading} />

            <h2>Redirecting...</h2>
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
