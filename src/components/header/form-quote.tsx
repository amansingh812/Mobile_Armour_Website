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

      // You'll need to replace this with your actual script URL once deployed
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
      setMessage("✅ Quote request sent successfully!");
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

  // Success message is now displayed inline with the form

  return (
    <div className="quote-form-container">
      <form onSubmit={handleSubmit} className="popup-form">
        <input
          type="text"
          name="name"
          placeholder="Name *"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-input"
          pattern="[0-9]{10}"
          title="Please enter a valid 10-digit mobile number"
        />

        <input
          type="email"
          name="email"
          placeholder="Email *"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
          required
        />

        <select
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="form-select"
        >
          <option value="" disabled>
            Select Brand
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
          placeholder="Model"
          value={formData.model}
          onChange={handleChange}
          className="form-input"
        />

        <textarea
          name="description"
          rows={2}
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="form-textarea"
        ></textarea>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`form-submit-button ${isSubmitting ? 'form-submit-button-disabled' : ''}`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="form-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : 'Submit'}
        </button>

        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
}