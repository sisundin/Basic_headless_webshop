import React from 'react';
import FormField from "./FormField";

const BillingDetailsFields = () => {
  return (
    <>
      <FormField
        name="name"
        label="Name"
        type="text"
        placeholder="Simon Sundin"
        required
      />
      <FormField
        name="email"
        label="Email"
        type="email"
        placeholder="simon.sundin@mail.com"
        required
      />
      <FormField
        name="address"
        label="Address"
        type="text"
        placeholder="Andra Lång 2"
        required
      />
      <FormField
        name="city"
        label="City"
        type="text"
        placeholder="Stockholm"
        required
      />
      <FormField
        name="zip"
        label="Zip code"
        type="text"
        placeholder="95592"
        required
      />
      <FormField
        name="phone"
        label="Phone number"
        type="text"
        placeholder="07X XXX XX XX"
        required
      />
    </>
  );
};

export default BillingDetailsFields;
