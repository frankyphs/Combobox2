// import React, { useState, useEffect } from "react";
// import { Dismiss12Regular } from "@fluentui/react-icons";

// import {
//   Button,
//   Persona,
//   AvatarGroup,
//   AvatarGroupItem,
//   AvatarGroupPopover,
// } from "@fluentui/react-components";

// export const InputSinglePersonaIsEditingFalse = (props) => {
//   return (
//     <Persona
//       textAlignment="center"
//       size="extra-small"
//       avatar={{
//         color: "colorful",
//         "aria-hidden": true,
//       }}
//       name={props.nameForPersona[0] as string}
//     />
//   )
// }

// export const InputMultiPersonaIsEditingFalse = (props) => {
//   return (
//     <AvatarGroup layout="stack" style={{ alignItems: "center" }} size={20}>
//       {props.partitionedItems?.inlineItems?.map((name) => (
//         <AvatarGroupItem name={name} key={name} />
//       ))}
//       {props.partitionedItems.overflowItems && (
//         <AvatarGroupPopover>
//           {props.partitionedItems?.overflowItems?.map(
//             (name) => (
//               <AvatarGroupItem
//                 name={name}
//                 key={name}
//               />
//             )
//           )}
//         </AvatarGroupPopover>
//       )}
//     </AvatarGroup>
//   )
// }

// export const InputTagIsEditingFalse = (props) => {

//   return (
//     <ul
//       style={{
//         display: "flex",
//         gap: "2px",
//         listStyleType: "none",
//         margin: "0 0",

//         padding: "3px 0 3px 0 ",
//         flexWrap: "wrap",
//       }}
//       ref={props.selectedListRef}
//     >
//       <span id={`${props.comboId}-remove`} hidden>
//         Remove
//       </span>
//       {props.isEditing && props.selectedOptions.map((option, i) => (
//         <li key={option}>
//           <Button
//             size="small"
//             shape="circular"
//             appearance="primary"
//             icon={<Dismiss12Regular />}
//             iconPosition="after"
//             onClick={() => props.onTagClick(option, i)}
//             id={`${props.comboId}-remove-${i}`}
//             aria-labelledby={`${props.comboId}-remove ${props.comboId}-remove-${i}`}
//           >
//             {option}
//           </Button>
//         </li>
//       ))}
//       {!props.isEditing && props.selectedOptions.map((option, i) => (
//         <li key={option}>
//           <Button
//             size="small"
//             shape="circular"
//             appearance="primary"

//             id={`${props.comboId}-remove-${i}`}
//             aria-labelledby={`${props.comboId}-remove ${props.comboId}-remove-${i}`}
//           >
//             {option}
//           </Button>
//         </li>
//       ))}
//     </ul>
//   )
// }

// export const InputDropdownIsEditingFalse = (props) => {
//   return (
//     <div>{props.saveDropdown}</div>
//   )
// }











// import React from "react";
// import React, { useState, useEffect, useMemo } from "react";
// import { IFieldDropdown, OptionsDropDown } from "../../utils/interface";
// import InactiveReadView from "../CommonComponents/InactiveReadView";
// import { OptionDropdownTag, OptionPersona } from "./OptionCombobox";

// import {
//   Button,
//   Option,
//   useId,
// partitionAvatarGroupItems,
//   Combobox,
//   Field,
// } from "@fluentui/react-components";
// import { InputDropdownIsEditingFalse, InputMultiPersonaIsEditingFalse, InputSinglePersonaIsEditingFalse, InputTagIsEditingFalse } from "./InputCombobox";

// export const FormComboboxField = (props: IFieldDropdown) => {
//   const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
//   const [error, setError] = useState(false);
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [simpanDropdown, setSimpanDropdown] = useState("");
//   const [cancelData, setCancelData] = React.useState([]);
//   const [value, setValue] = React.useState<string>("");
// const [nameForPersona, setNameForPersona] = React.useState([]);

//   const memoize = useMemo(() => {
//     const memo = props.value || selectedOptions || ""
//     return memo
//   }, [props.value, selectedOptions])

//   useEffect(() => {
//     !props.value ? getText(selectedOptions, props.options) : getText(props.value as string[], props.options);
//     let values: string[] = props.value as string[] || selectedOptions || [];
//     setValue(getTextForTextField(values, props.options));
//     getTextForTextField(selectedOptions, props.options);
//     if (props.value) {
//       setSimpanDropdown(getTextForTextField(props.value as string[], props.options));
//     } else {
//       setSimpanDropdown(getTextForTextField(selectedOptions, props.options));
//     }

//     if (props.onValidate) {
//       let validationResult;
//       if (props.value) {
//         validationResult = props.onValidate(props.value);
//       } else {
//         validationResult = props.onValidate(selectedOptions);
//       }

//       if (validationResult) {
//         setError(true);
//       } else {
//         setError(false);
//       }
//     }
//   }, [selectedOptions, props.value]);

//   useEffect(() => {
//     if (props.defaultValue) {
//       setSelectedOptions(props.defaultValue as string[]);
//       setCancelData(props.defaultValue as string[]);
//     } else {
//       setSelectedOptions([]);
//       setCancelData([]);
//     }
//   }, []);

//   const getText = (selectedKeys: string[], options: OptionsDropDown[]) => {
//     const selectedTexts = (selectedKeys as (string | number)[])?.map(
//       (value: string | number) => {
//         const selectedOption = options.find((option) => option.value === value);
//         return selectedOption ? selectedOption.text : "";
//       }
//     );
// setNameForPersona(selectedTexts);
//   };

//   function getTextForTextField(
//     selectedKeys: string[],
//     options: OptionsDropDown[]
//   ) {
//     const selectedTexts = (selectedKeys as (string | number)[])?.map(
//       (value: string | number) => {
//         const selectedOption = options.find((option) => option.value === value);
//         return selectedOption ? selectedOption.text : "";
//       }
//     );
//     return selectedTexts ? selectedTexts.join(", ") : "";
//   }

//   const comboId = useId("combo-multi");
//   const selectedListRef = React.useRef<HTMLUListElement>(null);
//   const comboboxInputRef = React.useRef<HTMLInputElement>(null);

// const onTagClick = (option: string, index: number) => {
//   setSelectedOptions(selectedOptions.filter((o) => o !== option));
//   if (props.value) {
//     const filterOption = (props.value as string[]).filter((o) => o !== option);
//     props.onChange(filterOption);
//   }

//   const indexToFocus = index === 0 ? 1 : index - 1;
//   const optionToFocus = selectedListRef.current?.querySelector(
//     `#${comboId}-remove-${indexToFocus}`
//   );
//   if (optionToFocus) {
//     (optionToFocus as HTMLButtonElement).focus();
//   } else {
//     comboboxInputRef.current?.focus();
//   }
// };

//   const handleSaveClick = () => {
//     if (props.onValidate) {
//       let validationResult;

//       if (props.value) {
//         props.onValidate(props.value);
//       } else {
//         props.onValidate(selectedOptions);
//       }
//       if (validationResult) {
//         setError(true);
//         return;
//       } else {
//         setError(false);
//       }
//     }
//     setIsEditing(false);
//     if (props.onSave) {
//       props.onSave(props.value);
//     }
//     if (props.value && props.onChange) {
//       setCancelData(props.value as string[]);
//     } else {
//       setCancelData(selectedOptions);
//     }
//   };

//   const handleCancelClick = () => {
//     setIsEditing(false);
//     if (props.onCancel) {
//       if (props.multiSelect) {
//         props.onCancel(cancelData as string[]);
//       } else {
//         props.onCancel(cancelData as string[]);
//       }
//     }
//     if (!props.value) {
//       setSelectedOptions(cancelData);
//     }
//     getText(cancelData, props.options);
//   };

//   const handleEditClick = (ev) => {
//     setIsEditing(true);
//   };

// const partitionedItems = partitionAvatarGroupItems({ items: nameForPersona });

//   const onChange = (_, item): void => {
//     const selectedItems = item.selectedOptions;
//     if (!props.value) {
//       setSelectedOptions(selectedItems);
//       props.onChange(selectedItems);
//     } else {
//       props.onChange ? props.onChange(selectedItems) : undefined;
//     }

//     if (props.onValidate) {
//       const validationResult = props.onValidate(selectedOptions);

//       if (validationResult) {
//         setError(true);
//       } else {
//         setError(false);
//       }
//     }
//   };

//   return (
//     <div>
//       <Field
//         validationMessage={error ? "Input harus mencukupi" : undefined}
//         validationState={error ? "warning" : undefined}
//         label={props.label}
//         orientation={props.orientation}
//         hint={
//           isEditing
//             ? {
//               children: (_: unknown, slotProps) => (
//                 <div
//                   style={{ display: "flex", gap: "6px", marginTop: "6px" }}
//                 >
//                   <Button appearance="primary" onClick={handleSaveClick}>
//                     Save
//                   </Button>
//                   <Button appearance="secondary" onClick={handleCancelClick}>
//                     Cancel
//                   </Button>
//                 </div>
//               ),
//             }
//             : undefined
//         }
//       >
//         {isEditing && (
//           <Combobox
//             onOpenChange={(_, data) => setIsOpen(data.open)}
//             onOptionSelect={onChange}
//             value={!!!props.multiSelect ? value : undefined}
//             onInput={(ev: React.ChangeEvent<HTMLInputElement>) => { setValue(ev.target.value) }}
//             selectedOptions={
//               props.value
//                 ? (props.value as string[])
//                 : (selectedOptions as string[])
//             }
//             multiselect={props.multiSelect}
//             input={!!!props.multiSelect ? {}
//               : {
//                 children: (type, propsChildren) => (
//                   <div
//                     style={{
//                       padding: "2px",
//                       margin: "0 8px",
//                       display: "flex",
//                       flexWrap: "wrap",
//                       width: "100%",
//                       gap: "2px",
//                     }}
//                   >
//                     <>
//                       {!isOpen && (selectedOptions?.length > 0 || props?.value?.length > 0) && (
//                         props.type === "persona" ? (
//                           <InputMultiPersonaIsEditingFalse propsInput={propsChildren} partitionedItems={partitionedItems} />
//                         )
//                           : props.type === "tags" ? (
//                             !props.value ? (
//                               <InputTagIsEditingFalse propsInput={propsChildren} selectedOptions={selectedOptions} selectedListRef={selectedListRef} comboId={comboId} isOpen={isOpen} onTagClick={onTagClick} isEditing={isEditing} />
//                             )
//                               : (
//                                 <InputTagIsEditingFalse propsInput={propsChildren} selectedOptions={props.value} isOpen={isOpen} onTagClick={onTagClick} isEditing={isEditing} />
//                               )

//                           )
//                             : props.type === "dropdown" ? (
//                               <InputDropdownIsEditingFalse propsInput={propsChildren} selectedOptions={selectedOptions} isOpen={isOpen} simpanDropdown={simpanDropdown} />
//                             )
//                               : undefined
//                       )}
//                     </>

//                     <div style={{ height: "29px", flex: "1", marginTop: "-2px" }}>
//                       <input {...propsChildren} value={isOpen ? propsChildren.value : ""} style={{ width: "100%" }} />
//                     </div>
//                   </div>
//                 )
//               }
//             }

//           >
//             {/* Option */}
//             {props.options?.map((option) => (
//               <Option
//                 text={option.text}
//                 value={option.value}
//                 key={option.value}
//               >
//                 {(props.type === "tags" || props.type === "dropdown") && !props.onRenderOption && (
//                   <OptionDropdownTag option={option} />
//                 )}
//                 {props.type === "persona" && !props.onRenderOption && (
//                   <OptionPersona option={option} />
//                 )}
//                 {props.onRenderOption && (
//                   <>
//                     {props.onRenderOption(option)}
//                   </>
//                 )}
//               </Option>
//             ))}
//           </Combobox>
//         )}

//         {!isEditing && (
//           <div style={{ display: "flex" }}>
//             <InactiveReadView
//               defaultValue={
//                 props.value
//                   ? getTextForTextField(props.value as string[], props.options)
//                   : getTextForTextField(selectedOptions, props.options)
//               }
//               input={
//                 {
//                   children: () => {
//                     if (props.onRenderSelectedOption) {
//                       return props.onRenderSelectedOption(selectedOptions);
//                     } else {
//                       return (
//                         <>
//                           {(selectedOptions?.length > 0 || props.value?.length > 0) &&
//                             (
//                               props.type === "persona"
//                                 ? (
//                                   props.multiSelect ? (
//                                     <InputMultiPersonaIsEditingFalse
//                                       partitionedItems={partitionedItems} />
//                                   ) : (
//                                     <InputSinglePersonaIsEditingFalse nameForPersona={nameForPersona} />
//                                   )
//                                 )
//                                 : props.type === "tags" ?
//                                   (
//                                     !props.value ? (
//                                       <InputTagIsEditingFalse selectedListRef={selectedListRef} comboId={comboId} selectedOptions={selectedOptions} isEditing={isEditing} />
//                                     )
//                                       : (
//                                         <InputTagIsEditingFalse selectedListRef={selectedListRef} comboId={comboId} selectedOptions={props.value} isEditing={isEditing} />
//                                       )

//                                   )
//                                   : props.type === "dropdown" ?
//                                     (
//                                       <InputDropdownIsEditingFalse simpanDropdown={simpanDropdown} />
//                                     )
//                                     : undefined
//                             )
//                           }
//                           {selectedOptions?.length === 0 && (
//                             <div />
//                           )}
//                         </>
//                       );
//                     }

//                   }
//                 }}
//               openActionButton={handleEditClick}
//             />
//           </div>
//         )}
//       </Field>
//     </div>
//   );

// }



