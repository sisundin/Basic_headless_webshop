import React from 'react';
import styled from "@emotion/styled";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";


const Container = styled.div`
  width: 100%;
  margin: 30px auto 0 auto;
  text-align: center;
  color: #fff;
`;

const Title = styled.div`
  font-size: 58px;
  margin-top: 200px;
  text-align: center;
`;

const Message = styled.div`
  margin-top: 200px;
  text-align: center;
  font-size: 15px;

`;

const Success =  () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }, 100);
  });

  return (
    <div><Title>congrats!</Title>
      <Container>
        <Confetti width={width} height={height} numberOfPieces={450} />
          
        <Message>Stripe has successfully processed your payment</Message>
      </Container>
    </div>
  );
};


export default Success; 