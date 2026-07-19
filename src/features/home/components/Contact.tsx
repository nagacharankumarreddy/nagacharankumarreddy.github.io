import emailjs from "@emailjs/browser";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Col, Container, Row } from "react-bootstrap";
import contactImg from "../../../assets/img/contact-img.svg";
import { emailJsConfig } from "../../../lib/env";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  [key: string]: unknown;
}

export const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        formData,
        emailJsConfig.publicKey
      )
      .then(
        (response) => {
          console.log("Email Sent:", response);
          setStatus("Email sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.log("Failed to send email:", error);
          setStatus("Failed to send email.");
        }
      );
  };

  return (
    <section className="contact" id="contact">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <img src={contactImg} alt="Contact Us" />
          </Col>
          <Col size={12} md={6}>
            <h2>Contact Me</h2>
            <form onSubmit={handleSubmit}>
              <Row>
                <Col size={12} sm={6}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                  />
                </Col>
                <Col size={12} sm={6}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                  />
                </Col>
                <Col size={12} sm={6}>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    required
                  ></textarea>
                </Col>
                <Col size={12}>
                  <button type="submit">Send</button>
                </Col>
              </Row>
            </form>
            {status && <p>{status}</p>}
          </Col>
        </Row>
      </Container>
    </section>
  );
};
