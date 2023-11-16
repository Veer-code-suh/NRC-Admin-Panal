import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/database";

function PatientForm() {
  const [patientData, setPatientData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    age: "",
    sex: "",
    occupation: "",
  });

  const [clinicalFeatures, setClinicalFeatures] = useState({
    discharge: {
      option1: false,
      option2: false,
      option3: false,
      option4: false,
      option5: false,
    },
    pain: {
      option1: false,
      option2: false,
      option3: false,
      option4: false,
      option5: false,
    },
    onset: {
      option1: false,
      option2: false,
      option3: false,
      option4: false,
      option5: false,
    },
    duration: {
      option1: false,
      option2: false,
      option3: false,
      option4: false,
      option5: false,
    },
    bowelHabit: {
      option1: false,
      option2: false,
      option3: false,
      option4: false,
      option5: false,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (category, option) => {
    setClinicalFeatures({
      ...clinicalFeatures,
      [category]: {
        ...clinicalFeatures[category],
        [option]: !clinicalFeatures[category][option],
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a reference to the "patients" node in the Firebase database
    const patientRef = firebase.database().ref("patients");

    // Combine patient data with clinical features
    const patientInfoWithFeatures = {
      ...patientData,
      clinicalFeatures,
    };
    patientRef.push(patientInfoWithFeatures);

    // Clear the form and checkbox selections after submission
    setPatientData({
      name: "",
      address: "",
      phoneNumber: "",
      age: "",
      sex: "",
      occupation: "",
    });

    // Reset clinical features checkboxes
    const emptyClinicalFeatures = {
      discharge: {
        option1: false,
        option2: false,
        option3: false,
        option4: false,
        option5: false,
      },
      pain: {
        option1: false,
        option2: false,
        option3: false,
        option4: false,
        option5: false,
      },
      onset: {
        option1: false,
        option2: false,
        option3: false,
        option4: false,
        option5: false,
      },
      duration: {
        option1: false,
        option2: false,
        option3: false,
        option4: false,
        option5: false,
      },
      bowelHabit: {
        option1: false,
        option2: false,
        option3: false,
        option4: false,
        option5: false,
      },
    };
    setClinicalFeatures(emptyClinicalFeatures);

    console.log(
      "Patient information and clinical features submitted to Firebase:",
      patientInfoWithFeatures
    );
  };

  return (
    <div>
      <h2>General Information</h2>
      <form onSubmit={handleSubmit}>
        {/* Form input fields (name, address, phone number, age, sex, occupation) */}
        <br />
        <h2>Clinical Features</h2>
        <h3>Discharge</h3>
        <p>Choose the options that apply:</p>
        {/* Add checkboxes for Discharge options */}
        <br />
        <h3>Pain</h3>
        <p>Choose the options that apply:</p>
        {/* Add checkboxes for Pain options */}
        <br />
        <h3>Onset</h3>
        <p>Choose the options that apply:</p>
        {/* Add checkboxes for Onset options */}
        <br />
        <h3>Duration</h3>
        <p>Choose the options that apply:</p>
        {/* Add checkboxes for Duration options */}
        <br />
        <h3>Bowel Habit</h3>
        <p>Choose the options that apply:</p>
        {/* Add checkboxes for Bowel Habit options */}
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PatientForm;
