import emailjs from "@emailjs/browser";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import contactImg from "../../../assets/img/contact-img.svg";
import { emailJsConfig } from "../../../lib/env";

interface ContactFormData {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  [key: string]: unknown;
}

type SendState = "idle" | "sending" | "success" | "error";

export const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  });

  const [sendState, setSendState] = useState<SendState>("idle");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSendState("sending");

    emailjs
      .send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          from_name: formData.from_name,
          from_email: formData.from_email,
          subject: formData.subject,
          message: formData.message,
        },
        emailJsConfig.publicKey
      )
      .then(
        () => {
          setSendState("success");
          setFormData({ from_name: "", from_email: "", subject: "", message: "" });
        },
        (error) => {
          console.error("EmailJS send failed:", error);
          setSendState("error");
        }
      );
  };

  return (
    <section className="contact" id="contact">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={5} className="contact-img-col">
            <img src={contactImg} alt="Contact Me" />
            <div className="contact-details">
              <a href="mailto:nagacharankumarreddy@gmail.com">
                <FaEnvelope /> nagacharankumarreddy@gmail.com
              </a>
              <a href="tel:8309340949">
                <FaPhoneAlt /> +91 8309340949
              </a>
            </div>
          </Col>
          <Col xs={12} md={7}>
            <div className="contact-bx">
              <h2>Let's Connect</h2>
              <p>Have a project in mind or just want to say hi? Drop a message.</p>
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12} sm={6}>
                    <input
                      type="text"
                      name="from_name"
                      value={formData.from_name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                    />
                  </Col>
                  <Col xs={12} sm={6}>
                    <input
                      type="email"
                      name="from_email"
                      value={formData.from_email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      required
                    />
                  </Col>
                  <Col xs={12}>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      required
                    />
                  </Col>
                  <Col xs={12}>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      required
                    ></textarea>
                  </Col>
                  <Col xs={12}>
                    <button
                      type="submit"
                      className="btn-gradient"
                      disabled={sendState === "sending"}
                    >
                      {sendState === "sending" ? "Sending..." : "Send Message"}
                    </button>
                  </Col>
                </Row>
              </form>
              {sendState === "success" && (
                <p className="form-status success">
                  Message sent successfully! I'll get back to you soon.
                </p>
              )}
              {sendState === "error" && (
                <p className="form-status error">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
