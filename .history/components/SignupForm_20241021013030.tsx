"use client";

import { Button } from '@/components/ui/button'; // Ensure Button is imported from the correct path
import { useState } from 'react'; // Import useState from React

interface SignupFormProps {
  onClose: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string>(''); // useState hook for managing email input

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

        {/* Direct HTML Form Submission */}
        <form
          action="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec" // Replace with your Google Apps Script URL
          method="POST" // Use POST to send the data to Google Apps Script
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email" // Name attribute is necessary to send data
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" size="lg">
            Submit
          </Button>
        </form>

        <Button onClick={onClose} variant="secondary" size="lg" className="mt-4">
          Close
        </Button>
      </div>
    </div>
  );
};

export default SignupForm; // Export the component
