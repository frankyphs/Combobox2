// /* eslint-disable */
// import { Button, Dropdown, Field, Input, Option, InputOnChangeData, TagGroupProps, partitionAvatarGroupItems, Text, Tag } from "@fluentui/react-components";
// import React, { useState, useEffect } from "react";
// import { IFieldDropdown, IOptionsDropdown, IOptionsPersona, IOptionsTag } from "../utils/interface";
// import { Search16Filled, Add16Filled, ChevronDown20Regular, Dismiss16Regular } from "@fluentui/react-icons";
// import InactiveReadView from "./InactiveReadView";
// import { MultiOptionTags, OptionDropdown, OptionMultiPersona, OptionPersona, OptionTags, InputDropdownIsEditingFalse } from "./OptionDropdown";
// import { Circle } from "./Circle";

// export const FormDropdownField = (props: IFieldDropdown) => {
//   const [selectedOptions, setSelectedOptions] = useState<string[]>(props.defaultSelectedOptions || []);
//   const [cancelData, setCancelData] = React.useState<string[]>([]);
//   const [value, setValue] = React.useState<string>("");
//   const [isEditing, setIsEditing] = useState<boolean | undefined>(false);
//   const [searchValue, setSearchValue] = useState<string>("");
//   const [addOptionValue, setAddOptionValue] = useState<string>("")
//   const [objectSingle, setObjectSingle] = useState<IOptionsDropdown>()
//   const [objectSelectedOption, setObjectSelectedOption] = useState<IOptionsDropdown[]>([])
//   const [nameForPersona, setNameForPersona] = React.useState<string[]>([]);

//   const [isOptionAddOpen, setIsOptionAddOpen] = React.useState<boolean>(false)

//   const [selectedColor, setSelectedColor] = useState<string | null>(null);

//   const [avatarUrlValue, setAvatarUrlValue] = useState<string>("")

//   const [isEmptyOption, setIsEmptyOption] = useState<boolean>(false)


//   useEffect(() => {
//     addOptionValue.trim() === "" ? setIsEmptyOption(true) : setIsEmptyOption(false)
//   }, [addOptionValue])

//   const handleColorClick = (color: string | null) => {
//     if (color === selectedColor) {
//       setSelectedColor(null);
//     } else {
//       setSelectedColor(color);
//     }
//   };

//   useEffect(() => {
//     props.options && getTextForTextField(props.selectedOptions || selectedOptions, props.options)
//     setObjectSelectedOption(getSelectedObjects(props.selectedOptions || selectedOptions));
//   }, [props.selectedOptions, selectedOptions])

//   useEffect(() => {
//     !!!props.isEditing !== undefined && setIsEditing(props.isEditing)
//   }, [props.isEditing])

//   function getTextForTextField(
//     selectedOptions: string[],
//     options: IOptionsDropdown[]
//   ) {
//     const selectedTexts = selectedOptions?.map(
//       (value: string | number) => {
//         const selectedOption = options.find((option) => option.id === value);
//         setObjectSingle(selectedOption)
//         return selectedOption ? selectedOption.label : "";
//       }
//     );
//     setNameForPersona(selectedTexts);
//     return selectedTexts ? setValue(selectedTexts.join(", ")) : "";
//   }

//   function getSelectedObjects(selectedOptionIds: string[]): IOptionsDropdown[] {
//     return selectedOptionIds?.map((id) => {
//       return props.options?.find((option) => option.id === id);
//     }).filter((option) => option !== undefined) as IOptionsDropdown[];
//   }

//   const onOptionSelect = (_: any, data: any) => {
//     const selectedItems = data.selectedOptions;
//     if (!!!props.selectedOptions) {
//       setSelectedOptions(selectedItems);
//     }
//     props.onChange && props.onChange(selectedItems);
//   };

//   const handleSaveClick = () => {
//     !!!props.isEditing !== undefined && setIsEditing(props.isEditing)
//     props.isEditing === undefined && setIsEditing(false);
//     setCancelData(props.selectedOptions || selectedOptions);
//     props.onSave && props.onSave(props.selectedOptions || selectedOptions);
//   };

//   const handleCancelClick = () => {
//     !!!props.isEditing !== undefined && setIsEditing(props.isEditing)
//     props.isEditing === undefined && setIsEditing(false);
//     if (!!!props.selectedOptions) {
//       setSelectedOptions(cancelData);
//     }
//     props.onCancel && props.onCancel(cancelData);
//   };

//   const handleClearClick = () => {
//     props.onClear && props.onChange && props.selectedOptions ? props.onClear([]) : setSelectedOptions([]);
//   }

//   const handleEditClick = () => {
//     props.onEditClick && props.onEditClick()
//     !!!props.isEditing !== undefined && props.isEditing && setIsEditing(props.isEditing)
//     setIsEditing(true);
//   };

//   const onChangeSearch = (_: any, data: InputOnChangeData) => {
//     setSearchValue(data.value);
//   }

//   const onChangeAddOption = (_: any, data: InputOnChangeData) => {
//     setAddOptionValue(data.value)
//   }

//   const onChangeAvatarImage = (_: any, data: InputOnChangeData) => {
//     setAvatarUrlValue(data.value)
//   }

//   const generateUniqueId = () => {
//     const now = new Date();
//     return `${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getDate()}${now.getMonth()}${now.getFullYear()}`;
//   }

//   const removeItem: TagGroupProps["onDismiss"] = (_e, { value }) => {
//     props.onDeleteTag && props.selectedOptions ? props.onDeleteTag([...props.selectedOptions].filter((tag) => tag !== value))
//       : setSelectedOptions([...selectedOptions].filter((tag) => tag !== value));
//   };

//   const partitionedItems = partitionAvatarGroupItems({ items: nameForPersona });

//   const initialColors = [
//     "#FFF3DA",
//     "#D0D4CA",
//     "#FBECB2",
//     "#DFCCFB",
//     "#EAD7BB",
//     "#B5CB99",
//     "#FF6969",
//     "#EE9322",
//     "#ECEE81",
//     "#8CC0DE",
//     "#BC7AF9",
//   ];


//   return (
//     <>
//       <div style={{ marginTop: "20px", border: "1px dashed red", padding: "5px" }}>
//         <Field
//           size={props.size ? props.size : "medium"}
//           label={props.label}
//           hint={
//             isEditing
//               ? {
//                 children: (
//                   <div
//                     style={{ display: "flex", gap: "6px", marginTop: "6px" }}
//                   >
//                     <Button appearance="primary" onClick={handleSaveClick} size={props.size ? props.size : "medium"}>
//                       {props.saveText || "Save"}
//                     </Button>
//                     <Button appearance="secondary" onClick={handleCancelClick} size={props.size ? props.size : "medium"}>
//                       {props.cancelText || "Cancel"}
//                     </Button>
//                   </div>
//                 ),
//               }
//               : undefined
//           }
//         >
//           {isEditing && (
//             <Dropdown
//               onOptionSelect={onOptionSelect}
//               multiselect={props.multiSelect}
//               selectedOptions={props.selectedOptions || selectedOptions}
//               value={value}
//               placeholder={props.placeholderDropdown || "Select Options"}
//               //@ts-ignore
//               button={(props.selectedOptions && props.selectedOptions?.length > 0) || selectedOptions?.length > 0 ? {
//                 children: (_, propsInput) => (
//                   <button {...propsInput}>
//                     {props.type === "tags" && !props.multiSelect ? (
//                       <OptionTags option={objectSingle} size={props.size} />
//                     )
//                       : props.type === "persona" && !!!props.multiSelect ? (
//                         <>
//                           <OptionPersona option={objectSingle} size={props.size} />
//                         </>
//                       )
//                         : props.type === "tags" && props.multiSelect ? (
//                           <MultiOptionTags selectedOptions={objectSelectedOption} onTagClick={removeItem} isEditing={isEditing === true || props.isEditing === true} size={props.size} />
//                         )
//                           : props.type === "persona" && props.multiSelect ? (
//                             <>
//                               <OptionMultiPersona partitionedItems={partitionedItems} size={props.size} />
//                             </>
//                           )
//                             : (
//                               <>
//                                 {propsInput.value}
//                               </>
//                             )}
//                     <><ChevronDown20Regular style={{ color: "#686868" }} /></>
//                   </button>
//                 )
//               }
//                 : undefined
//               }
//             >
//               {!isOptionAddOpen ? (
//                 <>
//                   <Input value={searchValue} onClick={(ev) => { ev.stopPropagation() }} placeholder={props.placeholderSearch || "Search..."} onChange={onChangeSearch} contentBefore={<Search16Filled />} type="search" />
//                   <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
//                     {props.options && props.options
//                       .filter((option) => option.label?.toLowerCase().includes(searchValue.toLowerCase()))
//                       .map((filteredOption) => (
//                         <Option text={filteredOption.label} value={filteredOption.id} key={filteredOption.id}>
//                           {props.type === "dropdown" && (
//                             <OptionDropdown option={filteredOption} size={props.size} />
//                           )}
//                           {props.type === "persona" && (
//                             <OptionPersona option={filteredOption} size={props.size} />
//                           )}
//                           {props.type === "tags" && (
//                             <OptionTags option={filteredOption} size={props.size} />
//                           )}
//                         </Option>
//                       ))}
//                   </div>
//                   <Button
//                     icon={<Add16Filled />}
//                     onClick={() => {
//                       setIsOptionAddOpen(true)
//                     }}
//                   >
//                     {props.addText || "Add New Option"}
//                   </Button>
//                   <Button
//                     onClick={handleClearClick}
//                   >
//                     {props.clearText || "Clear"}
//                   </Button>
//                 </>
//               ) :
//                 <>
//                   <Text style={{ fontWeight: "bold" }}>New Option</Text>
//                   {
//                     isEmptyOption && (
//                       <Text style={{ color: "red" }}>Option required!</Text>
//                     )
//                   }
//                   <Input value={addOptionValue} onClick={(ev) => { ev.stopPropagation() }} onChange={onChangeAddOption} type="text" style={{ margin: "5px 0" }} />
//                   {props.type === "tags" && (
//                     <>
//                       <div style={{ display: "flex", alignItems: "center", borderRadius: "3px" }}>
//                         <Text style={{ fontWeight: "bold" }}>Choose Tag Color </Text>
//                         <div
//                           onMouseEnter={(event) => {
//                             // Mengubah latar belakang saat dihover
//                             event.currentTarget.style.backgroundColor = "#e0e0e0"; // Ganti dengan warna abu-2 yang Anda inginkan
//                           }}
//                           onMouseLeave={(event) => {
//                             // Mengembalikan latar belakang saat tidak dihover
//                             event.currentTarget.style.backgroundColor = "transparent";
//                           }}
//                           onClick={() => setSelectedColor(null)} style={{ display: "flex", margin: "2px 0 0 5px" }}><Dismiss16Regular /></div>
//                       </div>
//                       <div>
//                         <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
//                           {initialColors.map((color, index) => (
//                             <Circle
//                               key={index}
//                               color={color}
//                               selected={color === selectedColor}
//                               onClick={() => handleColorClick(color)}
//                             />
//                           ))}
//                         </div>
//                         <div style={{ margin: "20px 0 10px 0" }}>
//                           {!selectedColor && addOptionValue && (
//                             <Tag appearance="brand" >{addOptionValue}</Tag>
//                           )}
//                           {selectedColor && addOptionValue && (
//                             <Tag appearance="brand" style={{ backgroundColor: `${selectedColor}` }}>{addOptionValue}</Tag>
//                           )}
//                         </div>
//                       </div>
//                     </>
//                   )}
//                   {props.type === "persona" && (
//                     <>
//                       <Text style={{ fontWeight: "bold" }}>Avatar Image URL </Text>
//                       <Input value={avatarUrlValue} onClick={(ev) => { ev.stopPropagation() }} onChange={onChangeAvatarImage} type="text" style={{ margin: "5px 0" }} />
//                     </>
//                   )}
//                   <div style={{ display: "flex", justifyContent: "end", margin: "10px 0" }}>
//                     {/* <div><Button onClick={() => setIsOptionAddOpen(false)}>Back</Button></div> */}
//                     <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px" }}>
//                       <Button onClick={() => {
//                         setIsOptionAddOpen(false)
//                         setAddOptionValue("")
//                         setSelectedColor(null)
//                       }} appearance="secondary">Cancel</Button>
//                       <Button onClick={() => {
//                         if (addOptionValue.trim() !== "") {
//                           let newOption
//                           // @ts-ignore
//                           if (props.type === "tags") {
//                             newOption = { id: generateUniqueId() as string, key: generateUniqueId(), label: addOptionValue as string, data: { color: selectedColor } } as IOptionsTag;
//                           }
//                           if (props.type === "persona") {
//                             newOption = { id: generateUniqueId() as string, key: generateUniqueId(), label: addOptionValue as string, data: { icon: avatarUrlValue } } as IOptionsPersona;
//                           }
//                           if (props.type === "dropdown") {
//                             newOption = { id: generateUniqueId() as string, key: generateUniqueId(), label: addOptionValue as string };
//                           }

//                           newOption && props.onOptionChange && props.options && props.onOptionChange([...props.options, newOption])

//                           setIsOptionAddOpen(false)
//                           setAddOptionValue("")
//                           setSelectedColor(null)
//                         } else {
//                           return
//                         }
//                       }
//                       } appearance="primary">Save</Button>
//                     </div>
//                   </div>
//                 </>
//               }

//             </Dropdown>
//           )}
//           {!isEditing && (
//             <div style={{ display: "flex" }}>
//               <InactiveReadView
//                 size={props.size ? props.size : "medium"}
//                 defaultValue={
//                   value
//                 }
//                 input={
//                   {
//                     children: () => {
//                       return (
//                         props.type === "dropdown" && ((props.selectedOptions?.length ?? 0) > 0 || (selectedOptions?.length ?? 0) > 0) ? (
//                           <InputDropdownIsEditingFalse simpanDropdown={value} />
//                         ) : (props.type === "tags" && props.multiSelect && ((props.selectedOptions?.length ?? 0) > 0 || (selectedOptions?.length ?? 0) > 0)) ? (
//                           <MultiOptionTags selectedOptions={objectSelectedOption} isEditing={props.isEditing || isEditing} size={props.size} />
//                         ) : (props.type === "tags" && !!!props.multiSelect && ((props.selectedOptions?.length ?? 0) > 0 || (selectedOptions?.length ?? 0) > 0)) ? (
//                           <OptionTags option={objectSingle} size={props.size} />
//                         ) : (props.type === "persona" && !!!props.multiSelect && ((props.selectedOptions?.length ?? 0) > 0 || (selectedOptions?.length ?? 0) > 0)) ? (
//                           <OptionPersona option={objectSingle} size={props.size} />
//                         ) : (props.type === "persona" && props.multiSelect && ((props.selectedOptions?.length ?? 0) > 0 || (selectedOptions?.length ?? 0) > 0)) ? (
//                           <OptionMultiPersona partitionedItems={partitionedItems} size={props.size} />
//                         ) : <div />

//                       )
//                     }
//                   }}
//                 openActionButton={handleEditClick}
//               />
//             </div>
//           )}
//         </Field>
//       </div>
//     </>
//   )
// }

/* eslint-disable */
import { Button, Dropdown, Field, Input, Option, InputOnChangeData, TagGroupProps, partitionAvatarGroupItems, Text, Tag, Label } from "@fluentui/react-components";
import React, { useState, useEffect } from "react";
import { IFieldDropdown, IOptionsDropdown, IOptionsPersona, IOptionsTag } from "../utils/interface";
import { Search16Filled, Add16Filled, ChevronDown20Regular, Delete16Regular } from "@fluentui/react-icons";
import InactiveReadView from "./InactiveReadView";
import { MultiOptionTags, OptionDropdown, OptionMultiPersona, OptionPersona, OptionTags, InputDropdownIsEditingFalse } from "./OptionDropdown";
import { Circle } from "./Circle";

export const FormDropdownField = (props: IFieldDropdown) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(props.defaultSelectedOptions || []);
  const [cancelData, setCancelData] = React.useState<string[]>([]);
  const [value, setValue] = React.useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean | undefined>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [addOptionValue, setAddOptionValue] = useState<string>("")
  const [objectSingle, setObjectSingle] = useState<IOptionsDropdown>()
  const [objectSelectedOption, setObjectSelectedOption] = useState<IOptionsDropdown[]>([])
  const [nameForPersona, setNameForPersona] = React.useState<string[]>([]);

  const [isOptionAddOpen, setIsOptionAddOpen] = React.useState<boolean>(false)

  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const [avatarUrlValue, setAvatarUrlValue] = useState<string>("")

  // const [isEmptyOption, setIsEmptyOption] = useState<boolean>(false)

  const [isOptionEditOpen, setIsOptionEditOpen] = React.useState<boolean>(false)

  const [dataEditOption, setDataEditOption] = React.useState<IOptionsDropdown | IOptionsPersona | IOptionsTag>()

  const [editValue, setEditValue] = React.useState<string>("")

  const [editAvatarImage, setEditAvatarImage] = React.useState<string>("")

  useEffect(() => {
    console.log(dataEditOption)
    // console.log(dataEditOption?.data?.icon)
    dataEditOption && setEditValue(dataEditOption.label)
    // @ts-ignore
    props.type === "persona" && dataEditOption && setEditAvatarImage(dataEditOption?.data?.icon)
    // @ts-ignore
    props.type === "tags" && dataEditOption && setSelectedColor(dataEditOption?.data?.color)
  }, [dataEditOption, editAvatarImage])

  const handleColorClick = (color: string | null) => {
    if (color === selectedColor) {
      setSelectedColor(null);
    } else {
      setSelectedColor(color);
    }
  };

  const handleSaveEditOption = () => {
    const updatedOptions = props.options?.map(option => {
      if (dataEditOption && option.id === dataEditOption.id) {
        if (props.type === "dropdown") {
          return { ...option, label: editValue };
        } else if (props.type === "persona") {
          return { ...option, label: editValue, data: { icon: editAvatarImage } };
        } else if (props.type === "tags") {
          return { ...option, label: editValue, data: { color: selectedColor } };
        }
      }
      return option;
    });

    props.onOptionChange && updatedOptions && props.onOptionChange(updatedOptions);
    setIsOptionEditOpen(false)
  }

  const handleDeleteOption = () => {
    if (dataEditOption) {
      const updatedOptions = props.options?.filter(option => option.id !== dataEditOption.id);
      props.onOptionChange && updatedOptions && props.onOptionChange(updatedOptions);
      setIsOptionEditOpen(false);
    }
  };

  useEffect(() => {
    props.options && getTextForTextField(props.selectedOptions || selectedOptions, props.options)
    setObjectSelectedOption(getSelectedObjects(props.selectedOptions || selectedOptions));
  }, [props.selectedOptions, selectedOptions, props.options])

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

  const handleClearClick = () => {
    props.onClear && props.onChange && props.selectedOptions ? props.onClear([]) : setSelectedOptions([]);
  }

  const handleEditClick = () => {
    props.onEditClick && props.onEditClick()
    !!!props.isEditing !== undefined && props.isEditing && setIsEditing(props.isEditing)
    setIsEditing(true);
  };

  const onChangeSearch = (_: any, data: InputOnChangeData) => {
    setSearchValue(data.value);
  }

  const onChangeAddOption = (_: any, data: InputOnChangeData) => {
    setAddOptionValue(data.value)
  }


  const onClickEdit = (ev: any, data: IOptionsDropdown | IOptionsPersona | IOptionsTag) => {
    ev.stopPropagation()
    setDataEditOption(data)
    setIsOptionEditOpen(true)
  }

  const onChangeAvatarImage = (_: any, data: InputOnChangeData) => {
    setAvatarUrlValue(data.value)
  }

  const onChangeEditOption = (_: any, data: InputOnChangeData) => {
    setEditValue(data.value)
  }

  const onChangEditAvatarImage = (_: any, data: InputOnChangeData) => {
    setEditAvatarImage(data.value)
  }

  const generateUniqueId = () => {
    const now = new Date();
    return `${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getDate()}${now.getMonth()}${now.getFullYear()}`;
  }

  const removeItem: TagGroupProps["onDismiss"] = (_e, { value }) => {
    props.onDeleteTag && props.selectedOptions ? props.onDeleteTag([...props.selectedOptions].filter((tag) => tag !== value))
      : setSelectedOptions([...selectedOptions].filter((tag) => tag !== value));
  };

  const partitionedItems = partitionAvatarGroupItems({ items: nameForPersona });

  const initialColors = [
    "#FFF3DA",
    "#D0D4CA",
    "#FBECB2",
    "#DFCCFB",
    "#EAD7BB",
    "#B5CB99",
    "#FF6969",
    "#EE9322",
    "#ECEE81",
    "#8CC0DE",
    "#BC7AF9",
  ];


  return (
    <>
      <div style={{ marginTop: "20px", border: "1px dashed red", padding: "5px" }}>
        <Field
          size={props.size ? props.size : "medium"}
          label={props.label}
          hint={
            isEditing
              ? {
                children: (
                  <div
                    style={{ display: "flex", gap: "6px", marginTop: "6px" }}
                  >
                    <Button appearance="primary" onClick={handleSaveClick} size={props.size ? props.size : "medium"}>
                      {props.saveText || "Save"}
                    </Button>
                    <Button appearance="secondary" onClick={handleCancelClick} size={props.size ? props.size : "medium"}>
                      {props.cancelText || "Cancel"}
                    </Button>
                  </div>
                ),
              }
              : undefined
          }
        >
          {isEditing && (
            <Dropdown
              onOptionSelect={onOptionSelect}
              multiselect={props.multiSelect}
              selectedOptions={props.selectedOptions || selectedOptions}
              value={value}
              placeholder={props.placeholderDropdown || "Select Options"}
              //@ts-ignore
              button={(props.selectedOptions && props.selectedOptions?.length > 0) || selectedOptions?.length > 0 ? {
                children: (_, propsInput) => (
                  <button {...propsInput}>
                    {props.type === "tags" && !props.multiSelect ? (
                      <OptionTags option={objectSingle} size={props.size} isDropdownOption={true} />
                    )
                      : props.type === "persona" && !!!props.multiSelect ? (
                        <>
                          <OptionPersona option={objectSingle} size={props.size} isDropdownOption={true} />
                        </>
                      )
                        : props.type === "tags" && props.multiSelect ? (
                          <MultiOptionTags selectedOptions={objectSelectedOption} onTagClick={removeItem} isEditing={isEditing === true || props.isEditing === true} size={props.size} />
                        )
                          : props.type === "persona" && props.multiSelect ? (
                            <>
                              <OptionMultiPersona partitionedItems={partitionedItems} size={props.size} />
                            </>
                          )
                            : (
                              <>
                                {propsInput.value}
                              </>
                            )}
                    <><ChevronDown20Regular style={{ color: "#686868" }} /></>
                  </button>
                )
              }
                : undefined
              }
            >
              {!isOptionAddOpen && !isOptionEditOpen ? (
                <>
                  <Input value={searchValue} onClick={(ev) => { ev.stopPropagation() }} placeholder={props.placeholderSearch || "Search..."} onChange={onChangeSearch} contentBefore={<Search16Filled />} type="search" />
                  <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {props.options && props.options
                      .filter((option) => option.label?.toLowerCase().includes(searchValue.toLowerCase()))
                      .map((filteredOption) => (
                        <Option text={filteredOption.label} value={filteredOption.id} key={filteredOption.id}>
                          {props.type === "dropdown" && (
                            <OptionDropdown option={filteredOption} size={props.size} onClickEdit={onClickEdit} />
                          )}
                          {props.type === "persona" && (
                            <OptionPersona option={filteredOption} size={props.size} onClickEdit={onClickEdit} />
                          )}
                          {props.type === "tags" && (
                            <OptionTags option={filteredOption} size={props.size} onClickEdit={onClickEdit} />
                          )}
                        </Option>
                      ))}
                  </div>
                  <Button
                    icon={<Add16Filled />}
                    onClick={() => {
                      setIsOptionAddOpen(true)
                    }}
                  >
                    {props.addText || "Add New Option"}
                  </Button>
                  <Button
                    onClick={handleClearClick}
                  >
                    {props.clearText || "Clear"}
                  </Button>
                </>
              ) : isOptionAddOpen && !isOptionEditOpen ? (
                <>
                  <Label style={{ backgroundColor: "#F5F7F8", margin: "0 -4px", padding: "10px 20px 10px 5px", fontWeight: "bold" }}>Add Option</Label>
                  <Text>Name</Text>
                  <Input value={addOptionValue} onClick={(ev) => { ev.stopPropagation() }} onChange={onChangeAddOption} type="text" style={{ margin: "5px 0" }} />
                  {props.type === "tags" && (
                    <>
                      <div style={{ display: "flex", alignItems: "center", borderRadius: "3px" }}>
                        <Text>Color</Text>
                      </div>
                      <div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                          {initialColors.map((color, index) => (
                            <Circle
                              key={index}
                              color={color}
                              selected={color === selectedColor}
                              onClick={() => handleColorClick(color)}
                            />
                          ))}
                        </div>
                        <div style={{ margin: "20px 0 10px 0" }}>
                          {!selectedColor && addOptionValue && (
                            <Tag appearance="brand" >{addOptionValue}</Tag>
                          )}
                          {selectedColor && addOptionValue && (
                            <Tag appearance="brand" style={{ backgroundColor: `${selectedColor}` }}>{addOptionValue}</Tag>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                  {props.type === "persona" && (
                    <>
                      <Text>Avatar URL </Text>
                      <Input value={avatarUrlValue} onClick={(ev) => { ev.stopPropagation() }} onChange={onChangEditAvatarImage} type="text" style={{ margin: "5px 0" }} />
                    </>
                  )}
                  <div style={{ display: "flex", justifyContent: "end", margin: "10px 0" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px" }}>
                      <Button onClick={() => {
                        setIsOptionAddOpen(false)
                        setAddOptionValue("")
                        setSelectedColor(null)
                      }} appearance="secondary">Cancel</Button>
                      <Button disabled={addOptionValue.trim() === ""} onClick={() => {
                        let newOption
                        // @ts-ignore
                        if (props.type === "tags") {
                          newOption = { id: generateUniqueId() as string, key: generateUniqueId(), label: addOptionValue as string, data: { color: selectedColor } } as IOptionsTag;
                        }
                        if (props.type === "persona") {
                          newOption = { id: generateUniqueId() as string, key: generateUniqueId(), label: addOptionValue as string, data: { icon: avatarUrlValue } } as IOptionsPersona;
                        }
                        if (props.type === "dropdown") {
                          newOption = { id: generateUniqueId() as string, key: generateUniqueId(), label: addOptionValue as string };
                        }

                        newOption && props.onOptionChange && props.options && props.onOptionChange([...props.options, newOption])

                        setIsOptionAddOpen(false)
                        setAddOptionValue("")
                        setSelectedColor(null)
                      }
                      } appearance="primary">Save</Button>
                    </div>
                  </div>
                </>
              ) :
                <>
                  <Label style={{ backgroundColor: "#F5F7F8", margin: "0 -4px", padding: "10px 20px 10px 5px", fontWeight: "bold" }}>Edit Option</Label>
                  <Text>Name</Text>
                  <Input onClick={(ev) => { ev.stopPropagation() }} value={editValue} onChange={onChangeEditOption} style={{ margin: "5px 0 5px 0 " }}></Input>
                  {props.type === "persona" && (
                    <>
                      <Text>Avatar URL</Text>
                      <Input onClick={(ev) => { ev.stopPropagation() }} value={editAvatarImage} onChange={onChangeAvatarImage} style={{ margin: "5px 0 10px 0 " }}></Input>
                    </>
                  )}
                  {props.type === "tags" && (
                    <>
                      <div style={{ display: "flex", alignItems: "center", borderRadius: "3px" }}>
                        <Text>Color</Text>
                      </div>
                      <div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                          {initialColors.map((color, index) => (
                            <Circle
                              key={index}
                              color={color}
                              selected={color === selectedColor}
                              onClick={() => handleColorClick(color)}
                            />
                          ))}
                        </div>
                        <div style={{ margin: "20px 0 10px 0" }}>
                          {!selectedColor && editValue && (
                            <Tag appearance="brand" >{editValue}</Tag>
                          )}
                          {selectedColor && editValue && (
                            <Tag appearance="brand" style={{ backgroundColor: `${selectedColor}` }}>{editValue}</Tag>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", margin: "10px 0", alignItems: "center" }}>
                    <div style={{ width: "30px", height: "30px", borderRadius: "5px", justifyContent: "center", alignItems: "center", display: "flex" }} onMouseEnter={(event) => {
                      event.currentTarget.style.backgroundColor = "#e0e0e0";
                    }}
                      onMouseLeave={(event) => {
                        event.currentTarget.style.backgroundColor = "transparent";
                      }}>
                      <Delete16Regular onClick={handleDeleteOption} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px" }}>
                      <Button appearance="secondary" onClick={() => setIsOptionEditOpen(false)}>Cancel</Button>
                      <Button appearance="primary" onClick={handleSaveEditOption}>Save</Button>
                    </div>
                  </div>
                </>
              }

            </Dropdown>
          )}
          {!isEditing && (
            <div style={{ display: "flex" }}>
              <InactiveReadView
                size={props.size ? props.size : "medium"}
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
                          <MultiOptionTags selectedOptions={objectSelectedOption} isEditing={props.isEditing || isEditing} size={props.size} />
                        ) : (props.type === "tags" && !!!props.multiSelect && ((props.selectedOptions?.length ?? 0) > 0 || (selectedOptions?.length ?? 0) > 0)) ? (
                          <OptionTags option={objectSingle} size={props.size} isDropdownOption={true} />
                        ) : (props.type === "persona" && !!!props.multiSelect && ((props.selectedOptions?.length ?? 0) > 0 || (selectedOptions?.length ?? 0) > 0)) ? (
                          <OptionPersona option={objectSingle} size={props.size} isDropdownOption={true} />
                        ) : (props.type === "persona" && props.multiSelect && ((props.selectedOptions?.length ?? 0) > 0 || (selectedOptions?.length ?? 0) > 0)) ? (
                          <OptionMultiPersona partitionedItems={partitionedItems} size={props.size} />
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