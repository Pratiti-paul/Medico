import { useState } from "react";
import API from "../services/api";
import "./Feedback.css";

const Feedback = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await API.post("/feedback", form);
      setStatus("Thank you for your feedback ❤️");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="feedback-section">
      <h2>Send Us Your Feedback</h2>
      <p>We value your thoughts and suggestions.</p>

      <form className="feedback-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Your Feedback"
          rows="4"
          value={form.message}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Feedback</button>
      </form>

      {status && <p className="feedback-status">{status}</p>}
    </section>
  );
};

export default Feedback;
