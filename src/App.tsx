/* eslint-disable */
import { useState } from "react";
import "./App.css";

import {
  FormDropdownField,
} from "./Components/FormDropdownField";
import { IOptionsDropdown, IOptionsPersona, IOptionsTag } from "./utils/interface";


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

  const onClearSingle = (newValue: string[]): void => {
    setSelectedOptions(newValue)
  }

  const onClearMulti = (newValue: string[]): void => {
    setSelectedOptionsMulti(newValue)
  }

  const onDeleteTagSingle = (newValue: string[]): void => {
    setSelectedOptions(newValue)
  }

  const onDeleteTagMulti = (newValue: string[]): void => {
    setSelectedOptionsMulti(newValue)
  }


  const [options, setOptions] = useState<IOptionsDropdown[]>([
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
  ])

  const [optionsTag, setOptionsTag] = useState<IOptionsTag[]>([
    { id: "1", label: "religion", data: { color: "#FFF3DA" } },
    { id: "2", label: "education", data: { color: "#DFCCFB" } },
    { id: "3", label: "politic" },
    { id: "4", label: "social", data: { color: "#BC7AF9" } },
    { id: "5", label: "heritage" },
    { id: "6", label: "technology", data: { color: "#FF6969" } },
    { id: "7", label: "economy", data: { color: "#EE9322" } },
    { id: "8", label: "criminal" },
  ]);

  const onChangeOptionTag = (newValue: IOptionsTag[]) => {
    setOptionsTag(newValue)
  }

  const onChangeOptionDropdown = (newValue: IOptionsTag[]) => {
    setOptions(newValue)
  }
  const onChangeOptionPersona = (newValue: IOptionsPersona[]) => {
    setOptionsPersona(newValue)
  }

  const [optionsPersona, setOptionsPersona] = useState<IOptionsPersona[]>([
    {
      id: "kathok",
      label: "Katri Athokas",
      data: {
        secondaryText: "Available",
        status: "available",
        icon: "https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png"
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
  ])


  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", border: "1px solid red", padding: "0 20px 20px 20px" }}>
        <div>
          <p>Single Select</p>
          <FormDropdownField defaultSelectedOptions={["1"]} type="dropdown" label="Dropdown Uncontrolled" options={options} saveText="Simpan" cancelText="Batal" placeholderSearch="Cari..." placeholderDropdown="Pilih Opsi" addText="Tambah Opsi" clearText="Hapus" onOptionChange={onChangeOptionDropdown} />
          {/* <FormDropdownField options={options} onChange={onChange} selectedOptions={selectedOptions} onCancel={onCancel} type="dropdown" label="Dropdown Controlled" isEditing={isEditing} onEditClick={onEditClick} onSave={onSave} onClear={onClearSingle} /> */}
          <FormDropdownField type="persona" label="Persona Uncontrolled" options={optionsPersona} onOptionChange={onChangeOptionPersona} />
          <FormDropdownField type="tags" label="Tags Uncontrolled" options={optionsTag} onOptionChange={onChangeOptionTag} />
          <FormDropdownField type="tags" label="Tags Controlled" options={optionsTag} onChange={onChange} selectedOptions={selectedOptions} onCancel={onCancel} isEditing={isEditing} onEditClick={onEditClick} onSave={onSave} onClear={onClearSingle} onDeleteTag={onDeleteTagSingle} onOptionChange={onChangeOptionTag} />
        </div>
        <div>
          <p>Multi Select</p>
          <FormDropdownField multiSelect type="dropdown" label="Dropdown Uncontrolled Multiselect" options={options} onOptionChange={onChangeOptionDropdown} />
          {/* <FormDropdownField multiSelect options={options} onChange={onChangeMulti} selectedOptions={selectedOptionsMulti} onCancel={onCancelMulti} type="dropdown" label="Dropdown Controlled" onSave={onSaveMulti} onClear={onClearMulti} /> */}
          <FormDropdownField multiSelect type="persona" label="Persona Uncontrolled Multiselect" options={optionsPersona} onOptionChange={onChangeOptionPersona} />
          <FormDropdownField multiSelect type="tags" label="Tag Uncontrolled Multiselect" options={optionsTag} onOptionChange={onChangeOptionTag} />
          <FormDropdownField multiSelect type="tags" label="Tag Controlled Multiselect" options={optionsTag} onChange={onChangeMulti} selectedOptions={selectedOptionsMulti} onCancel={onCancelMulti} onSave={onSaveMulti} onClear={onClearMulti} onDeleteTag={onDeleteTagMulti} onOptionChange={onChangeOptionTag} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", border: "1px solid red", padding: "0 20px 20px 20px", margin: "20px 0" }}>

        <div>
          <p>Applicating Size</p>
          <FormDropdownField defaultSelectedOptions={["1"]} type="dropdown" label="Dropdown Uncontrolled Small" options={options} saveText="Simpan" cancelText="Batal" placeholderSearch="Cari..." placeholderDropdown="Pilih Opsi" addText="Tambah Opsi" clearText="Hapus" size="small" onOptionChange={onChangeOptionDropdown} />
          <FormDropdownField defaultSelectedOptions={["2"]} type="dropdown" label="Dropdown Uncontrolled Medium" options={options} saveText="Simpan" cancelText="Batal" placeholderSearch="Cari..." placeholderDropdown="Pilih Opsi" addText="Tambah Opsi" clearText="Hapus" size="medium" onOptionChange={onChangeOptionDropdown} />
          <FormDropdownField defaultSelectedOptions={["3"]} type="dropdown" label="Dropdown Uncontrolled Large" options={options} saveText="Simpan" cancelText="Batal" placeholderSearch="Cari..." placeholderDropdown="Pilih Opsi" addText="Tambah Opsi" clearText="Hapus" size="large" onOptionChange={onChangeOptionDropdown} />
          <FormDropdownField type="persona" label="Persona Uncontrolled Small" options={optionsPersona} size="small" onOptionChange={onChangeOptionPersona} />
          <FormDropdownField type="persona" label="Persona Uncontrolled Medium" options={optionsPersona} size="medium" onOptionChange={onChangeOptionPersona} />
          <FormDropdownField type="persona" label="Persona Uncontrolled Large" options={optionsPersona} size="large" onOptionChange={onChangeOptionPersona} />
          <FormDropdownField type="tags" label="Tags Uncontrolled Small" options={optionsTag} size="small" onOptionChange={onChangeOptionTag} />
          <FormDropdownField type="tags" label="Tags Uncontrolled Medium" options={optionsTag} size="medium" onOptionChange={onChangeOptionTag} />
          <FormDropdownField type="tags" label="Tags Uncontrolled Large" options={optionsTag} size="large" onOptionChange={onChangeOptionTag} />
        </div>
        <div >
          <p>Applicating Size</p>
          <FormDropdownField multiSelect type="dropdown" label="Dropdown Uncontrolled Multiselect" options={options} size="small" onOptionChange={onChangeOptionDropdown} />
          <FormDropdownField multiSelect type="dropdown" label="Dropdown Uncontrolled Multiselect" options={options} size="medium" onOptionChange={onChangeOptionDropdown} />
          <FormDropdownField multiSelect type="dropdown" label="Dropdown Uncontrolled Multiselect" options={options} size="large" onOptionChange={onChangeOptionDropdown} />
          <FormDropdownField multiSelect type="persona" label="Persona Uncontrolled Multiselect" options={optionsPersona} size="small" onOptionChange={onChangeOptionPersona} />
          <FormDropdownField multiSelect type="persona" label="Persona Uncontrolled Multiselect" options={optionsPersona} size="medium" onOptionChange={onChangeOptionPersona} />
          <FormDropdownField multiSelect type="persona" label="Persona Uncontrolled Multiselect" options={optionsPersona} size="large" onOptionChange={onChangeOptionPersona} />
          <FormDropdownField multiSelect type="tags" label="Tag Uncontrolled Multiselect" options={optionsTag} size="small" onOptionChange={onChangeOptionTag} />
          <FormDropdownField multiSelect type="tags" label="Tag Uncontrolled Multiselect" options={optionsTag} size="medium" onOptionChange={onChangeOptionTag} />
          <FormDropdownField multiSelect type="tags" label="Tag Uncontrolled Multiselect" options={optionsTag} size="large" onOptionChange={onChangeOptionTag} />
        </div>
      </div>


    </>
  );
}

export default App;
