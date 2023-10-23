import { PresenceBadgeStatus, Slot } from "@fluentui/react-components"
export interface IOptionsDropdown {
  id?: string,
  key?: string,
  label: string,
}

export interface IOptionsPersona {
  id?: string,
  key?: string,
  label: string,
  data?: {
    status?: PresenceBadgeStatus,
    secondaryText?: string,
    icon?: string
  }
}

export interface IOptionsTag {
  id?: string,
  key?: string,
  label: string,
  data?: {
    color: string
  }
}

// export interface IOptionsCustom {
//   id?: string,
//   key?: string,
//   label: string,
//   data?:
// }

export interface IFieldDropdown {
  options?: IOptionsDropdown[] | IOptionsPersona[] | IOptionsTag[],
  label?: string,
  addText?: string,
  clearText?: string,
  saveText?: string,
  cancelText?: string,
  placeholderSearch?: string,
  placeholderDropdown?: string,
  defaultSelectedOptions?: string[],
  selectedOptions?: string[],
  multiSelect?: boolean
  type?: "dropdown" | "persona" | "tags"
  orientation?: "vertical" | "horizontal"
  isEditing?: boolean,
  onEditClick?: () => void,
  onChange?: (selectedOptions: string[]) => void
  onSave?: (selectedOptions: string[]) => void
  onCancel?: (selectedOptions: string[]) => void
  onClear?: (selectedOptions: string[]) => void
  onDeleteTag?: (selectedOptions: string[]) => void
  onOptionChange?: (newValue: IOptionsDropdown[]) => void
  onRenderOption?: (option: IOptionsDropdown) => JSX.Element
  onRenderSelectedOption?: (option: string[]) => JSX.Element
  size?: "small" | "medium" | "large"
}

export interface IInactiveReadView {
  openActionButton?: () => void
  size?: "small" | "medium" | "large"
  defaultValue?: string
  input?: NonNullable<Slot<'input'>>,
  onClick?: () => void
  onLeft?: boolean
  disabled?: boolean
  contentAfter?: JSX.Element
  contentBefore?: JSX.Element
}