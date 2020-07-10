import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import {
      FilePdfOutlined,
      SendOutlined,
      MailOutlined,
} from "@ant-design/icons";
import InputField from "./InputField";
import axios from "axios";



const PrescriptionForm = () => {


      const [name, setName] = useState("no name");
      const [age, setAge] = useState("no age");
      const [symptoms, setSymptoms] = useState("no symptoms");
      const [diagnosis, setDiagnosis] = useState("no diagnosis");
      const [remarks, setRemarks] = useState("no remarks");
      const [loading, setLoading] = useState(false);
      const [medication, setMedication] = useState("no medicines");
      const [, setEmail] = useState("coolestcucumber123@gmail.com");
      const [] = useState(null);

      function handleNameChange(newName) {
            setName(newName);
      }
      function handleAgeChange(newAge) {
            setAge(newAge);
      }

      function handleSymptomsChange(newSymptoms) {
            setSymptoms(newSymptoms);
      }

      function handleDiagnosisChange(newDiagnosis) {
            setDiagnosis(newDiagnosis);
      }

      function handleMedicationChange(newMedication) {
            setMedication(newMedication);
      }

      function handleRemarksChange(newRemarks) {
            setRemarks(newRemarks);
      }

      function handleEmailChange(newEmail){
            setEmail(newEmail);
      }

      function sendPDFReq() {
            if (!loading) setLoading(true);

            axios({
                  method: "POST",
                  url: "https://localhost:44370/generate/pdf",
                  responseType: "blob",
                  withCredentials: true,
                  headers: {
                        "Access-Control-Allow-Origin": "*"
                  },
                  crossdomain: true,
                  data: {
                        Name: name + " ",
                        Age: age + " ",
                        Symptoms: symptoms + " ",
                        Diagnosis: diagnosis + " ",
                        Medication: medication + " ",
                        Remarks: remarks + " ",
                  },
            })
                  .then((result) => {
                        //convert result to base 64
                        const file = new Blob([result.data], { type: "application/pdf" });
                        const fileURL = URL.createObjectURL(file); //Open the URL on new Window
                        window.open(fileURL);

                        //setEncodedString(new Buffer(result.data).toString('base64'))
                  })
                  .catch((error) => {
                        console.log(error);
                        console.log("result = " + typeof error);
                  });
      }

      function sendEmail() {
            axios({
                  method: "GET",
                  url: "https://localhost:44362/WeatherForecast",
                  data: {
                        Name: name + " ",
                        Age: age + " ",
                        Symptoms: symptoms + " ",
                        Diagnosis: diagnosis + " ",
                        Medication: medication + " ",
                        Remarks: remarks + " ",
                  },
            })
                  .then((result) => {
                        console.log(result.data);
                  })
                  .catch((error) => {
                        console.log(error);
                        console.log("result = " + typeof error);
                  });
      }

      return (
            <Form name="nest-messages" onFinish={sendPDFReq}>
                  <Form.Item >
                        <InputField
                              changeHandler={(newName) => handleNameChange(newName)}
                              labelName={"Name"}
                        />
                  </Form.Item>
                  <Form.Item>
                        <InputField
                              changeHandler={(newAge) => handleAgeChange(newAge)}
                              labelName={"Age"}
                        />
                  </Form.Item>
                  <Form.Item>
                        <InputField
                              changeHandler={(newSymptoms) => handleSymptomsChange(newSymptoms)}
                              labelName={"Symptoms"}
                        />
                  </Form.Item>
                  <Form.Item>
                        <InputField
                              changeHandler={(newDiagnosis) => handleDiagnosisChange(newDiagnosis)}
                              labelName={"Diagnosis"}
                        />
                  </Form.Item>
                  <Form.Item>
                        <InputField
                              changeHandler={(newMedication) =>
                                    handleMedicationChange(newMedication)
                              }
                              labelName={"Medication"}
                        />
                  </Form.Item>
                  <Form.Item>
                        <InputField
                              changeHandler={(newRemarks) => handleRemarksChange(newRemarks)}
                              labelName={"Remarks"}
                        />
                  </Form.Item>
                  <center>
                  <Button onClick={sendPDFReq} shape="round" type="primary" style={{minWidth:"30%"}} icon={<FilePdfOutlined />} size={"large"}>
                        Generate PDF
                  </Button>
                  <br />
                  <br />
                  </center>
                  <Form.Item>
                        <Input onChange={ (text) => {handleEmailChange(text)}} placeholder="useEmail" prefix={<MailOutlined />} />
                  </Form.Item>
                  <center>
                  <Button onClick={sendEmail}  shape="round" type = "primary" style={{minWidth:"30%"}} icon={<SendOutlined />} size="large">
                        Send Email
                  </Button>
                  </center>
            </Form>
      );
};

export default PrescriptionForm;
