import React, { useState } from "react";
import "./AddData.css";

import "firebase/firestore"; // Import the Firestore module
import { db } from "../Firebase/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";
const AddData = () => {
  const [customDate, setCustomDate] = useState("");
  const [patientData, setPatientData] = useState({
    mrdNumber: "",
    arcNumber: "",
    folderNumber: "",
    name: "",
    address: "",
    phoneNumber: "",
    age: "",
    sex: "",
    occupation: "",
  });

  const [clinicalFeatures, setClinicalFeatures] = useState({
    discharge: {
      None: false,
      Blood: false,
      Pus: false,
      Feaces: false,
      Gas: false,
      Urine: false,
      Abundent: false,
      Less: false,
      Thick: false,
      Thin: false,
      Warm: false,
      Frothy: false,
      Offensive: false,
      Mixed: false,
    },
    pain: {
      None: false,
      Picking: false,
      Cutting: false,
      Throbing: false,
      Burning: false,
      Lehing: false,
      Mixed: false,
      Mild: false,
      Severe: false,
    },
    onset: {
      None: false,
      Acute: false,
      Gradual: false,
    },
    duration: {
      None: false,
      lessthan1: false,
      oneto2: false,
      twoto3: false,
      greaterthan3: false,
    },
    bowelHabit: {
      None: false,
      Normal: false,
      Constipated: false,
      Diarrhoea: false,
      Mucous: false,
      MuscousBlood: false,
      ATSM: false,
      Frquencyperday: false,
    },
  });

  const [typesOfFistula, setTypesOfFistula] = useState({
    None: false,
    InterSphincteric: false,
    TransSphincteric: false,
    SupraSphincteric: false,
    ExtraSphincteric: false,
  });

  const [typesOfBhagandra, setTypesOfBhagandra] = useState({
    None: false,
    Riju: false,
    Shatapoaka: false,
    Ushtragreeva: false,
    Parisravi: false,
    Shambukavarta: false,
    Paikshepi: false,
    Unmargi: false,
  });

  const [typesOfKST, setTypesOfKST] = useState({
    None: false,
    Conventional: false,
    AntIFTAK: false,
    PostIFTAK: false,
    ModLIFT: false,
  });

  const [perianalDermatitis, setPerianalDermatitis] = useState(false);

  const [nearFistula, setNearFistula] = useState({
    None: false,
    Normal: false,
    Inflammed: false,
    Indurated: false,
    Ulcerated: false,
    ExtTag: false,
    Others: false,
  });

  const [tenderness, setTenderness] = useState({
    Present: false,
    Absent: false,
  });

  const [extOpenings, setExtOpenings] = useState({
    number: "",
    distancefromAV: "",
    position: "",
    gkschange: "",
    folllowresult: "",
  });

  const [result, setResult] = useState({
    None: false,
    Cured: false,
    NotCured: false,
  });

  const [blood, setBlood] = useState({
    tlc: "",
    dlc: "",
    n: "",
    m: "",
    l: "",
    e: "",
    b: "",
    nb: "",
    esr: "",
    fbs: "",
    ppbs: "",
    elisafortb: "",
    igg: "",
    igm: "",
    iga: "",
  });
  const [mantostest, setMantosTest] = useState({
    positive: false,
    negative: false,
  });
  const [hiv, setHiv] = useState({
    positive: false,
    negative: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      [name]: value,
    });
  };

  //If you want to extend the handleCheckboxChange function to work with other headings like typesOfFistula, typesOfBhagandra, and typesOfKST, you can create separate functions for each heading. Here's how you can do it:

  const handleClinicalFeaturesCheckboxChange = (category, option) => {
    setClinicalFeatures((prevClinicalFeatures) => ({
      ...prevClinicalFeatures,
      [category]: {
        ...prevClinicalFeatures[category],
        [option]: !prevClinicalFeatures[category][option],
      },
    }));
  };

  const handleFistulaCheckboxChange = (option) => {
    setTypesOfFistula((prevTypesOfFistula) => ({
      ...prevTypesOfFistula,
      [option]: !prevTypesOfFistula[option],
    }));
  };

  const handleBhagandraCheckboxChange = (option) => {
    setTypesOfBhagandra((prevTypesOfBhagandra) => ({
      ...prevTypesOfBhagandra,
      [option]: !prevTypesOfBhagandra[option],
    }));
  };

  const handleKSTCheckboxChange = (option) => {
    setTypesOfKST((prevTypesOfKST) => ({
      ...prevTypesOfKST,
      [option]: !prevTypesOfKST[option],
    }));
  };

  const handlePerianalDermatitisChange = (e) => {
    setPerianalDermatitis(e.target.checked);
  };

  const handleNearFistulaCheckboxChange = (option) => {
    setNearFistula((prevNearFistula) => ({
      ...prevNearFistula,
      [option]: !prevNearFistula[option],
    }));
  };

  const handleTendernessCheckboxChange = (option) => {
    setTenderness((prevTenderness) => ({
      ...prevTenderness,
      [option]: !prevTenderness[option],
    }));
  };
  const handleCustomDateChange = (e) => {
    setCustomDate(e.target.value);
  };

  const handleResultCheckboxChange = (option) => {
    setResult((prevResult) => ({
      ...prevResult,
      [option]: !prevResult[option],
    }));
  };
  const handleMantosTestCheckboxChange = (option) => {
    setMantosTest((prevMantosTest) => ({
      ...prevMantosTest,
      [option]: !prevMantosTest[option],
    }));
  };
  const handleHivCheckboxChange = (option) => {
    setHiv((prevHiv) => ({
      ...prevHiv,
      [option]: !prevHiv[option],
    }));
  };

  //////////////////////////////////////////////////
  //////////////////////////////////////////////////

  const isClinicalFeaturesChecked = () => {
    const { discharge, pain, onset, duration, bowelHabit } = clinicalFeatures;
    return (
      Object.values(discharge).some((value) => value) ||
      Object.values(pain).some((value) => value) ||
      Object.values(onset).some((value) => value) ||
      Object.values(duration).some((value) => value) ||
      Object.values(bowelHabit).some((value) => value)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Extract year, month, and day
    const fullDate = customDate;

    // Create a string for the full date

    // Combine patient data with clinical features
    const patientInfoWithFeatures = {
      date: fullDate,
      ...patientData,
      clinicalFeatures,
      typesOfFistula,
      typesOfBhagandra,
      typesOfKST,
      perianalDermatitis,
      nearFistula,
      tenderness,
      ...extOpenings,
      result,
      ...blood,
      mantostest,
      hiv,
    };

    if (
      !patientData.mrdNumber ||
      !patientData.arcNumber ||
      !patientData.folderNumber ||
      !patientData.name ||
      !patientData.address ||
      !patientData.phoneNumber ||
      !patientData.age ||
      !patientData.sex ||
      !patientData.occupation
    ) {
      alert("All fields are mandatory. Please fill out all required fields.");
      return; // Exit the function to prevent submitting incomplete data
    }

    try {
      // Add the patient data to Firestore
      const docRef = addDoc(
        collection(db, "PatientData"),
        patientInfoWithFeatures
      );

      // Clear the form and checkbox selections after submission
      setPatientData({
        mrdNumber: "",
        arcNumber: "",
        folderNumber: "",
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
          None: false,
          Blood: false,
          Pus: false,
          Feaces: false,
          Gas: false,
          Urine: false,
          Abundent: false,
          Less: false,
          Thick: false,
          Thin: false,
          Warm: false,
          Frothy: false,
          Offensive: false,
          Mixed: false,
        },
        pain: {
          None: false,
          Picking: false,
          Cutting: false,
          Throbing: false,
          Burning: false,
          Lehing: false,
          Mixed: false,
          Mild: false,
          Severe: false,
        },
        onset: {
          None: false,
          Acute: false,
          Gradual: false,
        },
        duration: {
          None: false,
          lessthan1: false,
          oneto2: false,
          twoto3: false,
          greaterthan3: false,
        },
        bowelHabit: {
          None: false,
          Normal: false,
          Constipated: false,
          Diarrhoea: false,
          Mucous: false,
          MuscousBlood: false,
          ATSM: false,
          Frquencyperday: false,
        },
      };
      setClinicalFeatures(emptyClinicalFeatures);

      const emptyTypesOfFistula = {
        None: false,
        InterSphincteric: false,
        TransSphincteric: false,
        SupraSphincteric: false,
        ExtraSphincteric: false,
      };
      setTypesOfFistula(emptyTypesOfFistula);
      const emptyTypesOfBhagandra = {
        None: false,
        Riju: false,
        Shatapoaka: false,
        Ushtragreeva: false,
        Parisravi: false,
        Shambukavarta: false,
        Paikshepi: false,
        Unmargi: false,
      };
      setTypesOfBhagandra(emptyTypesOfBhagandra);

      const emptyTypesOfKST = {
        None: false,
        Conventional: false,
        AntIFTAK: false,
        PostIFTAK: false,
        ModLIFT: false,
      };
      setTypesOfKST(emptyTypesOfKST);

      const emptyNearFistula = {
        None: false,
        Normal: false,
        Inflammed: false,
        Indurated: false,
        Ulcerated: false,
        ExtTag: false,
        Others: false,
      };
      setNearFistula(emptyNearFistula);

      setPerianalDermatitis(false);

      const emptyTenderness = {
        Present: false,
        Absent: false,
      };
      setTenderness(emptyTenderness);

      const emptyExtOpenings = {
        number: "",
        distancefromAV: "",
        position: "",
        gkschange: "",
        folllowresult: "",
      };
      setExtOpenings(emptyExtOpenings);

      const emptyResult = {
        None: false,
        Cured: false,
        NotCured: false,
      };
      setResult(emptyResult);

      setCustomDate("");

      const emptyBlood = {
        tlc: "",
        dlc: "",
        n: "",
        m: "",
        l: "",
        e: "",
        b: "",
        nb: "",
        esr: "",
        fbs: "",
        ppbs: "",
        elisafortb: "",
        igg: "",
        igm: "",
        iga: "",
      };
      setBlood(emptyBlood);

      alert("Data uploaded successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);

      alert("Error uploading data. Please try again later.");
    }
  };

  return (
    <div className="Container">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="mainheading">Add Patient Data</h1>
        <h2>General Information</h2>
        <label>
          Date:
          <input
            type="date"
            min="2000-01-01"
            name="customDate"
            value={customDate}
            onChange={handleCustomDateChange}
          />
        </label>
        <label>
          MRD Number:
          <input
            type="number"
            name="mrdNumber"
            value={patientData.mrdNumber}
            onChange={handleInputChange}
          />
        </label>
        <label>
          ARC Number:
          <input
            type="number"
            name="arcNumber"
            value={patientData.arcNumber}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Folder Number:
          <input
            type="number"
            name="folderNumber"
            value={patientData.folderNumber}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Patient Name:
          <input
            type="text"
            name="name"
            value={patientData.name}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Address:
          <input
            type="text"
            name="address"
            value={patientData.address}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Phone Number:
          <input
            type="number"
            name="phoneNumber"
            value={patientData.phoneNumber}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Age:
          <input
            type="number"
            name="age"
            value={patientData.age}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Sex:
          <select
            name="sex"
            value={patientData.sex}
            onChange={handleInputChange}
          >
            <option value="">---Choose the Sex---</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
          Occupation:
          <input
            type="text"
            name="occupation"
            value={patientData.occupation}
            onChange={handleInputChange}
          />
        </label>

        <h2>Clinical Features</h2>
        <h4>Discharge</h4>

        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.discharge.None}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("discharge", "None")
            }
          />
          None
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.discharge.Blood}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("discharge", "Blood")
            }
          />
          Blood
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.discharge.Pus}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("discharge", "Pus")
            }
          />
          Pus
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.discharge.Feaces}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("discharge", "Feaces")
            }
          />
          Feaces
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.discharge.Gas}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("discharge", "Gas")
            }
          />
          Gas
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.discharge.Urine}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("discharge", "Urine")
            }
          />
          Urine
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.discharge.Abundent}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("discharge", "Abundent")
            }
          />
          Abundent
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.discharge.Less}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("discharge", "Less")
            }
          />
          Less
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.discharge.Thick}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("discharge", "Thick")
            }
          />
          Thick
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.discharge.Thin}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("discharge", "Thin")
            }
          />
          Thin
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.discharge.Warm}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("discharge", "Warm")
            }
          />
          Warm
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.discharge.Frothy}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("discharge", "Frothy")
            }
          />
          Frothy
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.discharge.Offensive}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("discharge", "Offensive")
            }
          />
          Offensive
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.discharge.Mixed}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("discharge", "Mixed")
            }
          />
          Mixed
        </label>

        <h4>Pain</h4>

        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.pain.None}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("pain", "None")
            }
          />
          None
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.pain.Picking}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("pain", "Picking")
            }
          />
          Picking
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.pain.Cutting}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("pain", "Cutting")
            }
          />
          Cutting
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.pain.Throbing}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("pain", "Throbing")
            }
          />
          Throbing
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.pain.Burning}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("pain", "Burning")
            }
          />
          Burning
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.pain.Lehing}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("pain", "Lehing")
            }
          />
          Lehing
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.pain.Mixed}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("pain", "Mixed")
            }
          />
          Mixed
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.pain.Mild}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("pain", "Mild")
            }
          />
          Mild
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.pain.Severe}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("pain", "Severe")
            }
          />
          Severe
        </label>

        <h4>Onset</h4>

        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.onset.None}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("onset", "None")
            }
          />
          None
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.onset.Acute}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("onset", "Acute")
            }
          />
          Acute
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.onset.Gradual}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("onset", "Gradual")
            }
          />
          Gradual
        </label>

        <h4>Duration</h4>

        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.duration.None}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("duration", "None")
            }
          />
          None
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.duration.lessthan1}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("duration", "lessthan1")
            }
          />
          &lt; 1 Yrs
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.duration.oneto2}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("duration", "oneto2")
            }
          />
          1 - 2 Yrs
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.duration.twoto3}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("duration", "twoto3")
            }
          />
          2 - 3 Yrs
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.duration.greaterthan3}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("duration", "greaterthan3")
            }
          />
          &gt; 3 Years
        </label>

        <h4>Bowel Habit</h4>

        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.bowelHabit.None}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("bowelHabit", "None")
            }
          />
          None
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.bowelHabit.Normal}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("bowelHabit", "Normal")
            }
          />
          Normal
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.bowelHabit.Constipated}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("bowelHabit", "Constipated")
            }
          />
          Constipated
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.bowelHabit.Diarrhoea}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("bowelHabit", "Diarrhoea")
            }
          />
          Diarrhoea
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.bowelHabit.Mucous}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("bowelHabit", "Mucous")
            }
          />
          Mucous
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.bowelHabit.MuscousBlood}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("bowelHabit", "MuscousBlood")
            }
          />
          Muscous Blood
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.bowelHabit.ATSM}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange("bowelHabit", "ATSM")
            }
          />
          Apro. Time Spend in Min.
        </label>
        <label>
          <input
            type="checkbox"
            checked={clinicalFeatures.bowelHabit.Frequencyperday}
            onChange={() =>
              handleClinicalFeaturesCheckboxChange(
                "bowelHabit",
                "Frequencyperday"
              )
            }
          />
          Frequency per day
        </label>

        <h2>Types of Fistula</h2>

        <label>
          <input
            type="checkbox"
            checked={typesOfFistula.None}
            onChange={() => handleFistulaCheckboxChange("None")}
          />
          None
        </label>
        <label>
          <input
            type="checkbox"
            checked={typesOfFistula.InterSphincteric}
            onChange={() => handleFistulaCheckboxChange("InterSphincteric")}
          />
          Inter Sphincteric
        </label>
        <label>
          <input
            type="checkbox"
            checked={typesOfFistula.TransSphincteric}
            onChange={() => handleFistulaCheckboxChange("TransSphincteric")}
          />
          Trans Sphincteric
        </label>
        <label>
          <input
            type="checkbox"
            checked={typesOfFistula.SupraSphincteric}
            onChange={() => handleFistulaCheckboxChange("SupraSphincteric")}
          />
          Supra Sphincteric
        </label>
        <label>
          <input
            type="checkbox"
            checked={typesOfFistula.ExtraSphincteric}
            onChange={() => handleFistulaCheckboxChange("ExtraSphincteric")}
          />
          Extra Sphincteric
        </label>

        <h2>Types of Bhagandra</h2>

        <label>
          <input
            type="checkbox"
            checked={typesOfBhagandra.None}
            onChange={() => handleBhagandraCheckboxChange("None")}
          />
          None
        </label>
        <label>
          <input
            type="checkbox"
            checked={typesOfBhagandra.Riju}
            onChange={() => handleBhagandraCheckboxChange("Riju")}
          />
          Riju
        </label>
        <label>
          <input
            type="checkbox"
            checked={typesOfBhagandra.Shatapoaka}
            onChange={() => handleBhagandraCheckboxChange("Shatapoaka")}
          />
          Shatapoaka
        </label>
        <label>
          <input
            type="checkbox"
            checked={typesOfBhagandra.Ushtragreeva}
            onChange={() => handleBhagandraCheckboxChange("Ushtragreeva")}
          />
          Ushtragreeva
        </label>
        <label>
          <input
            type="checkbox"
            checked={typesOfBhagandra.Parisravi}
            onChange={() => handleBhagandraCheckboxChange("Parisravi")}
          />
          Parisravi
        </label>
        <label>
          <input
            type="checkbox"
            checked={typesOfBhagandra.Shambukavarta}
            onChange={() => handleBhagandraCheckboxChange("Shambukavarta")}
          />
          Shambukavarta
        </label>
        <label>
          <input
            type="checkbox"
            checked={typesOfBhagandra.Paikshepi}
            onChange={() => handleBhagandraCheckboxChange("Paikshepi")}
          />
          Paikshepi
        </label>
        <label>
          <input
            type="checkbox"
            checked={typesOfBhagandra.Unmargi}
            onChange={() => handleBhagandraCheckboxChange("Unmargi")}
          />
          Unmargi
        </label>

        <h2>Types of KST</h2>

        <label>
          <input
            type="checkbox"
            checked={typesOfKST.None}
            onChange={() => handleKSTCheckboxChange("None")}
          />
          None
        </label>
        <label>
          <input
            type="checkbox"
            checked={typesOfKST.Conventional}
            onChange={() => handleKSTCheckboxChange("Conventional")}
          />
          Conventional
        </label>
        <label>
          <input
            type="checkbox"
            checked={typesOfKST.AntIFTAK}
            onChange={() => handleKSTCheckboxChange("AntIFTAK")}
          />
          Ant IFTAK
        </label>
        <label>
          <input
            type="checkbox"
            checked={typesOfKST.PostIFTAK}
            onChange={() => handleKSTCheckboxChange("PostIFTAK")}
          />
          Post IFTAK
        </label>
        <label>
          <input
            type="checkbox"
            checked={typesOfKST.ModLIFT}
            onChange={() => handleKSTCheckboxChange("ModLIFT")}
          />
          Mod LIFT
        </label>

        <h2>Perianal Dermatitis</h2>
        <p>Is the patient suffering from Perianal Dermatitis?</p>
        <label>
          <input
            type="checkbox"
            checked={perianalDermatitis}
            onChange={handlePerianalDermatitisChange}
          />
          Yes
        </label>
        <label>
          <input
            type="checkbox"
            checked={!perianalDermatitis}
            onChange={() => setPerianalDermatitis(false)}
          />
          No
        </label>

        <h2>Near Fistula </h2>

        <label>
          <input
            type="checkbox"
            checked={nearFistula.None}
            onChange={() => handleNearFistulaCheckboxChange("None")}
          />
          None
        </label>
        <label>
          <input
            type="checkbox"
            checked={nearFistula.Normal}
            onChange={() => handleNearFistulaCheckboxChange("Normal")}
          />
          Normal
        </label>
        <label>
          <input
            type="checkbox"
            checked={nearFistula.Inflammed}
            onChange={() => handleNearFistulaCheckboxChange("Inflammed")}
          />
          Inflammed
        </label>
        <label>
          <input
            type="checkbox"
            checked={nearFistula.Indurated}
            onChange={() => handleNearFistulaCheckboxChange("Indurated")}
          />
          Indurated
        </label>
        <label>
          <input
            type="checkbox"
            checked={nearFistula.Ulcerated}
            onChange={() => handleNearFistulaCheckboxChange("Ulcerated")}
          />
          Ulcerated
        </label>
        <label>
          <input
            type="checkbox"
            checked={nearFistula.ExtTag}
            onChange={() => handleNearFistulaCheckboxChange("Ext. Tag")}
          />
          Ext. Tag
        </label>
        <label>
          <input
            type="checkbox"
            checked={nearFistula.Others}
            onChange={() => handleNearFistulaCheckboxChange("Others")}
          />
          Others
        </label>

        <h2>Tenderness</h2>

        <label>
          <input
            type="checkbox"
            checked={tenderness.Present}
            onChange={() => handleTendernessCheckboxChange("Present")}
          />
          Present
        </label>
        <label>
          <input
            type="checkbox"
            checked={tenderness.Absent}
            onChange={() => handleTendernessCheckboxChange("Absent")}
          />
          Absent
        </label>

        <h2>Ext. Openings</h2>
        <label>
          No.:
          <input
            type="text"
            name="extOpeningsNumber"
            value={extOpenings.number}
            onChange={(e) =>
              setExtOpenings({ ...extOpenings, number: e.target.value })
            }
          />
        </label>
        <label>
          Distance From AV:
          <input
            type="text"
            name="extOpeningsDistanceFromAV"
            value={extOpenings.distancefromAV}
            onChange={(e) =>
              setExtOpenings({ ...extOpenings, distancefromAV: e.target.value })
            }
          />
        </label>
        <label>
          Position:
          <input
            type="text"
            name="extOpeningsPosition"
            value={extOpenings.position}
            onChange={(e) =>
              setExtOpenings({ ...extOpenings, position: e.target.value })
            }
          />
        </label>
        <label>
          GKS Change:
          <input
            type="text"
            name="extOpeningsGKSChange"
            value={extOpenings.gkschange}
            onChange={(e) =>
              setExtOpenings({ ...extOpenings, gkschange: e.target.value })
            }
          />
        </label>
        <label>
          Follow Result :
          <input
            type="text"
            name="extOpeningsFollowResult"
            value={extOpenings.folllowresult}
            onChange={(e) =>
              setExtOpenings({ ...extOpenings, folllowresult: e.target.value })
            }
          />
        </label>

        <h2>Result</h2>

        <label>
          <input
            type="checkbox"
            checked={result.None}
            onChange={() => handleResultCheckboxChange("None")}
          />
          None
        </label>
        <label>
          <input
            type="checkbox"
            checked={result.Cured}
            onChange={() => handleResultCheckboxChange("Cured")}
          />
          Cured
        </label>
        <label>
          <input
            type="checkbox"
            checked={result.NotCured}
            onChange={() => handleResultCheckboxChange("NotCured")}
          />
          Not Cured
        </label>

        <h2>Investigations</h2>
        <h4>Blood</h4>

        <label>
          DLC :
          <input
            type="text"
            name="DLC"
            value={blood.dlc}
            onChange={(e) => setBlood({ ...blood, dlc: e.target.value })}
          />
        </label>
        <label>
          TLC :
          <input
            type="text"
            name="TLC"
            value={blood.tlc}
            onChange={(e) => setBlood({ ...blood, tlc: e.target.value })}
          />
        </label>
        <label>
          N :
          <input
            type="text"
            name="N"
            value={blood.n}
            onChange={(e) => setBlood({ ...blood, n: e.target.value })}
          />
        </label>
        <label>
          M :
          <input
            type="text"
            name="M"
            value={blood.m}
            onChange={(e) => setBlood({ ...blood, m: e.target.value })}
          />
        </label>
        <label>
          L :
          <input
            type="text"
            name="L"
            value={blood.l}
            onChange={(e) => setBlood({ ...blood, l: e.target.value })}
          />
        </label>
        <label>
          E :
          <input
            type="text"
            name="E"
            value={blood.e}
            onChange={(e) => setBlood({ ...blood, e: e.target.value })}
          />
        </label>
        <label>
          B :
          <input
            type="text"
            name="B"
            value={blood.b}
            onChange={(e) => setBlood({ ...blood, b: e.target.value })}
          />
        </label>
        <label>
          Hb :
          <input
            type="text"
            name="Hb"
            value={blood.hb}
            onChange={(e) => setBlood({ ...blood, hb: e.target.value })}
          />
        </label>
        <label>
          ESR :
          <input
            type="text"
            name="ESR"
            value={blood.esr}
            onChange={(e) => setBlood({ ...blood, esr: e.target.value })}
          />
        </label>
        <label>
          FBS :
          <input
            type="text"
            name="FBS"
            value={blood.fbs}
            onChange={(e) => setBlood({ ...blood, fbs: e.target.value })}
          />
        </label>
        <label>
          PPBS :
          <input
            type="text"
            name="PPBS"
            value={blood.ppbs}
            onChange={(e) => setBlood({ ...blood, ppbs: e.target.value })}
          />
        </label>
        <label>
          Elisa foe T.B. :
          <input
            type="text"
            name="Elisa foe T.B."
            value={blood.elisafortb}
            onChange={(e) => setBlood({ ...blood, elisafortb: e.target.value })}
          />
        </label>

        <label>
          IgG :
          <input
            type="text"
            name="IgG"
            value={blood.igg}
            onChange={(e) => setBlood({ ...blood, igg: e.target.value })}
          />
        </label>
        <label>
          IgM:
          <input
            type="text"
            name="IgM"
            value={blood.igm}
            onChange={(e) => setBlood({ ...blood, igm: e.target.value })}
          />
        </label>
        <label>
          IgA :
          <input
            type="text"
            name="IgA"
            value={blood.iga}
            onChange={(e) => setBlood({ ...blood, iga: e.target.value })}
          />
        </label>

        <h4>Mantos Test</h4>

        <label>
          <input
            type="checkbox"
            checked={tenderness.positive}
            onChange={() => handleMantosTestCheckboxChange("+ve")}
          />
          +ve
        </label>
        <label>
          <input
            type="checkbox"
            checked={tenderness.negative}
            onChange={() => handleMantosTestCheckboxChange("-ne")}
          />
          -ve
        </label>

        <h4>HIV </h4>

        <label>
          <input
            type="checkbox"
            checked={tenderness.positive}
            onChange={() => handleHivCheckboxChange("+ve")}
          />
          +ve
        </label>
        <label>
          <input
            type="checkbox"
            checked={tenderness.negative}
            onChange={() => handleHivCheckboxChange("-ne")}
          />
          -ve
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddData;
