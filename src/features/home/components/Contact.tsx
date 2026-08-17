import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import contactImg from "../../../assets/img/contact-img.svg";
import { useMagneticButton } from "../../cursor/useMagneticButton";
import { emailJsConfig } from "../../../lib/env";

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const },
  }),
};

interface ContactFormData {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  [key: string]: unknown;
}

type SendState = "idle" | "sending" | "success" | "error";

export const Contact = () => {
  const magneticRef = useMagneticButton<HTMLButtonElement>();
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
                    <motion.input
                      custom={0}
                      variants={fieldVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.4 }}
                      type="text"
                      name="from_name"
                      value={formData.from_name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                    />
                  </Col>
                  <Col xs={12} sm={6}>
                    <motion.input
                      custom={1}
                      variants={fieldVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.4 }}
                      type="email"
                      name="from_email"
                      value={formData.from_email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      required
                    />
                  </Col>
                  <Col xs={12}>
                    <motion.input
                      custom={2}
                      variants={fieldVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.4 }}
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      required
                    />
                  </Col>
                  <Col xs={12}>
                    <motion.textarea
                      custom={3}
                      variants={fieldVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.4 }}
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      required
                    ></motion.textarea>
                  </Col>
                  <Col xs={12}>
                    <motion.button
                      custom={4}
                      variants={fieldVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.4 }}
                      whileTap={{ scale: 0.96 }}
                      ref={magneticRef}
                      type="submit"
                      className="btn-gradient"
                      disabled={sendState === "sending"}
                    >
                      {sendState === "sending" ? "Sending..." : "Send Message"}
                    </motion.button>
                  </Col>
                </Row>
              </form>
              <AnimatePresence mode="wait">
                {sendState === "success" && (
                  <motion.p
                    key="success"
                    className="form-status success"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    Message sent successfully! I'll get back to you soon.
                  </motion.p>
                )}
                {sendState === "error" && (
                  <motion.p
                    key="error"
                    className="form-status error"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    Something went wrong. Please try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
