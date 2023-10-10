/* eslint-disable */

import React, { useState, useEffect } from "react";
import { IFieldDropdown, OptionsDropDown } from "../utils/interface";
import { Edit24Regular, Dismiss12Regular } from "@fluentui/react-icons";
import InactiveReadView from "./InactiveReadView";

import {
  Button,
  makeStyles,
  Option,
  shorthands,
  useId,
  Persona,
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  partitionAvatarGroupItems,
  Combobox,
  tokens,
  PresenceBadgeStatus,
  Field,
  ComboboxOpenEvents,
} from "@fluentui/react-components";
import type { DropdownProps } from "@fluentui/react-components";

interface DataTemp {
  optionValue: string;
  optionText: string;
  selectedOptions: string[];
}

// styles for type tags
const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: "grid",
    gridTemplateRows: "repeat(1fr)",
    justifyItems: "start",
    ...shorthands.gap("2px"),
    // maxWidth: "200px",
  },
  tagsList: {
    listStyleType: "none",
    marginBottom: tokens.spacingVerticalXXS,
    marginTop: 0,
    paddingLeft: 0,
    display: "flex",
    gridGap: tokens.spacingHorizontalXXS,
  },
});

const FormDropDown: React.FC<IFieldDropdown> = (props) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const [error, setError] = useState(false);

  // const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [buka, setBuka] = useState<boolean>(false);

  // this state is for single persona to get status and secondary text
  // state ini untuk mendapatkan object dari options berdasarkan selectedOption yang dipilih, berguna untuk persona single
  const [getObjectFromOption, setGetObjectFromOption] =
    React.useState<OptionsDropDown>();

  // styles for type tags single and multiple
  const styles = useStyles();
  const [isEditing, setIsEditing] = useState(false);

  // selected cancel uncontrolled state
  const [cancelData, setCancelData] = React.useState([]);

  // name for Persona
  // kita butuh nameForPersona, karna kita butuh array of string dari nama2 yang di select, berguna untuk AvatarImage persona multiple
  const [nameForPersona, setNameForPersona] = React.useState([]);

  // matching the selectedOption to text in props.options
  //menghasilkan array of string dari option.text
  // misalnya : ['Katri Athokas', 'Elvia Atkins', 'Cameron Evans']
  const getText = (selectedKeys: string[], options: OptionsDropDown[]) => {
    const selectedTexts = (selectedKeys as (string | number)[]).map(
      (value: string | number) => {
        const selectedOption = options.find((option) => option.value === value);
        return selectedOption ? selectedOption.text : "";
      }
    );
    setNameForPersona(selectedTexts);
  };

  // code for type tags
  const comboId = useId("combo-multi");
  const selectedListRef = React.useRef<HTMLUListElement>(null);
  const comboboxInputRef = React.useRef<HTMLInputElement>(null);

  // code for close tag click
  const onTagClick = (option: string, index: number) => {
    // remove selected option
    setSelectedOptions(selectedOptions.filter((o) => o !== option));

    // focus previous or next option, defaulting to focusing back to the combo input
    const indexToFocus = index === 0 ? 1 : index - 1;
    const optionToFocus = selectedListRef.current?.querySelector(
      `#${comboId}-remove-${indexToFocus}`
    );
    if (optionToFocus) {
      (optionToFocus as HTMLButtonElement).focus();
    } else {
      comboboxInputRef.current?.focus();
    }
  };

  useEffect(() => {
    if (props.multiSelect) {
      // code for uncontrolled but we have defaultValue from parent
      if (props.defaultValue) {
        setSelectedOptions(props.defaultValue as string[]);
        setCancelData(props.defaultValue as string[]);
      } else {
        setSelectedOptions([]);
        setCancelData([]);
      }
    } else {
      // code for uncontrolled but we have defaultValue from parent
      if (props.defaultValue) {
        setSelectedOptions(props.defaultValue as string[]);
        setCancelData(props.defaultValue as string[]);
      } else {
        setSelectedOptions([]);
        setCancelData([]);
      }
    }
    if (props.defaultValue) {
      getText(props.defaultValue as string[], props.options);
    }
  }, []);

  // convert array to string
  // Berguna untuk mengkonversi array ke string, sebagai value untuk input saat isEditing false
  function getTextForTextField(
    selectedKeys: string[],
    options: OptionsDropDown[]
  ) {
    if (!props.multiSelect) {
      const selectedOption = options.find(
        (option) => option.value === selectedKeys[0]
      );
      // get object from props.options for single selectedOption
      setGetObjectFromOption(selectedOption);
      return selectedOption ? selectedOption.text : "";
    } else {
      const selectedTexts = (selectedKeys as (string | number)[]).map(
        (value: string | number) => {
          const selectedOption = options.find(
            (option) => option.value === value
          );
          return selectedOption ? selectedOption.text : "";
        }
      );
      return selectedTexts ? selectedTexts.join(", ") : "";
    }
  }

  // handle save click
  const handleSaveClick = () => {
    if (props.onValidate) {
      const validationResult = props.onValidate(selectedOptions);

      if (validationResult) {
        setError(true);
        return;
      } else {
        setError(false);
      }
    }
    setIsEditing(false);
    if (props.onSave) {
      props.onSave(props.value);
    }
    // code while have value and onChange from parent
    if (props.value && props.onChange) {
      setCancelData(props.value as string[]);
    } else {
      // local state only change if there is no value from parent
      setCancelData(selectedOptions);
    }
  };

  // handle cancel click
  const handleCancelClick = () => {
    setIsEditing(false);
    // setSelectedOptions(cancelData);
    if (props.onCancel) {
      if (props.multiSelect) {
        props.onCancel(cancelData as string[]);
      } else {
        props.onCancel(cancelData as string[]);
      }
    }

    // local state only change if there is no value from parent
    if (!props.value) {
      setSelectedOptions(cancelData);
    }
    getText(cancelData, props.options);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const partitionedItems = partitionAvatarGroupItems({ items: nameForPersona });

  const onChange = (_, item): void => {
    if (props.multiSelect) {
      const selectedItems = item.selectedOptions;
      if (!props.value) {
        setSelectedOptions(selectedItems);
      } else {
        props.onChange(selectedItems);
      }
      getText(selectedItems, props.options);
    } else if (item) {
      const selectedItems = item.selectedOptions;
      if (props.value && props.onChange) {
        props.onChange(selectedItems);
      } else {
        setSelectedOptions(selectedItems);
      }
      getText(selectedItems, props.options);
    }
    if (props.onValidate) {
      const validationResult = props.onValidate(selectedOptions);

      if (validationResult) {
        setError(true);
      } else {
        setError(false);
      }
    }

    //kita setIsOpen false agar user bisa melihat opsi yang sudah di select
    setIsOpen(false);
  };

  const dropdownStyles = {
    title: {
      border: isEditing ? "1px solid #ccc" : "none",
    },
    caretDown: {
      display: !isEditing ? "none" : "block",
    },
  };

  const InactiveDropdown = () => {
    return (
      <div>
        <Field
          validationMessage={error ? "Input harus mencukupi" : undefined}
          validationState={error ? "warning" : undefined}
          label={props.label}
          orientation={props.orientation}
          hint={
            isEditing
              ? {
                  children: (_: unknown, slotProps) => (
                    <div
                      style={{ display: "flex", gap: "6px", marginTop: "6px" }}
                    >
                      <Button appearance="primary" onClick={handleSaveClick}>
                        Save
                      </Button>
                      <Button
                        appearance="secondary"
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </Button>
                    </div>
                  ),
                }
              : undefined // Tidak menampilkan hint jika isEditing bernilai false
          }
        >
          {isEditing &&
            // ALL MULTI SELECT
            (props.multiSelect ? (
              <Combobox
                onOpenChange={(event, data) => {
                  // setTimeout(() => {
                  setIsOpen(data.open);
                  // }, 10);
                }}
                input={
                  props.type === "persona"
                    ? {
                        children: (type, props) => (
                          <div
                            style={{
                              height: "31px",
                            }}
                          >
                            {!isOpen && (
                              <AvatarGroup
                                layout="stack"
                                style={{
                                  padding: "3px 0 0 2px",
                                  margin: "0 5px",
                                }}
                                size={24}
                              >
                                {partitionedItems.inlineItems.map((name) => (
                                  <AvatarGroupItem name={name} key={name} />
                                ))}
                                {partitionedItems.overflowItems && (
                                  <AvatarGroupPopover>
                                    {partitionedItems.overflowItems.map(
                                      (name) => (
                                        <AvatarGroupItem
                                          name={name}
                                          key={name}
                                          // style={{ height: "10px" }}
                                        />
                                      )
                                    )}
                                  </AvatarGroupPopover>
                                )}
                              </AvatarGroup>
                            )}
                            <input {...props} />
                          </div>
                        ),
                      }
                    : // multi select type tags
                    props.type === "tags"
                    ? {
                        children: (_, props) => (
                          <div
                            style={{
                              padding: "2px",
                              height: "26px",
                              margin: "0 5px",
                            }}
                          >
                            {!isOpen && (
                              <ul
                                className={styles.tagsList}
                                ref={selectedListRef}
                              >
                                {/* The "Remove" span is used for naming the buttons without affecting the Combobox name */}
                                <span id={`${comboId}-remove`} hidden>
                                  Remove
                                </span>
                                {selectedOptions.map((option, i) => (
                                  <li key={option}>
                                    <Button
                                      size="small"
                                      shape="circular"
                                      appearance="primary"
                                      icon={<Dismiss12Regular />}
                                      iconPosition="after"
                                      onClick={() => onTagClick(option, i)}
                                      id={`${comboId}-remove-${i}`}
                                      aria-labelledby={`${comboId}-remove ${comboId}-remove-${i}`}
                                    >
                                      {option}
                                    </Button>
                                  </li>
                                ))}
                              </ul>
                            )}
                            <input {...props} />
                          </div>
                        ),
                      }
                    : // multi select type dropdown
                      undefined
                }
                multiselect
                selectedOptions={
                  props.value
                    ? (props.value as string[])
                    : (selectedOptions as string[])
                }
                onOptionSelect={onChange}
              >
                {/* looping option */}
                {props.type !== "persona"
                  ? //looping option besides persona
                    props.options.map((option) => (
                      <Option
                        text={option.text}
                        value={option.value}
                        key={option.value}
                      >
                        {option.text}
                      </Option>
                    ))
                  : // looping option for persona
                    props.options.map((option) => (
                      <Option
                        text={option.text}
                        value={option.value}
                        key={option.value}
                      >
                        <Persona
                          avatar={{ color: "colorful", "aria-hidden": true }}
                          name={option.text}
                          presence={{
                            status: option.data.status,
                          }}
                          secondaryText={option.data.secondaryText}
                        />
                      </Option>
                    ))}
              </Combobox>
            ) : (
              // ALL OF SINGLE SELECT

              <Combobox
                onOpenChange={(_, data) => setIsOpen(data.open)}
                input={
                  // input for uncontrolled && persona && single select
                  props.type === "persona" && !props.value
                    ? {
                        children: (_, props) => (
                          <div
                            style={{
                              height: "33px",
                              padding: "5px 0 0 5px",
                            }}
                          >
                            {selectedOptions.length > 0 && !isOpen && (
                              <Persona
                                textAlignment="center"
                                size="small"
                                avatar={{
                                  color: "colorful",
                                  "aria-hidden": true,
                                }}
                                name={nameForPersona[0] as string}
                                presence={{
                                  status: getObjectFromOption?.data?.status,
                                }}
                                secondaryText={
                                  getObjectFromOption?.data?.secondaryText
                                }
                              />
                            )}
                            <input {...props} />
                          </div>
                        ),
                      }
                    : // input for controlled && persona && single select
                    props.type === "persona" && props.value.length > 0
                    ? {
                        children: (_, props) => (
                          <div
                            style={{
                              height: "33px",
                              margin: "3px 5px 0 5px",
                            }}
                          >
                            {!!!isOpen && (
                              <Persona
                                textAlignment="center"
                                size="small"
                                avatar={{
                                  color: "colorful",
                                  "aria-hidden": true,
                                }}
                                name={nameForPersona[0] as string}
                                presence={{
                                  status: getObjectFromOption?.data?.status,
                                }}
                                secondaryText={
                                  getObjectFromOption?.data?.secondaryText
                                }
                              />
                            )}
                            <input {...props} />
                          </div>
                        ),
                      }
                    : // input for controlled && tags && single
                    props.type === "tags"
                    ? {
                        children: (_, props) => (
                          <div
                            style={{
                              padding: "2px",
                              height: "26.5px",
                              margin: "0 5px",
                            }}
                          >
                            {!isOpen && (
                              <ul
                                className={styles.tagsList}
                                ref={selectedListRef}
                              >
                                {/* The "Remove" span is used for naming the buttons without affecting the Combobox name */}
                                <span id={`${comboId}-remove`} hidden>
                                  Remove
                                </span>
                                {selectedOptions.map((option, i) => (
                                  <li key={option}>
                                    <Button
                                      size="small"
                                      shape="circular"
                                      appearance="primary"
                                      icon={<Dismiss12Regular />}
                                      iconPosition="after"
                                      onClick={() => onTagClick(option, i)}
                                      id={`${comboId}-remove-${i}`}
                                      aria-labelledby={`${comboId}-remove ${comboId}-remove-${i}`}
                                    >
                                      {option}
                                    </Button>
                                  </li>
                                ))}
                              </ul>
                            )}
                            <input {...props} />
                          </div>
                        ),
                      }
                    : // input for dropdown && controlled
                      undefined
                }
                onOptionSelect={onChange}
                selectedOptions={
                  props.value
                    ? (props.value as string[])
                    : (selectedOptions as string[])
                }
              >
                {/* render options */}
                {!props.onRenderOption
                  ? // dibawah ini semua preset render option
                    props.type !== "persona"
                    ? // Jika props.type bukan "persona", lakukan looping biasa
                      props.options.map((option) => (
                        <Option
                          text={option.text}
                          value={option.value}
                          key={option.value}
                        >
                          {option.text}
                        </Option>
                      ))
                    : // options untuk persona
                      props.options.map((option) => (
                        <Option
                          text={option.text}
                          value={option.value}
                          key={option.value}
                        >
                          <Persona
                            avatar={{ color: "colorful", "aria-hidden": true }}
                            name={option.text}
                            presence={{
                              status: option.data.status,
                            }}
                            secondaryText={option.data.secondaryText}
                          />
                        </Option>
                      ))
                  : // jika ada props.onRenderOption
                    props.options.map((option) => (
                      <Option
                        text={option.text}
                        value={option.value}
                        key={option.value}
                      >
                        {props.onRenderOption(option)}
                      </Option>
                    ))}
              </Combobox>
            ))}

          {!isEditing && (
            <div style={{ display: "flex" }}>
              <InactiveReadView
                defaultValue={
                  props.value
                    ? getTextForTextField(
                        props.value as string[],
                        props.options
                      )
                    : getTextForTextField(selectedOptions, props.options)
                }
                // props.onRenderSelectedOption
                input={{
                  children: () => {
                  // onRenderDefaultValue menjadi undefined hanya jika :
                    if (props.type === "dropdown" && !!!props.onRenderSelectedOption) return <div/>;

                    if (props.onRenderSelectedOption) {
                      return props.onRenderSelectedOption(selectedOptions);
                    } else {
                      // jika tidak ada props.onRenderSelectedOptions, maka jalankan preset onRenderSelectedOptions sesuai tipenya
                      return (
                        <div>
                          {/* preset onRenderSelectedOptions untuk single persona */}
                          {props.type === "persona" &&
                            !props.multiSelect &&
                            (selectedOptions.length > 0 ||
                              props?.value?.length > 0) && (
                              <Persona
                                textAlignment="center"
                                size="small"
                                avatar={{
                                  color: "colorful",
                                  "aria-hidden": true,
                                }}
                                name={nameForPersona[0] as string}
                                presence={{
                                  status: getObjectFromOption?.data?.status,
                                }}
                                secondaryText={
                                  getObjectFromOption?.data?.secondaryText
                                }
                              />
                            )}
                          {/* preset onRenderSelectedOption untuk multi persona */}
                          {props.type === "persona" &&
                            props.multiSelect &&
                            (selectedOptions.length > 0 ||
                              props?.value?.length > 0) && (
                              <AvatarGroup layout="stack" size={24}>
                                {partitionedItems.inlineItems.map(
                                  (name) => (
                                    <AvatarGroupItem
                                      name={name}
                                      key={name}
                                    />
                                  )
                                )}
                                {partitionedItems.overflowItems && (
                                  <AvatarGroupPopover>
                                    {partitionedItems.overflowItems.map(
                                      (name) => (
                                        <AvatarGroupItem
                                          name={name}
                                          key={name}
                                        />
                                      )
                                    )}
                                  </AvatarGroupPopover>
                                )}
                              </AvatarGroup>
                            )}
                          {/* preset onRenderSelectedOption untuk tags */}
                          {props.type === "tags" &&
                            (selectedOptions.length > 0 ||
                              props?.value?.length > 0) && (
                              <ul
                                className={styles.tagsList}
                                ref={selectedListRef}
                              >
                                {/* The "Remove" span is used for naming the buttons without affecting the Combobox name */}
                                <span id={`${comboId}-remove`} hidden>
                                  Remove
                                </span>
                                {selectedOptions.map((option, i) => (
                                  <li key={option}>
                                    <Button
                                      size="small"
                                      shape="circular"
                                      appearance="primary"
                                      icon={<Dismiss12Regular />}
                                      iconPosition="after"
                                      onClick={() => onTagClick(option, i)}
                                      id={`${comboId}-remove-${i}`}
                                      aria-labelledby={`${comboId}-remove ${comboId}-remove-${i}`}
                                    >
                                      {option}
                                    </Button>
                                  </li>
                                ))}
                              </ul>
                            )}
                        </div>
                      );
                    }
                  }
                }}
                onClick={handleEditClick}
              />
            </div>
          )}
        </Field>
      </div>
    );
  };

  return <InactiveDropdown />;
};

export default FormDropDown;

// INI SINGLE &&&&& TAG --------------------------------------------------------------------

export const SingleTag = (props) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [nameForPersona, setNameForPersona] = React.useState([]);
  const [error, setError] = useState(false);

  // const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tampil, setTampil] = useState<boolean>(true);
  const getText = (selectedKeys: string[], options: OptionsDropDown[]) => {
    const selectedTexts = (selectedKeys as (string | number)[])?.map(
      (value: string | number) => {
        const selectedOption = options.find((option) => option.value === value);
        return selectedOption ? selectedOption.text : "";
      }
    );
    setNameForPersona(selectedTexts);
  };

  // styles for type tags single and multiple
  const styles = useStyles();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    console.log(selectedOptions, "ini jangan sampai kesentuh");
  }, [selectedOptions]);

  // selected cancel uncontrolled state
  const [cancelData, setCancelData] = React.useState([]);

  // code for type tags
  const comboId = useId("combo-multi");
  const selectedListRef = React.useRef<HTMLUListElement>(null);
  const comboboxInputRef = React.useRef<HTMLInputElement>(null);

  // code for close tag click
  const onTagClick = (option: string, index: number) => {
    // remove selected option
    setSelectedOptions(selectedOptions.filter((o) => o !== option));
    if (props.value) {
      const filterOption = props.value.filter((o) => o !== option);
      props.onChange(filterOption);
    }

    // focus previous or next option, defaulting to focusing back to the combo input
    const indexToFocus = index === 0 ? 1 : index - 1;
    const optionToFocus = selectedListRef.current?.querySelector(
      `#${comboId}-remove-${indexToFocus}`
    );
    if (optionToFocus) {
      (optionToFocus as HTMLButtonElement).focus();
    } else {
      comboboxInputRef.current?.focus();
    }
  };

  useEffect(() => {
    if (props.onValidate) {
      props.onValidate(props.value);
    }
  }, [props.value]);
  useEffect(() => {
    if (props.onValidate) {
      let validationResult;

      if (props.value) {
        validationResult = props.onValidate(props.value);
      } else {
        validationResult = props.onValidate(selectedOptions);
      }

      if (validationResult) {
        setError(true);
      } else {
        setError(false);
      }
    }
  }, [selectedOptions]);

  useEffect(() => {
    if (props.multiSelect) {
      // code for uncontrolled but we have defaultValue from parent
      if (props.defaultValue) {
        setSelectedOptions(props.defaultValue as string[]);
        setCancelData(props.defaultValue as string[]);
      } else {
        setSelectedOptions([]);
        setCancelData([]);
      }
    } else {
      // code for uncontrolled but we have defaultValue from parent
      if (props.defaultValue) {
        setSelectedOptions(props.defaultValue as string[]);
        setCancelData(props.defaultValue as string[]);
      } else {
        setSelectedOptions([]);
        setCancelData([]);
      }
    }
    // if (props.defaultValue) {
    //   getText(props.defaultValue as string[], props.options);
    // }
  }, []);

  // convert array to string
  // Berguna untuk mengkonversi array ke string, sebagai value untuk input saat isEditing false
  function getTextForTextField(
    selectedKeys: string[],
    options: OptionsDropDown[]
  ) {
    const selectedTexts = (selectedKeys as (string | number)[]).map(
      (value: string | number) => {
        const selectedOption = options.find((option) => option.value === value);
        return selectedOption ? selectedOption.text : "";
      }
    );
    return selectedTexts ? selectedTexts.join(", ") : "";
    // }
  }

  // handle save click
  const handleSaveClick = () => {
    if (props.onValidate) {
      let validationResult;

      if (props.value) {
        validationResult = props.onValidate(props.value);
      } else {
        validationResult = props.onValidate(selectedOptions);
      }

      if (validationResult) {
        setError(true);
        return;
      } else {
        setError(false);
      }
    }
    setIsEditing(false);
    if (props.onSave) {
      props.onSave(props.value);
    }
    // code while have value and onChange from parent
    if (props.value && props.onChange) {
      setCancelData(props.value as string[]);
    } else {
      // local state only change if there is no value from parent
      setCancelData(selectedOptions);
    }
    setTampil(true);
  };

  // handle cancel click
  const handleCancelClick = () => {
    setIsEditing(false);
    // setSelectedOptions(cancelData);
    if (props.onCancel) {
      if (props.multiSelect) {
        props.onCancel(cancelData as string[]);
      } else {
        props.onCancel(cancelData as string[]);
      }
    }

    // local state only change if there is no value from parent
    if (!props.value) {
      setSelectedOptions(cancelData);
    }
    setTampil(true);
    // getText(cancelData, props.options);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  // const partitionedItems = partitionAvatarGroupItems({ items: nameForPersona });

  const onChange = (_, item): void => {
    if (item) {
      const selectedItems = item.selectedOptions;
      if (props.value && props.onChange) {
        props.onChange(selectedItems);
      } else {
        setSelectedOptions(selectedItems);
      }
      getText(selectedItems, props.options);
    }
    if (props.onValidate) {
      let validationResult;

      if (props.value) {
        validationResult = props.onValidate(props.value);
      } else {
        validationResult = props.onValidate(selectedOptions);
      }

      if (validationResult) {
        setError(true);
      } else {
        setError(false);
      }
    }
    setTampil(false);
  };

  return (
    <div>
      <Field
        validationMessage={error ? "Input harus mencukupi" : undefined}
        validationState={error ? "warning" : undefined}
        label={props.label}
        orientation={props.orientation}
        hint={
          isEditing
            ? {
                children: (_: unknown, slotProps) => (
                  <div
                    style={{ display: "flex", gap: "6px", marginTop: "6px" }}
                  >
                    <Button appearance="primary" onClick={handleSaveClick}>
                      Save
                    </Button>
                    <Button appearance="secondary" onClick={handleCancelClick}>
                      Cancel
                    </Button>
                  </div>
                ),
              }
            : undefined // Tidak menampilkan hint jika isEditing bernilai false
        }
      >
        {isEditing && (
          // ALL OF SINGLE SELECT

          <Combobox
            onOpenChange={(_, data) => setIsOpen(data.open)}
            onOptionSelect={onChange}
            value={props?.value||nameForPersona[0]}
            selectedOptions={
              props.value
                ? (props.value as string[])
                : (selectedOptions as string[])
            }
           
          >
            {/* render options */}
            {!props.onRenderOption
              ? // dibawah ini semua preset render option
                props.type !== "persona"
                ? // Jika props.type bukan "persona", lakukan looping biasa
                  props.options.map((option) => (
                    <Option
                      text={option.text}
                      value={option.value}
                      key={option.value}
                    >
                      {option.text}
                    </Option>
                  ))
                : // options untuk persona
                  props.options.map((option) => (
                    <Option
                      text={option.text}
                      value={option.value}
                      key={option.value}
                    >
                      <Persona
                        avatar={{ color: "colorful", "aria-hidden": true }}
                        name={option.text}
                        presence={{
                          status: option.data.status,
                        }}
                        secondaryText={option.data.secondaryText}
                      />
                    </Option>
                  ))
              : // jika ada props.onRenderOption
                props.options.map((option) => (
                  <Option
                    text={option.text}
                    value={option.value}
                    key={option.value}
                  >
                    {props.onRenderOption(option)}
                  </Option>
                ))}
          </Combobox>
        )}

        {!isEditing && (
          <div style={{ display: "flex" }}>
            <InactiveReadView
              defaultValue={
                props.value
                  ? getTextForTextField(props.value as string[], props.options)
                  : getTextForTextField(selectedOptions, props.options)
              }
              // props.onRenderSelectedOption
              input={{
                children:()=>{
                // onRenderDefaultValue menjadi undefined hanya jika :
                if(selectedOptions.length === 0 ||
                props.type === "dropdown" && !!!props.onRenderSelectedOption) return <div/>
           
             
                      if (props.onRenderSelectedOption) {
                        return props.onRenderSelectedOption(selectedOptions);
                      } else {
                        // jika tidak ada props.onRenderSelectedOptions, maka jalankan preset onRenderSelectedOptions sesuai tipenya
                        return (
                          <>
                            {/* preset onRenderSelectedOption untuk tags */}
                            {props.type === "tags" &&
                              selectedOptions.length > 0 && (
                                <ul
                                  className={styles.tagsList}
                                  ref={selectedListRef}
                                >
                                  {/* The "Remove" span is used for naming the buttons without affecting the Combobox name */}
                                  <span id={`${comboId}-remove`} hidden>
                                    Remove
                                  </span>
                                  {selectedOptions.map((option, i) => (
                                    <li key={option}>
                                      <Button
                                        size="small"
                                        shape="circular"
                                        appearance="primary"
                                        icon={<Dismiss12Regular />}
                                        iconPosition="after"
                                        onClick={() => onTagClick(option, i)}
                                        id={`${comboId}-remove-${i}`}
                                        aria-labelledby={`${comboId}-remove ${comboId}-remove-${i}`}
                                      >
                                        {option}
                                      </Button>
                                    </li>
                                  ))}
                                </ul>
                              )}

                            {props.type === "tags" &&
                              props?.value?.length > 0 && (
                                <ul
                                  className={styles.tagsList}
                                  ref={selectedListRef}
                                >
                                  {/* The "Remove" span is used for naming the buttons without affecting the Combobox name */}
                                  <span id={`${comboId}-remove`} hidden>
                                    Remove
                                  </span>
                                  {props.value.map((option, i) => (
                                    <li key={option}>
                                      <Button
                                        size="small"
                                        shape="circular"
                                        appearance="primary"
                                        icon={<Dismiss12Regular />}
                                        iconPosition="after"
                                        onClick={() => onTagClick(option, i)}
                                        id={`${comboId}-remove-${i}`}
                                        aria-labelledby={`${comboId}-remove ${comboId}-remove-${i}`}
                                      >
                                        {option}
                                      </Button>
                                    </li>
                                  ))}
                                </ul>
                              )}
                          </>
                        );
                      }
                    }
                  
              }}
              onClick={handleEditClick}
            />
          </div>
        )}
      </Field>
    </div>
  );
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const SinglePersona = (props) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const [error, setError] = useState(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tampil, setTampil] = useState<boolean>(true);

  // this state is for single persona to get status and secondary text
  // state ini untuk mendapatkan object dari options berdasarkan selectedOption yang dipilih, berguna untuk persona single
  const [getObjectFromOption, setGetObjectFromOption] =
    React.useState<OptionsDropDown>();

  // styles for type tags single and multiple
  const styles = useStyles();
  const [isEditing, setIsEditing] = useState(false);

  // selected cancel uncontrolled state
  const [cancelData, setCancelData] = React.useState([]);

  // name for Persona
  // kita butuh nameForPersona, karna kita butuh array of string dari nama2 yang di select, berguna untuk AvatarImage persona multiple
  const [nameForPersona, setNameForPersona] = React.useState([]);

  // matching the selectedOption to text in props.options
  //menghasilkan array of string dari option.text
  // misalnya : ['Katri Athokas', 'Elvia Atkins', 'Cameron Evans']
  const getText = (selectedKeys: string[], options: OptionsDropDown[]) => {
    const selectedTexts = (selectedKeys as (string | number)[]).map(
      (value: string | number) => {
        const selectedOption = options.find((option) => option.value === value);
        return selectedOption ? selectedOption.text : "";
      }
    );
    setNameForPersona(selectedTexts);
  };

  // useEffect(() => {
  //   if (props.value.length > 0) {
  //     dapatObject(props.value, props.options);
  //   }

  //   console.log("trigger");
  // }, [props.value]);

  useEffect(() => {
    dapatObject(selectedOptions, props.options);
    if (props.onValidate) {
      let validationResult;
      if (props.value) {
        validationResult = props.onValidate(props.value);
      } else {
        validationResult = props.onValidate(selectedOptions);
      }

      if (validationResult) {
        setError(true);
      } else {
        setError(false);
      }
    }
  }, [selectedOptions]);

  useEffect(() => {
    // code for uncontrolled but we have defaultValue from parent
    if (props.defaultValue) {
      setSelectedOptions(props.defaultValue as string[]);
      setCancelData(props.defaultValue as string[]);
    } else {
      setSelectedOptions([]);
      setCancelData([]);
    }
    // }
    if (props.defaultValue) {
      getText(props.defaultValue as string[], props.options);
    }
  }, []);

  // convert array to string
  // Berguna untuk mengkonversi array ke string, sebagai value untuk input saat isEditing false
  function dapatObject(selectedKeys: string[], options: OptionsDropDown[]) {
    const selectedOption = options.find(
      (option) => option.value === selectedKeys[0]
    );
    // get object from props.options for single selectedOption
    setGetObjectFromOption(selectedOption);
  }
  function getTextForTextField(
    selectedKeys: string[],
    options: OptionsDropDown[]
  ) {
    if (!props.multiSelect) {
      const selectedOption = options.find(
        (option) => option.value === selectedKeys[0]
      );

      // setGetObjectFromOption(selectedOption);
      return selectedOption ? selectedOption.text : "";
    }
  }

  // handle save click
  const handleSaveClick = () => {
    if (props.onValidate) {
      let validationResult;
      if (props.value) {
        validationResult = props.onValidate(props.value);
      } else {
        validationResult = props.onValidate(selectedOptions);
      }

      if (validationResult) {
        setError(true);
        return;
      } else {
        setError(false);
      }
    }
    setIsEditing(false);
    if (props.onSave) {
      props.onSave(props.value);
    }
    // code while have value and onChange from parent
    if (props.value && props.onChange) {
      setCancelData(props.value as string[]);
    } else {
      // local state only change if there is no value from parent
      setCancelData(selectedOptions);
    }
    setTampil(true);
  };

  // handle cancel click
  const handleCancelClick = () => {
    setIsEditing(false);
    // setSelectedOptions(cancelData);
    if (props.onCancel) {
      if (props.multiSelect) {
        props.onCancel(cancelData as string[]);
      } else {
        props.onCancel(cancelData as string[]);
      }
    }

    // local state only change if there is no value from parent
    if (!props.value) {
      setSelectedOptions(cancelData);
    }
    getText(cancelData, props.options);
    setTampil(true);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const partitionedItems = partitionAvatarGroupItems({ items: nameForPersona });

  const onChange = (_, item): void => {
    if (item) {
      const selectedItems = item.selectedOptions;
      if (props.value && props.onChange) {
        props.onChange(selectedItems);
      } else {
        setSelectedOptions(selectedItems);
      }
      getText(selectedItems, props.options);
    }
    if (props.onValidate) {
      const validationResult = props.onValidate(selectedOptions);

      if (validationResult) {
        setError(true);
      } else {
        setError(false);
      }
    }
    setTampil(false);
  };

  return (
    <div>
      <Field
        validationMessage={error ? "Input harus mencukupi" : undefined}
        validationState={error ? "warning" : undefined}
        label={props.label}
        orientation={props.orientation}
        hint={
          isEditing
            ? {
                children: (_: unknown, slotProps) => (
                  <div
                    style={{ display: "flex", gap: "6px", marginTop: "6px" }}
                  >
                    <Button appearance="primary" onClick={handleSaveClick}>
                      Save
                    </Button>
                    <Button appearance="secondary" onClick={handleCancelClick}>
                      Cancel
                    </Button>
                  </div>
                ),
              }
            : undefined // Tidak menampilkan hint jika isEditing bernilai false
        }
      >
        {isEditing && (
          // ALL OF SINGLE SELECT
          <>
            <Combobox
              onOpenChange={(_, data) => setIsOpen(data.open)}
              value={props.value?.join(' ') || nameForPersona[0]}
              
              onOptionSelect={onChange}
              selectedOptions={
                props.value
                  ? (props.value as string[])
                  : (selectedOptions as string[])
              }
            >
              {/* render options */}
              {!props.onRenderOption
                ? // dibawah ini semua preset render option
                  // options untuk persona
                  props.options.map((option) => (
                    <Option
                      text={option.text}
                      value={option.value}
                      key={option.value}
                    >
                      <Persona
                        avatar={{ color: "colorful", "aria-hidden": true }}
                        name={option.text}
                        presence={{
                          status: option.data.status,
                        }}
                        secondaryText={option.data.secondaryText}
                      />
                    </Option>
                  ))
                : // jika ada props.onRenderOption
                  props.options.map((option) => (
                    <Option
                      text={option.text}
                      value={option.value}
                      key={option.value}
                    >
                      {props.onRenderOption(option)}
                    </Option>
                  ))}
            </Combobox>
          </>
        )}

        {!isEditing && (
          <div style={{ display: "flex" }}>
            <InactiveReadView
              defaultValue={
                props.value
                  ? getTextForTextField(props.value as string[], props.options)
                  : getTextForTextField(selectedOptions, props.options)
              }
              // props.onRenderSelectedOption
              input={{
                children:()=>{
                // onRenderDefaultValue menjadi undefined hanya jika :
                if(selectedOptions.length === 0 ||
                (props.type === "dropdown" && !!!props.onRenderSelectedOption)) return (<div/>)
              
               
                      if (props.onRenderSelectedOption) {
                        return props.onRenderSelectedOption(selectedOptions);
                      } else {
                        // jika tidak ada props.onRenderSelectedOptions, maka jalankan preset onRenderSelectedOptions sesuai tipenya
                        return (
                          <>
                            {/* preset onRenderSelectedOptions untuk single persona */}
                            {props.type === "persona" &&
                              !props.multiSelect &&
                              (selectedOptions.length > 0 ||
                                props?.value?.length > 0) && (
                                <Persona
                                  textAlignment="center"
                                  size="extra-small"
                                  avatar={{
                                    color: "colorful",
                                    "aria-hidden": true,
                                  }}
                                  name={nameForPersona[0] as string}
                                  // presence={{
                                  //   status: getObjectFromOption?.data?.status,
                                  // }}
                                  // secondaryText={
                                  //   getObjectFromOption?.data?.secondaryText
                                  // }
                                />
                              )}
                          </>
                        );
                      }
                    }
                  
              }}
              onClick={handleEditClick}
            />
          </div>
        )}
      </Field>
    </div>
  );
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const SingleDropDown = (props) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [nameForPersona, setNameForPersona] = React.useState([]);
  const [error, setError] = useState(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tampil, setTampil] = useState<boolean>(true);

  // styles for type tags single and multiple
  const styles = useStyles();
  const [isEditing, setIsEditing] = useState(false);

  const [simpanDropdown, setSimpanDropdown] = useState("");
  const getText = (selectedKeys: string[], options: OptionsDropDown[]) => {
    const selectedTexts = (selectedKeys as (string | number)[])?.map(
      (value: string | number) => {
        const selectedOption = options.find((option) => option.value === value);
        return selectedOption ? selectedOption.text : "";
      }
    );
    setNameForPersona(selectedTexts);
  };
  // selected cancel uncontrolled state
  const [cancelData, setCancelData] = React.useState([]);

  useEffect(() => {
    if (props.onValidate) {
      props.onValidate(props.value);
    }
  }, [props.value]);

  useEffect(() => {
    getTextForTextField(selectedOptions, props.options);
    setSimpanDropdown(getTextForTextField(selectedOptions, props.options));
    if (props.onValidate) {
      const validationResult = props.onValidate(selectedOptions);

      if (validationResult) {
        setError(true);
      } else {
        setError(false);
      }
    }
    console.log(getTextForTextField(selectedOptions, props.options), "Hahahaha")
  }, [selectedOptions]);

  useEffect(() => {
    if (props.defaultValue) {
      setSelectedOptions(props.defaultValue as string[]);
      setCancelData(props.defaultValue as string[]);
    } else {
      setSelectedOptions([]);
      setCancelData([]);
    }
    // }
    // if (props.defaultValue) {
    //   getText(props.defaultValue as string[], props.options);
    // }
  }, []);

  // convert array to string
  // Berguna untuk mengkonversi array ke string, sebagai value untuk input saat isEditing false
  function getTextForTextField(
    selectedKeys: string[],
    options: OptionsDropDown[]
  ) {
    const selectedTexts = (selectedKeys as (string | number)[]).map(
      (value: string | number) => {
        const selectedOption = options.find((option) => option.value === value);
        return selectedOption ? selectedOption.text : "";
      }
    );
    return selectedTexts ? selectedTexts.join(", ") : "";
  }

  // handle save click
  const handleSaveClick = () => {
    if (props.onValidate) {
      let validationResult;

      if (props.value) {
        props.onValidate(props.value);
      } else {
        props.onValidate(selectedOptions);
      }
      if (validationResult) {
        setError(true);
        return;
      } else {
        setError(false);
      }
    }
    setIsEditing(false);
    if (props.onSave) {
      props.onSave(props.value);
    }
    // code while have value and onChange from parent
    if (props.value && props.onChange) {
      setCancelData(props.value as string[]);
    } else {
      // local state only change if there is no value from parent
      setCancelData(selectedOptions);
    }
    setTampil(true);
  };

  // handle cancel click
  const handleCancelClick = () => {
    setIsEditing(false);
    if (props.onCancel) {
      if (props.multiSelect) {
        props.onCancel(cancelData as string[]);
      } else {
        props.onCancel(cancelData as string[]);
      }
    }

    // local state only change if there is no value from parent
    if (!props.value) {
      setSelectedOptions(cancelData);
    }
    // getText(cancelData, props.options);
    setTampil(true);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const onChange = (_, item): void => {
    if (item) {
      const selectedItems = item.selectedOptions;
      if (props.value && props.onChange) {
        props.onChange(selectedItems);
      } else {
        setSelectedOptions(selectedItems);
      }
      getText(selectedItems, props.options);
    }
    if (props.onValidate) {
      const validationResult = props.onValidate(selectedOptions);

      if (validationResult) {
        setError(true);
      } else {
        setError(false);
      }
    }
    setTampil(false);
  };

  return (
    <div>
      <Field
        validationMessage={error ? "Input harus mencukupi" : undefined}
        validationState={error ? "warning" : undefined}
        label={props.label}
        orientation={props.orientation}
        hint={
          isEditing
            ? {
                children: (_: unknown, slotProps) => (
                  <div
                    style={{ display: "flex", gap: "6px", marginTop: "6px" }}
                  >
                    <Button appearance="primary" onClick={handleSaveClick}>
                      Save
                    </Button>
                    <Button appearance="secondary" onClick={handleCancelClick}>
                      Cancel
                    </Button>
                  </div>
                ),
              }
            : undefined // Tidak menampilkan hint jika isEditing bernilai false
        }
      >
        {isEditing && (
          // ALL OF SINGLE SELECT
          <Combobox
            onOpenChange={(_, data) => setIsOpen(data.open)}
            onOptionSelect={onChange}
            // value={props?.value || nameForPersona[0]}
            selectedOptions={
              props.value
                ? (props.value as string[])
                : (selectedOptions as string[])
            }
          
          >
            {/* render options */}
            {!props.onRenderOption
              ? // dibawah ini semua preset render option
                props.type !== "persona"
                ? // Jika props.type bukan "persona", lakukan looping biasa
                  props.options.map((option) => (
                    <Option
                      text={option.text}
                      value={option.value}
                      key={option.value}
                    >
                      {option.text}
                    </Option>
                  ))
                : undefined
              : // jika ada props.onRenderOption
                props.options.map((option) => (
                  <Option
                    text={option.text}
                    value={option.value}
                    key={option.value}
                  >
                    {props.onRenderOption(option)}
                  </Option>
                ))}
          </Combobox>
        )}

        {!isEditing && (
          <div style={{ display: "flex" }}>
            <InactiveReadView
              defaultValue={
                props.value
                  ? getTextForTextField(props.value as string[], props.options)
                  : getTextForTextField(selectedOptions, props.options)
              }
              // props.onRenderSelectedOption
              input={{
                children:()=>{
                // onRenderDefaultValue menjadi undefined hanya jika :
                if(props.type==="dropdown" && selectedOptions.length>0){
                  return (
                    <>
                      <span>{simpanDropdown}</span>
                  </>
                  )
                }
                if(props.type === "dropdown"&& selectedOptions.length===0 && !!!props.onRenderSelectedOption) return (<div/>)
           
               
                      if (props.onRenderSelectedOption) {
                        return props.onRenderSelectedOption(selectedOptions);
                      }
                    }
                    
                  
              }}
              onClick={handleEditClick}
            />
          </div>
        )}
      </Field>
    </div>
  );
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// MULTI PERSONA
export const MultiPersona = (props) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [buka, setBuka] = useState<boolean>(false);

  // styles for type tags single and multiple
  const styles = useStyles();
  const [isEditing, setIsEditing] = useState(false);

  // selected cancel uncontrolled state
  const [cancelData, setCancelData] = React.useState([]);

  // kita butuh nameForPersona, karna kita butuh array of string dari nama2 yang di select, berguna untuk AvatarImage persona multiple
  const [nameForPersona, setNameForPersona] = React.useState([]);

  // matching the selectedOption to text in props.options
  //menghasilkan array of string dari option.text
  // misalnya : ['Katri Athokas', 'Elvia Atkins', 'Cameron Evans']
  const getText = (selectedKeys: string[], options: OptionsDropDown[]) => {
    const selectedTexts = (selectedKeys as (string | number)[])?.map(
      (value: string | number) => {
        const selectedOption = options.find((option) => option.value === value);
        return selectedOption ? selectedOption.text : "";
      }
    );
    setNameForPersona(selectedTexts);
  };

  useEffect(() => {
    console.log(selectedOptions, "ini jangan sampai kesentuh");
  }, [selectedOptions]);

  useEffect(() => {
    getText(props.value, props.options);
  }, [props.value]);

  useEffect(() => {
    getText(selectedOptions, props.options);
    if (props.onValidate) {
      const validationResult = props.onValidate(selectedOptions);

      if (validationResult) {
        setError(true);
      } else {
        setError(false);
      }
    }
  }, [selectedOptions]);

  useEffect(() => {
    getText(selectedOptions, props.options);
    if (props.defaultValue) {
      setSelectedOptions(props.defaultValue as string[]);
      setCancelData(props.defaultValue as string[]);
      getText(props.defaultValue as string[], props.options);
    } else {
      setSelectedOptions([]);
      setCancelData([]);
      // getText(props.defaultValue as string[], props.options);
    }
  }, []);

  // convert array to string
  // Berguna untuk mengkonversi array ke string, sebagai value untuk input saat isEditing false
  function getTextForTextField(
    selectedKeys: string[],
    options: OptionsDropDown[]
  ) {
    const selectedTexts = (selectedKeys as (string | number)[]).map(
      (value: string | number) => {
        const selectedOption = options.find((option) => option.value === value);
        return selectedOption ? selectedOption.text : "";
      }
    );
    return selectedTexts ? selectedTexts.join(", ") : "";
  }

  // handle save click
  const handleSaveClick = () => {
    if (props.onValidate) {
      let validationResult;

      if (props.value) {
        validationResult = props.onValidate(props.value);
      } else {
        validationResult = props.onValidate(selectedOptions);
      }
      if (validationResult) {
        setError(true);
        return;
      } else {
        setError(false);
      }
    }
    setIsEditing(false);
    if (props.onSave) {
      props.onSave(props.value);
    }
    // code while have value and onChange from parent
    if (props.value && props.onChange) {
      setCancelData(props.value as string[]);
    } else {
      // local state only change if there is no value from parent
      setCancelData(selectedOptions);
    }
  };

  // handle cancel click
  const handleCancelClick = () => {
    setIsEditing(false);
    // setSelectedOptions(cancelData);
    if (props.onCancel) {
      if (props.multiSelect) {
        props.onCancel(cancelData as string[]);
      } else {
        props.onCancel(cancelData as string[]);
      }
    }

    // local state only change if there is no value from parent
    if (!props.value) {
      setSelectedOptions(cancelData);
    }
    getText(cancelData, props.options);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const partitionedItems = partitionAvatarGroupItems({ items: nameForPersona });

  const onChange = (_, item): void => {
    const selectedItems = item.selectedOptions;
    if (!props.value) {
      setSelectedOptions(selectedItems);
    } else {
      props.onChange(selectedItems);
    }
    // getText(selectedItems, props.options);
  };

  return (
    <Field
      validationMessage={error ? "Input harus mencukupi" : undefined}
      validationState={error ? "warning" : undefined}
      label={props.label}
      orientation={props.orientation}
      hint={
        isEditing
          ? {
              children: (_: unknown, slotProps) => (
                <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
                  <Button appearance="primary" onClick={handleSaveClick}>
                    Save
                  </Button>
                  <Button appearance="secondary" onClick={handleCancelClick}>
                    Cancel
                  </Button>
                </div>
              ),
            }
          : undefined // Tidak menampilkan hint jika isEditing bernilai false
      }
    >
      {isEditing && (
        <Combobox
          onOpenChange={(event, data) => {
            setIsOpen(data.open);
          }}
          input={{
            children: (type, props) => (
              <div
                style={{
                  marginLeft:"8px",
                  display: "flex",
                }}
              >
                {!isOpen &&
                  ((Array.isArray(props?.value) && props.value.length > 0) ||
                    (typeof props?.value === "string" &&
                      props.value.length > 0) ||
                    selectedOptions.length > 0) && (
                    <AvatarGroup
                      layout="stack"
                      style={{
                        // padding: "3px 2px 0 2px",
                        // margin: "0 8.5px",
                        padding: "0 2px",
                        alignItems: "center",
                      }}
                      size={24}
                    >
                      {partitionedItems.inlineItems.map((name) => (
                        <AvatarGroupItem name={name} key={name} />
                      ))}
                      {partitionedItems.overflowItems && (
                        <AvatarGroupPopover>
                          {partitionedItems.overflowItems.map((name) => (
                            <AvatarGroupItem
                              name={name}
                              key={name}
                            />
                          ))}
                        </AvatarGroupPopover>
                      )}
                    </AvatarGroup>
                  )}

                <input {...props} style={{ width: "100%" }} />
              </div>
            ),
          }}
          multiselect
          selectedOptions={
            props.value
              ? (props.value as string[])
              : (selectedOptions as string[])
          }
          onOptionSelect={onChange}
        >
          {props.options.map((option) => (
            <Option text={option.text} value={option.value} key={option.value}>
              <Persona
                avatar={{ color: "colorful", "aria-hidden": true }}
                name={option.text}
                presence={{
                  status: option.data.status,
                }}
                secondaryText={option.data.secondaryText}
              />
            </Option>
          ))}
        </Combobox>
      )}

      {!isEditing && (
        <div style={{ display: "flex" }}>
          <InactiveReadView
            defaultValue={
              props.value
                ? getTextForTextField(props.value as string[], props.options)
                : getTextForTextField(selectedOptions, props.options)
            }
            // props.onRenderSelectedOption
            input={{
              children:()=>{
              // onRenderDefaultValue menjadi undefined hanya jika :
              if(selectedOptions.length === 0 ||
              (props.type === "dropdown" && !!!props.onRenderSelectedOption)) return <div/>
       
                    if (props.onRenderSelectedOption) {
                      return props.onRenderSelectedOption(selectedOptions);
                    } else {
                      // jika tidak ada props.onRenderSelectedOptions, maka jalankan preset onRenderSelectedOptions sesuai tipenya
                      return (
                        <>
                          {/* preset onRenderSelectedOption untuk multi persona */}
                          {props.type === "persona" &&
                            props.multiSelect &&
                            (selectedOptions.length > 0 ||
                              props?.value?.length > 0) && (
                              <AvatarGroup layout="stack" size={24}>
                                {partitionedItems.inlineItems.map((name) => (
                                  <AvatarGroupItem name={name} key={name} />
                                ))}
                                {partitionedItems.overflowItems && (
                                  <AvatarGroupPopover>
                                    {partitionedItems.overflowItems.map(
                                      (name) => (
                                        <AvatarGroupItem
                                          name={name}
                                          key={name}
                                        />
                                      )
                                    )}
                                  </AvatarGroupPopover>
                                )}
                              </AvatarGroup>
                            )}
                        </>
                      );
                    }
                  
                }
            }}
            onClick={handleEditClick}
          />
        </div>
      )}
    </Field>
  );
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// MULTI TAG
export const MultiTag = (props) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const [error, setError] = useState(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [buka, setBuka] = useState<boolean>(false);

  const styles = useStyles();
  const [isEditing, setIsEditing] = useState(false);

  // selected cancel uncontrolled state
  const [cancelData, setCancelData] = React.useState([]);

  // code for type tags
  const comboId = useId("combo-multi");
  const selectedListRef = React.useRef<HTMLUListElement>(null);
  const comboboxInputRef = React.useRef<HTMLInputElement>(null);

  // code for close tag click
  const onTagClick = (option: string, index: number) => {
    // remove selected option
    setSelectedOptions(selectedOptions.filter((o) => o !== option));
    if (props.value) {
      const filterOption = props.value.filter((o) => o !== option);
      props.onChange(filterOption);
    }

    // focus previous or next option, defaulting to focusing back to the combo input
    const indexToFocus = index === 0 ? 1 : index - 1;
    const optionToFocus = selectedListRef.current?.querySelector(
      `#${comboId}-remove-${indexToFocus}`
    );
    if (optionToFocus) {
      (optionToFocus as HTMLButtonElement).focus();
    } else {
      comboboxInputRef.current?.focus();
    }
  };
  // useEffect(() => {
  //   console.log(props.value, "pppp");
  // }, [props.value]);

  useEffect(() => {
    if (props.onValidate) {
      const validationResult = props.onValidate(selectedOptions);

      if (validationResult) {
        setError(true);
      } else {
        setError(false);
      }
    }
  }, [selectedOptions]);
  // useEffect(() => {
  //   getTextForTextField(selectedOptions, props.options);
  // }, [selectedOptions]);
  useEffect(() => {
    // code for uncontrolled but we have defaultValue from parent
    if (props.defaultValue) {
      setSelectedOptions(props.defaultValue as string[]);
      setCancelData(props.defaultValue as string[]);
    } else {
      setSelectedOptions([]);
      setCancelData([]);
    }
  }, []);

  // Berguna untuk mengkonversi array ke string, sebagai value untuk input saat isEditing false
  function getTextForTextField(
    selectedKeys: string[],
    options: OptionsDropDown[]
  ) {
    const selectedTexts = (selectedKeys as (string | number)[]).map(
      (value: string | number) => {
        const selectedOption = options.find((option) => option.value === value);
        return selectedOption ? selectedOption.text : "";
      }
    );
    return selectedTexts ? selectedTexts.join(", ") : "";
  }

  // handle save click
  const handleSaveClick = () => {
    if (props.onValidate) {
      let validationResult;
      if (props.value) {
        props.onValidate(props.value);
      } else {
        props.onValidate(selectedOptions);
      }

      if (validationResult) {
        setError(true);
        return;
      } else {
        setError(false);
      }
    }
    setIsEditing(false);
    if (props.onSave) {
      props.onSave(props.value);
    }
    // code while have value and onChange from parent
    if (props.value && props.onChange) {
      setCancelData(props.value as string[]);
    } else {
      // local state only change if there is no value from parent
      setCancelData(selectedOptions);
    }
  };

  // handle cancel click
  const handleCancelClick = () => {
    setIsEditing(false);
    // setSelectedOptions(cancelData);
    if (props.onCancel) {
      if (props.multiSelect) {
        props.onCancel(cancelData as string[]);
      } else {
        props.onCancel(cancelData as string[]);
      }
    }

    // local state only change if there is no value from parent
    if (!props.value) {
      setSelectedOptions(cancelData);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  // const partitionedItems = partitionAvatarGroupItems({ items: nameForPersona });

  const onChange = (_, item): void => {
    // if (props.multiSelect) {
    const selectedItems = item.selectedOptions;
    if (!props.value) {
      setSelectedOptions(selectedItems);
    } else {
      props.onChange(selectedItems);
    }

    if (props.onValidate) {
      const validationResult = props.onValidate(selectedOptions);

      if (validationResult) {
        setError(true);
      } else {
        setError(false);
      }
    }
  };

  return (
    <div>
      <Field
        validationMessage={error ? "Input harus mencukupi" : undefined}
        validationState={error ? "warning" : undefined}
        label={props.label}
        orientation={props.orientation}
        hint={
          isEditing
            ? {
                children: (_: unknown, slotProps) => (
                  <div
                    style={{ display: "flex", gap: "6px", marginTop: "6px" }}
                  >
                    <Button appearance="primary" onClick={handleSaveClick}>
                      Save
                    </Button>
                    <Button appearance="secondary" onClick={handleCancelClick}>
                      Cancel
                    </Button>
                  </div>
                ),
              }
            : undefined // Tidak menampilkan hint jika isEditing bernilai false
        }
      >
        {isEditing && (
          // ALL MULTI SELECT
          <Combobox
            onOpenChange={(event, data) => {
              setIsOpen(data.open);
            }}
            input={
              // multi select type tags
              props.type === "tags"
                ? {
                    children: (_, props) => (
                      <div
                        style={{
                          padding: "2px",
                          margin: "0 3px",
                          display: "flex",
                          // flex: "wrap",
                          flexWrap: "wrap",
                          // border: "1px solid red",
                          width: "100%",
                          gap: "2px",
                        }}
                      >
                        <div>
                          {!isOpen && (
                            <ul
                              // className={styles.tagsList}
                              style={{
                                display: "flex",
                                gap: "2px",
                                listStyleType: "none",
                                marginTop: "0",
                                marginLeft: "0",
                                padding: "2px",
                                flexWrap: "wrap",
                                marginBottom: "0px",
                              }}
                              ref={selectedListRef}
                            >
                              {/* The "Remove" span is used for naming the buttons without affecting the Combobox name */}
                              <span id={`${comboId}-remove`} hidden>
                                Remove
                              </span>
                              {!props.value &&
                                selectedOptions.map((option, i) => (
                                  <li key={option}>
                                    <Button
                                      size="small"
                                      shape="circular"
                                      appearance="primary"
                                      icon={<Dismiss12Regular />}
                                      iconPosition="after"
                                      onClick={() => onTagClick(option, i)}
                                      id={`${comboId}-remove-${i}`}
                                      aria-labelledby={`${comboId}-remove ${comboId}-remove-${i}`}
                                    >
                                      <div>{option}</div>
                                    </Button>
                                  </li>
                                ))}
                              {Array.isArray(props.value) &&
                                props.value.length > 0 &&
                                props.value.map((option, i) => (
                                  <li key={option}>
                                    <Button
                                      size="small"
                                      shape="circular"
                                      appearance="primary"
                                      icon={<Dismiss12Regular />}
                                      iconPosition="after"
                                      onClick={() => onTagClick(option, i)}
                                      id={`${comboId}-remove-${i}`}
                                      aria-labelledby={`${comboId}-remove ${comboId}-remove-${i}`}
                                    >
                                      {option}
                                    </Button>
                                  </li>
                                ))}
                            </ul>
                          )}
                        </div>
                        <div
                          style={{
                            // border: "1px solid black",
                            height: "26px",
                            flex: "1", // minWidth: "20%",
                            // maxWidth: "90%",
                          }}
                        >
                          <input
                            // placeholder="type here"
                            style={{ width: "100%" }}
                            {...props}
                          />
                        </div>
                      </div>
                    ),
                  }
                : // multi select type dropdown
                  undefined
            }
            multiselect
            selectedOptions={
              props.value
                ? (props.value as string[])
                : (selectedOptions as string[])
            }
            onOptionSelect={onChange}
          >
            {/* looping option */}
            {props.type !== "persona"
              ? //looping option besides persona
                props.options.map((option) => (
                  <Option
                    text={option.text}
                    value={option.value}
                    key={option.value}
                  >
                    {option.text}
                  </Option>
                ))
              : // looping option for persona
                props.options.map((option) => (
                  <Option
                    text={option.text}
                    value={option.value}
                    key={option.value}
                  >
                    <Persona
                      avatar={{ color: "colorful", "aria-hidden": true }}
                      name={option.text}
                      presence={{
                        status: option.data.status,
                      }}
                      secondaryText={option.data.secondaryText}
                    />
                  </Option>
                ))}
          </Combobox>
        )}

        {!isEditing && (
          <div style={{ display: "flex" }}>
            <InactiveReadView
              defaultValue={
                props.value
                  ? getTextForTextField(props.value as string[], props.options)
                  : getTextForTextField(selectedOptions, props.options)
              }
              // props.onRenderSelectedOption
              input={{
                children:()=>{
                // onRenderDefaultValue menjadi undefined hanya jika :
                if(selectedOptions.length === 0 ||
                (props.type === "dropdown" && !!!props.onRenderSelectedOption)) return <div/>
          
             
                      if (props.onRenderSelectedOption) {
                        return props.onRenderSelectedOption(selectedOptions);
                      } else {
                        // jika tidak ada props.onRenderSelectedOptions, maka jalankan preset onRenderSelectedOptions sesuai tipenya
                        return (
                          <div>
                            {/* preset onRenderSelectedOption untuk tags */}
                            {props.type === "tags" &&
                              (selectedOptions.length > 0 ||
                                props?.value?.length > 0) && (
                                <ul
                                  // className={styles.tagsList}
                                  style={{
                                    display: "flex",
                                    gap: "2px",
                                    listStyleType: "none",
                                    margin: "0 0",

                                    padding: "3px 0 3px 0 ",
                                    flexWrap: "wrap",
                                  }}
                                  ref={selectedListRef}
                                >
                                  {/* The "Remove" span is used for naming the buttons without affecting the Combobox name */}
                                  <span id={`${comboId}-remove`} hidden>
                                    Remove
                                  </span>
                                  {!props.value
                                    ? selectedOptions.map((option, i) => (
                                        <li key={option}>
                                          <Button
                                            size="small"
                                            shape="circular"
                                            appearance="primary"
                                            icon={<Dismiss12Regular />}
                                            iconPosition="after"
                                            onClick={() =>
                                              onTagClick(option, i)
                                            }
                                            id={`${comboId}-remove-${i}`}
                                            aria-labelledby={`${comboId}-remove ${comboId}-remove-${i}`}
                                          >
                                            {option}
                                          </Button>
                                        </li>
                                      ))
                                    : props?.value?.map((option, i) => (
                                        <li key={option}>
                                          <Button
                                            size="small"
                                            shape="circular"
                                            appearance="primary"
                                            icon={<Dismiss12Regular />}
                                            iconPosition="after"
                                            onClick={() =>
                                              onTagClick(option, i)
                                            }
                                            id={`${comboId}-remove-${i}`}
                                            aria-labelledby={`${comboId}-remove ${comboId}-remove-${i}`}
                                          >
                                            {option}
                                          </Button>
                                        </li>
                                      ))}
                                </ul>
                              )}
                          </div>
                        );
                      }
                    }
           
              }}
              onClick={handleEditClick}
            />
          </div>
        )}
      </Field>
    </div>
  );
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Multi Dropdown
export const MultiDropDown = (props) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const [error, setError] = useState(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  // styles for type tags single and multiple
  const styles = useStyles();
  const [isEditing, setIsEditing] = useState(false);

  const [simpanDropdown, setSimpanDropdown] = useState("");

  // selected cancel uncontrolled state
  const [cancelData, setCancelData] = React.useState([]);

  useEffect(() => {
    getTextForTextField(selectedOptions, props.options);
    setSimpanDropdown(getTextForTextField(selectedOptions, props.options));

    if (props.onValidate) {
      const validationResult = props.onValidate(selectedOptions);

      if (validationResult) {
        setError(true);
      } else {
        setError(false);
      }
    }
    console.log(simpanDropdown, "simpan drop down")
  }, [selectedOptions]);

  useEffect(() => {
    if (props.defaultValue) {
      setSelectedOptions(props.defaultValue as string[]);
      setCancelData(props.defaultValue as string[]);
    } else {
      setSelectedOptions([]);
      setCancelData([]);
    }
  }, []);

  // convert array to string
  // Berguna untuk mengkonversi array ke string, sebagai value untuk input saat isEditing false
  function getTextForTextField(
    selectedKeys: string[],
    options: OptionsDropDown[]
  ) {
    const selectedTexts = (selectedKeys as (string | number)[]).map(
      (value: string | number) => {
        const selectedOption = options.find((option) => option.value === value);
        return selectedOption ? selectedOption.text : "";
      }
    );

    return selectedTexts ? selectedTexts.join(", ") : "";
  }

  // handle save click
  const handleSaveClick = () => {
    if (props.onValidate) {
      const validationResult = props.onValidate(selectedOptions);

      if (validationResult) {
        setError(true);
        return;
      } else {
        setError(false);
      }
    }
    setIsEditing(false);
    if (props.onSave) {
      props.onSave(props.value);
    }
    // code while have value and onChange from parent
    if (props.value && props.onChange) {
      setCancelData(props.value as string[]);
    } else {
      // local state only change if there is no value from parent
      setCancelData(selectedOptions);
    }
  };

  // handle cancel click
  const handleCancelClick = () => {
    setIsEditing(false);
    // setSelectedOptions(cancelData);
    if (props.onCancel) {
      if (props.multiSelect) {
        props.onCancel(cancelData as string[]);
      } else {
        props.onCancel(cancelData as string[]);
      }
    }

    // local state only change if there is no value from parent
    if (!props.value) {
      setSelectedOptions(cancelData);
    }
    // getText(cancelData, props.options);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const onChange = (_, item): void => {
    const selectedItems = item.selectedOptions;
    if (!props.value) {
      setSelectedOptions(selectedItems);
    } else {
      props.onChange(selectedItems);
    }
    // getText(selectedItems, props.options);

    if (props.onValidate) {
      const validationResult = props.onValidate(selectedOptions);

      if (validationResult) {
        setError(true);
      } else {
        setError(false);
      }
    }
  };

  return (
    <div>
      <Field
        validationMessage={error ? "Input harus mencukupi" : undefined}
        validationState={error ? "warning" : undefined}
        label={props.label}
        orientation={props.orientation}
        hint={
          isEditing
            ? {
                children: (_: unknown, slotProps) => (
                  <div
                    style={{ display: "flex", gap: "6px", marginTop: "6px" }}
                  >
                    <Button appearance="primary" onClick={handleSaveClick}>
                      Save
                    </Button>
                    <Button appearance="secondary" onClick={handleCancelClick}>
                      Cancel
                    </Button>
                  </div>
                ),
              }
            : undefined // Tidak menampilkan hint jika isEditing bernilai false
        }
      >
        {isEditing && (
          // ALL MULTI SELECT
          <Combobox
            onOpenChange={(event, data) => {
              setIsOpen(data.open);
            }}
            input={{
              children: (type, props) => (
                <div
                  style={{
                    padding: "2px",
                    height: "fit-content",
                    // margin: "0 5px",
                    display: "flex",
                    width: "100%",
                    flexWrap: "wrap",
                    // border: "1px red solid",
                  }}
                >
                  <div>
                    {" "}
                    {selectedOptions.length > 0 && !isOpen && (
                      <div
                        style={{
                          padding: "2px 0 0 8px",
                          // border: "1px black solid",
                        }}
                      >
                        {simpanDropdown}
                      </div>
                    )}
                  </div>
                  <div style={{ flex: "1" }}>
                    <input
                      {...props}
                      style={
                        { marginTop: "-2px", width: "100%" }
                        // selectedOptions.length === 0
                        //   ? { width: "100%", marginTop: "-2px" }
                        //   : {
                        //       marginTop: "-2px",
                        //       border: "1px green solid",
                        //     }
                      }
                    
                    />
                  </div>
                </div>
              ),
            }}
            multiselect
            selectedOptions={
              props.value
                ? (props.value as string[])
                : (selectedOptions as string[])
            }
            onOptionSelect={onChange}
          >
            {/* looping option */}
            {props.options.map((option) => (
              <Option
                text={option.text}
                value={option.value}
                key={option.value}
              >
                {option.text}
              </Option>
            ))}
          </Combobox>
        )}

        {!isEditing && (
          <div style={{ display: "flex" }}>
            <InactiveReadView
              defaultValue={
                props.value
                  ? getTextForTextField(props.value as string[], props.options)
                  : getTextForTextField(selectedOptions, props.options)
              }
              // props.onRenderSelectedOption
              input={{
                children:()=>{

                
                // onRenderDefaultValue menjadi undefined hanya jika :
                if(props.type==="dropdown" && selectedOptions.length>0){
                  return (
                    <>
                      <span>{simpanDropdown}</span>
                  </>
                  )
                }
                if(props.type === "dropdown" && !!!props.onRenderSelectedOption) return <div/>

       
                      if (props.onRenderSelectedOption) {
                        return props.onRenderSelectedOption(selectedOptions);
                      }
                      
                    }

                    
                    
            
              }}
              onClick={handleEditClick}
            />
          </div>
        )}
      </Field>
    </div>
  );
};

