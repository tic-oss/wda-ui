import React from "react";
import { Heading, Container } from "@chakra-ui/react";
import Footer from "../Footer/Footer";
import "./contact.css";

function Contact() {
  return (
    <>
      <Container maxW="2xl" marginTop="16px">
        <Heading size="xl" fontWeight="extrabold" mb={4} marginBottom="50px">
          Contact Us
        </Heading>
        <Heading size="s" fontWeight="extrabold" mb={4} marginBottom="10px">
          We're here to help! If you have any questions or need support, please
          don't hesitate to get in touch with us.
        </Heading>
        <br />
        <p className="textStyle">
          Have a question?{" "}
          <a
            href="https://github.com/orgs/tic-oss/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className="linkStyle"
          >
            Click here
          </a>{" "}
          to post it on our discussion forum.
        </p>
        <br />
        <p className="textStyle">Email:</p>
        <p>tic.dev@comakeit.com</p>
        <br />
        <p className="textStyle">Phone:</p>
        <p> 040 4035 1000</p>
        <br />
        <p className="textStyle">Social Media:</p>
        <p>Twitter: @tic-dev_support</p>
        <p>Facebook: facebook.com/tic-dev_support</p>
        <br />
        <p className="textStyle">Address:</p>
        <p>
          9th Floor, Aurobindo Galaxy Plot No. 1, Forming part of Sy. No. 83/1,
          Hyderabad Knowledge City, TSIIC Raidurgam (Panmaktha) Village,
          Serilingampally, Hyderabad, Telangana 500019
        </p>
        <br />

        <Heading size="s" fontWeight="extrabold" mb={4} marginBottom="10px">
          Feel free to contact us using any of the methods above, and we'll get
          back to you as soon as possible. Thank you for using our app!
        </Heading>
      </Container>
      <Footer />
    </>
  );
}

export default Contact;
