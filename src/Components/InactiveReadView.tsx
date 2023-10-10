/* eslint-disable */
import { Button, Input, makeStyles, mergeClasses, shorthands, tokens } from "@fluentui/react-components"
import { Edit24Regular } from "@fluentui/react-icons"
import React from "react"
import { IInactiveReadView } from "../utils/interface"

const getInactiveReadViewStyles = makeStyles({
  editButton: {
    marginLeft: "4px",
  },
  hideEditButton: {
    display: "none",
  },
  colorDisabled: {
    color: tokens.colorNeutralForegroundDisabled,
  },
  root: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    ...shorthands.paddingInline("0px"),
    ...shorthands.paddingBlock("0px"),
    ...shorthands.border("0.8px", "solid", "transparent"),
    ":active": {
      ...shorthands.border("0.8px", "solid", tokens.colorNeutralStroke1Pressed),
    },
    ":hover .invisible-edit-btn": {
      display: "inline-flex",
    },
  },
  rootHoverSmall: {
    ":hover": {
      ...shorthands.border("0.8px", "solid", tokens.colorNeutralStroke1Hover),
      ...shorthands.paddingInline("6px"),
    },
  },
  rootHoverMedium: {
    ":hover": {
      ...shorthands.border("0.8px", "solid", tokens.colorNeutralStroke1Hover),
      ...shorthands.paddingInline("10px"),
    },
  },
  rootHoverLarge: {
    ":hover": {
      ...shorthands.border("0.8px", "solid", tokens.colorNeutralStroke1Hover),
      ...shorthands.paddingInline("12px"),
    },
  },
  container: {
    width: "100%",
  },

  border: {
    ...shorthands.border("0.8px", "solid", tokens.colorNeutralStroke1Hover),
  },
})

const InactiveReadView: React.FC<IInactiveReadView> = (props) => {
  const isSmall = props.size === "small"
  const isLarge = props.size === "large"
  const isMedium = props.size === "medium" || props.size === undefined

  const classes = getInactiveReadViewStyles()
  const editButtonClass = mergeClasses(classes.hideEditButton, "invisible-edit-btn", classes.editButton)

  const rootClassActive = mergeClasses(
    classes.root,
    isSmall && classes.rootHoverSmall,
    isMedium && classes.rootHoverMedium,
    isLarge && classes.rootHoverLarge
  )

  const rootClassDisabled = mergeClasses(classes.colorDisabled, classes.container)

  const rootClass = mergeClasses(props.disabled ? rootClassDisabled : rootClassActive)

  const handleOnClick = () => {
    props.onClick && props.onClick()
  }

  return (
    <div onClick={handleOnClick} className={classes.container}>
      <Input
        size={props.size}
        aria-invalid={false}
        disabled={props.disabled}
        defaultValue={props.defaultValue}
        root={{ className: rootClass }}
        input={
          props.input
            ? props.input
            : {
                children: () => <p>{props.defaultValue}</p>,
              }
        }
        contentBefore={props.contentBefore}
        contentAfter={
          <>
            {props.contentAfter}
            <Button
              disabled={props.disabled}
              onClick={props.openActionButton}
              className={editButtonClass}
              appearance="subtle"
              size="small"
              icon={<Edit24Regular />}
            />
          </>
        }
      />
    </div>
  )
}

export default InactiveReadView
