import { useEffect, useState } from "react";


import {
  MultiPersona,
  MultiTag,
  MultiDropDown,
  SinglePersona,
  SingleDropDown,
  SingleTag,
} from "../src/Components/FormCombobox";
import { OptionsDropDown } from "./utils/interface";

function App() {
  // ini value untuk single select (udah gaperlu lagi)
  const [value, setValue] = useState<string[] | number[] | string>([]);

  const [valueMultiple, setValueMultiple] = useState<
    string | string[] | number[]
  >([]);

  const onValidate = (selectedKeys: string[]) => {
    if (selectedKeys?.length === 0) {
      return "Masukin elemen";
    }
  };

  useEffect(() => {
    console.log(value, "ini value single");
  }, [value]);

  useEffect(() => {
    console.log(valueMultiple);
  }, [valueMultiple]);

  const onValidateMulti = (selectedKeys: string[]) => {
    if (selectedKeys.length < 3) {
      return "sesuatu";
    }
  };

  const onChange = (newValue: string | string[] | number[]) => {
    setValue(newValue);
  };

  const onChangeMultiple = (newValue: string | string[] | number[]) => {
    setValueMultiple(newValue);
  };

  // function getTextForTextField(
  //   selectedKeys: string[],
  //   options: OptionsDropDown[]
  // ) {
  //   const selectedTexts = (selectedKeys as (string | number)[]).map(
  //     (value: string | number) => {
  //       const selectedOption = options.find((option) => option.value === value);
  //       return selectedOption ? selectedOption.text : "";
  //     }
  //   );
  //   return selectedTexts ? selectedTexts.join(", ") : "";
  // }

  // const onRenderSelectedOption = (option: string[]) => {
  //   if (option.length === 0) return [];
  //   return <div>{getTextForTextField(option, optionsFluentV9)}</div>;
  // };

  const optionsFluentV9: OptionsDropDown[] = [
    {
      value: "kathok",
      text: "Katri Athokas",
      data: {
        secondaryText: "Available",
        status: "available",
      },
    },
    {
      value: "eatkins",
      text: "Elvia Atkins",
      data: {
        secondaryText: "Busy",
        status: "busy",
      },
    },
    {
      value: "cevans",
      text: "Cameron Evans",
      data: {
        secondaryText: "Away",
        status: "away",
      },
    },
    {
      value: "whoward",
      text: "Wanda Howard",
      data: {
        secondaryText: "Out of office",
        status: "out-of-office",
      },
    },
    {
      value: "jonell",
      text: "Johnie McConnell",
      data: {
        secondaryText: "Away",
        status: "away",
      },
    },
    {
      value: "krisson",
      text: "Kristin Patterson",
      data: {
        secondaryText: "Out of office",
        status: "out-of-office",
      },
    },
    {
      value: "carand",
      text: "Carole Poland",
      data: {
        secondaryText: "Busy",
        status: "busy",
      },
    },
  ];

  const optionTags = [
    {
      value: "heritages",
      text: "Heritages",
    },
    {
      value: "socials",
      text: "Socials",
    },
    {
      value: "economics",
      text: "Economics",
    },
    {
      value: "environments",
      text: "Environments",
    },
    {
      value: "politics",
      text: "Politics",
    },
    {
      value: "sports",
      text: "Sports",
    },
    {
      value: "educations",
      text: "Educations",
    },
    {
      value: "technologies",
      text: "Technologies",
    },
  ];

  // const onRenderOptionPerson = (option: OptionsDropDown): JSX.Element => {
  //   return <div>{option.text}</div>;
  // };

  // useEffect(() => {}, [value]);

  // const onCancel = (keys: string[] | number[] | string) => {
  //   setValue(keys);
  // };

  // const onCancelMultiple = (keys: string[] | number[] | string) => {
  //   setValueMultiple(keys);
  // };

  // const onSave = (keys: string[] | number[] | string) => {
  //   console.log(keys, "tekan save di App");
  // };

  return (
    <>

      <div
        style={{ margin: "20px", border: "dashed black 3px", padding: "10px" }}
      >
        <SinglePersona
          options={optionsFluentV9}
          label={"Single Uncontrolled Persona"}
          type="persona"
          orientation="vertical"
          // onValidate={onValidate}
          // onRenderSelectedOption={onRenderSelectedOption}
        />
      </div>

      <div
        style={{ margin: "20px", border: "dashed red 3px", padding: "10px" }}
      >
        <MultiPersona
          options={optionsFluentV9}
          label={"Multi Uncontrolled Persona"}
          multiSelect={true}
          type="persona"
          orientation="vertical"
          // onValidate={onValidateMulti}
          // onRenderSelectedOption={onRenderSelectedOption}
        />
      </div>

      <div
        style={{ margin: "20px", border: "dashed purple 3px", padding: "10px" }}
      >
        <SingleTag
          options={optionTags}
          label={"Single Uncontrolled Tag"}
          orientation="horizontal"
          type="tags"
          // onValidate={onValidate}
        />
      </div>
      <div
        style={{ margin: "20px", border: "dashed green 3px", padding: "10px" }}
      >
        <MultiTag
          options={optionTags}
          label={"Multi Uncontrolled Tags"}
          multiSelect={true}
          type="tags"
          orientation="horizontal"
          // onValidate={onValidateMulti}
        />
      </div>

      <div
        style={{ margin: "20px", border: "dashed grey 3px", padding: "10px" }}
      >
        <SingleDropDown
          options={optionTags}
          label={"Single Uncontrolled Dropdown"}
          orientation="horizontal"
          type="dropdown"
          onValidate={onValidate}
        />
      </div>

      <div
        style={{ margin: "20px", border: "dashed blue 3px", padding: "10px" }}
      >
        <MultiDropDown
          options={optionTags}
          label={"Multi Uncontrolled Dropdown"}
          multiSelect={true}
          orientation="horizontal"
          type="dropdown"
          onValidate={onValidateMulti}
        />
      </div>

     
    </>
  );
}

export default App;
