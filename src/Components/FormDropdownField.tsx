/* eslint-disable */
import { Button, Dropdown, Field, Input, Option, InputOnChangeData, TagGroupProps, partitionAvatarGroupItems, } from "@fluentui/react-components";
import React, { useState, useEffect } from "react";
import { IFieldDropdown, IOptionsDropdown } from "../utils/interface";
import { Search16Filled, Add16Filled, ChevronDown12Regular } from "@fluentui/react-icons";
import InactiveReadView from "./InactiveReadView";
import { MultiOptionTags, MultiOptionTagsIsEditingFalse, OptionDropdown, OptionMultiPersona, OptionPersona, OptionTags, InputDropdownIsEditingFalse } from "./OptionDropdown";



export const FormDropdownField = (props: IFieldDropdown) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(props.defaultSelectedOptions || []);
  const [cancelData, setCancelData] = React.useState<string[]>([]);
  const [value, setValue] = React.useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean | undefined>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [objectSingle, setObjectSingle] = useState<IOptionsDropdown>()
  const [objectSelectedOption, setObjectSelectedOption] = useState<IOptionsDropdown[]>([])
  const [nameForPersona, setNameForPersona] = React.useState<string[]>([]);

  useEffect(() => {
    props.options && getTextForTextField(props.selectedOptions || selectedOptions, props.options)
    setObjectSelectedOption(getSelectedObjects(props.selectedOptions || selectedOptions));
  }, [props.selectedOptions, selectedOptions])

  useEffect(() => {
    !!!props.isEditing !== undefined && setIsEditing(props.isEditing)
  }, [props.isEditing])

  function getTextForTextField(
    selectedOptions: string[],
    options: IOptionsDropdown[]
  ) {
    const selectedTexts = selectedOptions?.map(
      (value: string | number) => {
        const selectedOption = options.find((option) => option.id === value);
        setObjectSingle(selectedOption)
        return selectedOption ? selectedOption.label : "";
      }
    );
    setNameForPersona(selectedTexts);
    return selectedTexts ? setValue(selectedTexts.join(", ")) : "";
  }

  function getSelectedObjects(selectedOptionIds: string[]): IOptionsDropdown[] {
    return selectedOptionIds?.map((id) => {
      return props.options?.find((option) => option.id === id);
    }).filter((option) => option !== undefined) as IOptionsDropdown[];
  }

  const onOptionSelect = (_: any, data: any) => {
    const selectedItems = data.selectedOptions;
    if (!!!props.selectedOptions) {
      setSelectedOptions(selectedItems);
    }
    props.onChange && props.onChange(selectedItems);
  };

  const handleSaveClick = () => {
    !!!props.isEditing !== undefined && setIsEditing(props.isEditing)
    props.isEditing === undefined && setIsEditing(false);
    setCancelData(props.selectedOptions || selectedOptions);
    props.onSave && props.onSave(props.selectedOptions || selectedOptions);
  };

  const handleCancelClick = () => {
    !!!props.isEditing !== undefined && setIsEditing(props.isEditing)
    props.isEditing === undefined && setIsEditing(false);
    if (!!!props.selectedOptions) {
      setSelectedOptions(cancelData);
    }
    props.onCancel && props.onCancel(cancelData);
  };

  const handleEditClick = () => {
    props.onEditClick && props.onEditClick()
    !!!props.isEditing !== undefined && props.isEditing && setIsEditing(props.isEditing)
    setIsEditing(true);
  };

  const onChangeSearch = (_: any, data: InputOnChangeData) => {
    setSearchValue(data.value);
  }

  const generateUniqueId = () => {
    const now = new Date();
    return `${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getDate()}${now.getMonth()}${now.getFullYear()}`;
  }

  const onTagClick = (option: string, _: any) => {
    if (props.selectedOptions) {
      const filterOption = props.selectedOptions.filter((o) => o !== option);
      props.onChange && props.onChange(filterOption);
    } else if (selectedOptions) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    }
    console.log("tes hapus tag");
  };

  const removeItem: TagGroupProps["onDismiss"] = (_e, { value }) => {
    console.log("tes hapus tag")
    setSelectedOptions([...selectedOptions].filter((tag) => tag !== value));
  };

  const partitionedItems = partitionAvatarGroupItems({ items: nameForPersona });

  return (
    <>
      <div style={{ marginTop: "20px", border: "1px dashed red", padding: "5px" }}>
        <Field
          label={props.label}
          orientation={props.orientation}
          hint={
            isEditing
              ? {
                children: (
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
              : undefined
          }
        >
          {isEditing && (
            <Dropdown
              placeholder="Select an animal"
              onOptionSelect={onOptionSelect}
              multiselect={props.multiSelect}
              selectedOptions={props.selectedOptions || selectedOptions}
              value={value}
              //@ts-ignore
              button={(props.selectedOptions && props.selectedOptions?.length > 0) || selectedOptions?.length > 0 ? {
                children: (_, propsInput) => (
                  <button {...propsInput}>
                    {props.type === "tags" && !props.multiSelect ? (
                      <OptionTags option={objectSingle} onTagClick={onTagClick} />
                    )
                      : props.type === "persona" && !!!props.multiSelect ? (
                        <>
                          <OptionPersona option={objectSingle} />
                        </>
                      )
                        : props.type === "tags" && props.multiSelect ? (
                          <MultiOptionTags selectedOptions={objectSelectedOption} onTagClick={removeItem} />
                        )
                          : props.type === "persona" && props.multiSelect ? (
                            <>
                              <OptionMultiPersona partitionedItems={partitionedItems} />
                            </>
                          )
                            : (
                              <>
                                {propsInput.value}
                              </>
                            )}
                    <span><ChevronDown12Regular /></span>
                  </button>
                )
              }
                : undefined
              }
            >
              <Input value={searchValue} onClick={(ev) => { ev.stopPropagation() }} placeholder="Search..." onChange={onChangeSearch} contentBefore={<Search16Filled />} type="search" />
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {props.options && props.options
                  .filter((option) => option.label?.toLowerCase().includes(searchValue.toLowerCase()))
                  .map((filteredOption) => (
                    <Option text={filteredOption.label} value={filteredOption.id} key={filteredOption.id}>
                      {props.type === "dropdown" && (
                        <OptionDropdown option={filteredOption} />
                      )}
                      {props.type === "persona" && (
                        <OptionPersona option={filteredOption} />
                      )}
                      {props.type === "tags" && (
                        <OptionTags option={filteredOption} />
                      )}
                    </Option>
                  ))}
              </div>
              <Button
                icon={<Add16Filled />}
                onClick={() => {
                  const userLabel = window.prompt("Masukkan label baru:", "Default Label");
                  if (userLabel !== null) {
                    const newOption = { id: generateUniqueId() as string, key: generateUniqueId(), label: userLabel as string };
                    if (props.onChangeOption && props.options) {
                      props.onChangeOption([...props.options, newOption])
                    }
                  }
                }}
              >
                Add New Label
              </Button>
              <Button
                onClick={() => {
                  props.onChange && props.selectedOptions ? props.onChange([]) : setSelectedOptions([])
                }}
              >
                Clear
              </Button>
            </Dropdown>
          )}
          {!isEditing && (
            <div style={{ display: "flex" }}>
              <InactiveReadView
                defaultValue={
                  value
                }
                input={
                  {
                    children: () => {
                      return (
                        props.type === "dropdown" && ((props.selectedOptions?.length ?? 0) > 0 || (selectedOptions?.length ?? 0) > 0) ? (
                          <InputDropdownIsEditingFalse simpanDropdown={value} />
                        ) : (props.type === "tags" && props.multiSelect && ((props.selectedOptions?.length ?? 0) > 0 || (selectedOptions?.length ?? 0) > 0)) ? (
                          <MultiOptionTagsIsEditingFalse selectedOptions={objectSelectedOption} />
                        ) : (props.type === "tags" && !!!props.multiSelect && ((props.selectedOptions?.length ?? 0) > 0 || (selectedOptions?.length ?? 0) > 0)) ? (
                          <OptionTags option={objectSingle} />
                        ) : (props.type === "persona" && !!!props.multiSelect && ((props.selectedOptions?.length ?? 0) > 0 || (selectedOptions?.length ?? 0) > 0)) ? (
                          <OptionPersona option={objectSingle} />
                        ) : (props.type === "persona" && props.multiSelect && ((props.selectedOptions?.length ?? 0) > 0 || (selectedOptions?.length ?? 0) > 0)) ? (
                          <OptionMultiPersona partitionedItems={partitionedItems} />
                        ) : <div />

                      )
                    }
                  }}
                openActionButton={handleEditClick}
              />
            </div>
          )}
        </Field>
      </div>
    </>
  )
}