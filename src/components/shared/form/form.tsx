"use client";

import { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    brand: "",
    model: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get current date in the required format
    const currentDate = new Date().toLocaleDateString('en-CA');

    try {
      // Create URL search params object for form data to maintain compatibility with Google Apps Script
      const formData2 = new URLSearchParams();
      formData2.append('DATE', currentDate);
      formData2.append('NAME', formData.name);
      formData2.append('PHONE', formData.phone);
      formData2.append('EMIAL', formData.email); // Using EMIAL to match your Google Sheet column name
      formData2.append('BRAND', formData.brand);
      formData2.append('MODEL', formData.model);
      formData2.append('DESCRIPTION', formData.description);

      const scriptURL = 'https://script.google.com/macros/s/AKfycby6QqWh0-AJ-YETsbPYHtwPmmLxN5QjkVCgFycAxaxrmQNmr1tXpHGohLCMt_sCZixU/exec';

      console.log('Sending data:', formData2.toString());

      const response = await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData2.toString()
      });

      // When using no-cors mode, we can't access response properties
      // So we'll assume success if no error is thrown

      // Since we're using URLSearchParams format, we can't get a proper JSON response
      // So we'll assume success if the request doesn't throw an error
      setMessage("✅ Form submitted successfully!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        brand: "",
        model: "",
        description: ""
      });
    } catch (error) {
      console.error('Error during fetch:', error);
      setMessage(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Number"
          pattern="[0-9]{10}"
          title="Please enter a valid 10-digit mobile number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <select
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select Mobile Brand
          </option>
          <option value="apple">Apple</option>
          <option value="samsung">Samsung</option>
          <option value="xiaomi">Xiaomi</option>
          <option value="oneplus">OnePlus</option>
          <option value="other">Other</option>
        </select>

        <input
          type="text"
          name="model"
          placeholder="Mobile Model"
          value={formData.model}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          cols={20}
          rows={5}
          placeholder="Issue Description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <button
          type="submit"
          className="theme-btn"
          disabled={isSubmitting}
        >
          Send
        </button>
        
        {message && (
          <div className="form-message" style={{ marginTop: '15px', padding: '10px', borderRadius: '5px', backgroundColor: message.includes('✅') ? '#e7f7e7' : '#ffebeb', color: message.includes('✅') ? '#2e7d32' : '#d32f2f' }}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

