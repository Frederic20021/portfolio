"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react';
import emailjs from "@emailjs/browser";

// Define the component
const NewsLetterForm = () => {
    // State hooks for email input and loading status
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Handler for email input change
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Reset error message

        try {
            const result = await emailjs.send(
                "service_mvj6kjl", // Replace with your EmailJS service ID
                "template_ihn0p5u", // Replace with your EmailJS template ID
                {
                    from_name: email.substring(0, email.indexOf("@")),
                    from_email: email,
                    to_name: email.substring(email.indexOf("@")),
                    to_email: "frederic123.bf@gmail.com",
                },
                "6QoeQf_j3aOl01Tut" // Replace with your EmailJS public key
            );
            console.log('Success:', result);
            setEmail(''); // Clear the input after successful submission
        } catch (error) {
            console.error('Error sending email:', error);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center p-4 justify-center">
            <form onSubmit={handleSubmit} className="flex bg-blue-500 justify-center p-2 w-full max-w-md">
                <div>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email"
                        className="p-2 text-black border rounded-md"
                        required
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded-md"
                        disabled={loading || !email}
                    >
                        {loading ? 'Submitting...' : 'Subscribe'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewsLetterForm;