import React from 'react';
import styled from "@emotion/styled";

const FormFieldContainer = styled.div`
  display: -ms-flexbox;
  display: flex;
 
`;

const Label = styled.label`
  width: 20%;
  min-width: 70px;
  padding: 11px 0;
  overflow: hidden;
  font-size:  10px;
 
`;

const Input = styled.input`
  width: 100%;
  padding: 5px 15px 5px 8px;
  opacity: 0.9;
`;

const FormField = ({ label, type, name, placeholder, required }) => {
  return (
    <FormFieldContainer style={{"box-shadow":"null"}}>
      <Label htmlFor={name}>{label}</Label>
      <Input name={name} type={type} placeholder={placeholder} required />
    </FormFieldContainer>
  );
};

export default FormField;