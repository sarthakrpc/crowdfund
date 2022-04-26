import { useEffect, useState } from "react";
import styles from "../../../../styles/fundCampaignIndex.module.css";
import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import NetworkImgRender from "../Shareables/NetworkImgRender";

const retDate = () => {
  const d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth();
  let day = d.getDate();
  let minimumDate = new Date(year, month, day);
  let maximumDate = new Date(year + 1, month, day);
  return [minimumDate, maximumDate];
};

const minMaxDate = retDate();
const min = minMaxDate[0];
const max = minMaxDate[1];

const schema = yup.object().shape({
  title: yup.string().required().min(5).max(100),
  description: yup.string().required().min(10).max(6000),
  amount: yup.number().required().positive(),
  deadline: yup
    .date()
    .min(min, `deadline should be equal or later than ${min}`)
    .max(max, `deadline should be equal or earlier than ${max}`)
    .required("deadline required"),
  //   link: yup
  //     .string()
  //     .matches(
  //       /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
  //       "Enter correct url!"
  //     ),
});

const FormPage = ({ nextStep, formValue, handleFormPageData }) => {

  const submitFormData = (e) => {
    nextStep(1);
    handleFormPageData(e.title, e.description, e.amount, e.deadline);
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(e) => submitFormData(e)}
      initialValues={{
        title: formValue.title,
        description: formValue.description,
        amount: formValue.amount,
        deadline: formValue.deadline,
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        isInvalid,
        errors,
      }) => (
        <>
          <div
            className={`${styles.widthControlClass} ${styles.formCtrlOverride} border-0 `}
          >
            <Form
              noValidate
              onSubmit={handleSubmit}
              className={`pt-3 pb-4 px-4 ${styles.formFullWidth}`}
            >
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <span className={styles.requiredAsterik}>*</span>
                <Form.Control
                  type="text"
                  placeholder="Enter Campaign Title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.title ? !!errors.title : null}
                />
                {touched.title && errors.title ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <span className={styles.requiredAsterik}>*</span>
                <Form.Control
                  as="textarea"
                  rows="8"
                  placeholder="Enter Campaign Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.description ? !!errors.description : null}
                />
                {touched.description && errors.description ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>

              <Form.Group controlId="formAmount" className="mb-3">
                <div className="d-flex align-items-baseline">
                  <Form.Label>Target Amount</Form.Label>
                  <span className={styles.requiredAsterik}>*</span>
                  <div className="mx-2 d-flex">
                    <div className={styles.negativeMargin}>
					<NetworkImgRender />
                    </div>
                  </div>
                </div>
                <Form.Control
                  type="number"
                  placeholder="Enter Required Amount"
                  name="amount"
                  value={values.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.amount ? !!errors.amount : null}
                  autoComplete="off"
                />
                {touched.amount && errors.amount ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.amount}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>

              <Form.Group
                controlId="formDate"
                className={`${styles.datePickerCol} mb-3`}
              >
                <Form.Label>Deadline</Form.Label>
                <span className={styles.requiredAsterik}>*</span>
                <Form.Control
                  type="date"
                  className={`${styles.datePickerCol}`}
                  placeholder="Enter Date"
                  name="deadline"
                  value={values.deadline}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.deadline ? !!errors.deadline : null}
                />
                {touched.deadline && errors.deadline ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.deadline}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>

              {/* <Form.Group className="mb-3" controlId="formImage">
                <Form.Label>Upload Image (Max-5)</Form.Label>
                <Form.Control
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  name="image"
                  onChange={handleImage}
                  isInvalid={fileValidation === false}
                  multiple
                  required
                />
                {fileValidation === false ? (
                  <Form.Control.Feedback type="invalid">
                    image is a required field
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>

              <ThumbImage />

              <Form.Group className="mb-3" controlId="formLink">
                <Form.Label>Video Link (YouTube)</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Paste Campaign Video Link"
                  name="link"
                  value={values.link}
                  autoComplete="off"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.link && !!errors.link}
                />
                {touched.link && errors.link ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.link}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group> */}

              <div className="d-flex justify-content-center">
                <Button variant="primary" type="submit">
                  Next
                </Button>
              </div>
            </Form>
          </div>
        </>
      )}
    </Formik>
  );
};

export default FormPage;
