import {
  useStripe,
  useElements,
  CardElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY!);
function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the client secret from the backend
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          console.error(
            "Failed to fetch client secret:",
            data.error || "Unknown error"
          );
        }
      })
      .catch((err) => console.error("Error fetching client secret:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      alert("Stripe or client secret is not properly initialized.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      alert("Card Element not found.");
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: "User Name", // Replace with dynamic user data if required
          },
        },
      }
    );

    if (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    } else if (paymentIntent?.status === "succeeded") {
      console.log("Payment successful:", paymentIntent);
      alert("Payment successful! Thank you.");
    }
  };

return (
    <form onSubmit={handleSubmit} className="space-y-4 my-4">
        <div className="border border-gray-300 rounded-md p-4 bg-white shadow-md">
            <CardElement
                options={{
                    style: {
                        base: {
                            color: "red",
                            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                            fontSize: "16px",
                            "::placeholder": { color: "#aab7c4" },
                        },
                        invalid: { color: "#9e2146" },
                    },
                }}
            />
        </div>
        <button
            type="submit"
            disabled={!stripe || !clientSecret}
            className="w-full py-2 my-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
        >
            Pay $100
        </button>
    </form>
);
}

export default function StripePayment() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
