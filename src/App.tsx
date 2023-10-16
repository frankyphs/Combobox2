/* eslint-disable */
import { useState } from "react";
import "./App.css";

import {
  FormDropdownField,
} from "./Components/FormDropdownField";
import { IOptionsTag } from "./utils/interface";


function App() {
  // ini value untuk single select (udah gaperlu lagi)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [selectedOptionsMulti, setSelectedOptionsMulti] = useState<string[]>([])
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const onChange = (newValue: string[]) => {
    setSelectedOptions(newValue);
  };

  const onChangeMulti = (newValue: string[]) => {
    setSelectedOptionsMulti(newValue);
  };

  const onEditClick = () => {
    setIsEditing(true)
  }

  const onCancel = (newValue: string[]) => {
    setSelectedOptions(newValue)
    setIsEditing(false)
  }

  const onCancelMulti = (newValue: string[]) => {
    setSelectedOptionsMulti(newValue)
    setIsEditing(false)
  }

  const onSave = (newValue: string[]) => {
    setIsEditing(false)
    setSelectedOptions(newValue)
  }

  const onSaveMulti = (newValue: string[]) => {
    setIsEditing(false)
    setSelectedOptionsMulti(newValue)
  }


  const options = [
    { id: "1", label: "Cat" },
    { id: "2", label: "Dog" },
    { id: "3", label: "Ferret" },
    { id: "4", label: "Fish" },
    { id: "5", label: "Hamster" },
    { id: "6", label: "Snake" },
    { id: "7", label: "Ikan" },
    { id: "8", label: "Ayam" },
    { id: "9", label: "Udang" },
    { id: "10", label: "Kepiting" },
  ]

  const [optionsTag, setOptionsTag] = useState<IOptionsTag[]>([
    { id: "1", label: "religion", data: { color: "#F99417" } },
    { id: "2", label: "education", data: { color: "#D0D4CA" } },
    { id: "3", label: "politic" },
    { id: "4", label: "social" },
    { id: "5", label: "heritage" },
    { id: "6", label: "technology", data: { color: "#D988B9" } },
    { id: "7", label: "economy", data: { color: "#BCA37F" } },
    { id: "8", label: "criminal" },
  ]);

  const optionsPersona = [
    {
      id: "kathok",
      label: "Katri Athokas",
      data: {
        secondaryText: "Available",
        status: "available",
      },
    },
    {
      id: "eatkins",
      label: "Elvia Atkins",
      data: {
        secondaryText: "Busy",
        status: "busy",
      },
    },
    {
      id: "cevans",
      label: "Cameron Evans",
      data: {
        secondaryText: "Away",
        status: "away",
      },
    },
    {
      id: "whoward",
      label: "Wanda Howard",
      data: {
        secondaryText: "Out of office",
        status: "out-of-office",
      },
    },
    {
      id: "jonell",
      label: "Johnie McConnell",
      data: {
        secondaryText: "Away",
        status: "away",
      },
    },
    {
      id: "krisson",
      label: "Kristin Patterson",
      data: {
        secondaryText: "Out of office",
        status: "out-of-office",
      },
    },
    {
      id: "carand",
      label: "Carole Poland",
      data: {
        secondaryText: "Busy",
        status: "busy",
      },
    },
  ]


  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", border: "1px solid red", padding: "0 20px 20px 20px" }}>
        <div>
          <FormDropdownField defaultSelectedOptions={["1"]} type="dropdown" label="Dropdown Uncontrolled" options={options} />
          <FormDropdownField options={options} onChange={onChange} selectedOptions={selectedOptions} onCancel={onCancel} type="dropdown" label="Dropdown Controlled" isEditing={isEditing} onEditClick={onEditClick} onSave={onSave} />
          <FormDropdownField type="persona" label="Persona Uncontrolled" options={optionsPersona} />
          <FormDropdownField type="tags" label="Tags Uncontrolled" options={optionsTag} />
        </div>
        <div>
          <FormDropdownField multiSelect type="dropdown" label="Dropdown Uncontrolled Multiselect" options={options} />
          <FormDropdownField multiSelect options={options} onChange={onChangeMulti} selectedOptions={selectedOptionsMulti} onCancel={onCancelMulti} type="dropdown" label="Dropdown Controlled" onSave={onSaveMulti} />
          <FormDropdownField multiSelect type="tags" label="Tag Uncontrolled Multiselect" options={optionsTag} />
          <FormDropdownField multiSelect type="persona" label="Persona Uncontrolled Multiselect" options={optionsPersona} />
        </div>
      </div>


    </>
  );
}

export default App;
