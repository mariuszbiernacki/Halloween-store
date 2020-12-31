import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FormH2 = styled.h2`
  margin: 20px;
  font-size: 40px;
  color: grey;
  padding: 20px;
`;
const FormFormik = styled(Formik)`
  color: black;
`;
const FormForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FormField1 = styled(Field)`
  font-size: 30px;
  width: 400px;
  margin: 5px;
  resize: none;
`;
const FormField2 = styled(Field)`
  font-size: 30px;
  width: 400px;
  height: 200px;
  margin: 5px;
  resize: none;
`;
const FormBtn = styled.button`
  margin-top: 20px;
  font-size: 30px;
  padding: 12px 20px;
  border-radius: 20px;
  background-color: yellow;
`;

const validSchema = Yup.object().shape({
  email: Yup.string()
    .email("your e-mail maust be valid")
    .required("enter e-mail"),
  message: Yup.string().required("enter message"),
});

const FormikContactForm = () => {
  return (
    <FormDiv>
      <FormH2>Contact us</FormH2>
      <FormFormik
        initialValues={{ email: "", message: "" }}
        validationSchema={validSchema}
        onSubmit={(values) => {
          values.email = "";
          values.message = "";
        }}
      >
        {({ values }) => (
          <FormForm>
            <FormField1
              id="email"
              name="email"
              type="email"
              placeholder="your e-mail"
              value={values.email}
            />
            <ErrorMessage name="email" />
            <FormField2
              id="message"
              name="message"
              type="message"
              placeholder="your message"
              component="textarea"
              value={values.message}
            />
            <ErrorMessage name="message" />
            <FormBtn type="submit">Send</FormBtn>
          </FormForm>
        )}
      </FormFormik>
    </FormDiv>
  );
};

export default FormikContactForm;
