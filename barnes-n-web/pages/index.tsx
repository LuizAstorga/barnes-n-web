import type { NextPage } from "next";
import ExampleComponent from "./components/ExampleComponent";
import Container from "react-bootstrap/Container";
import React from 'react';
import TempPages from "./components/TempPages";
import Header from "./components/Header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Login from "./Login";
import { Button } from "react-bootstrap";

const Home: NextPage = () => {
  return (
    <div className="page">
      {/* Header Component */}
      <Header />

      <Container fluid="sm" className="">
        <Row >
          <Col className='homepageTitle'>
            Welcome to Barnes-n-Web!
          </Col>
        </Row>

        <Row >
          <Col className='homepageBody'>
            Scared of commitment but love physical books you can hold?  <br />
            Then you've come to the right place!  <br />
            Barnes-n-Web provides a safe way to borrow books from others!  <br />
          </Col>
        </Row>

        {/* move the button to the right. */}
        <Row>
          <Button
            className='submissionButton'
            name='getStarted'
            onClick={Login}
            variant="primary"> Get Started </Button>
        </Row>

        <Row >
          <Col className='homepageBodyTitle'>
            How it works
          </Col>
        </Row>

        {/* this will be better lmao */}
        <Row >
          <Col className='homepageBody'>
          Create an account.              Search for the book you're looking for.            Borrow the book! <br />

            It's that easy.
          </Col>
        </Row>


      </Container>
    </div>

  );
};

export default Home;
