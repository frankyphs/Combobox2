// /* eslint-disable */
// import {
//   Persona,
//   Tag,
//   TagGroup,
//   InteractionTag,
//   InteractionTagPrimary,
//   InteractionTagSecondary,
//   AvatarGroup,
//   AvatarGroupItem,
//   AvatarGroupPopover,
//   // PartitionAvatarGroupItemsOptions
// } from "@fluentui/react-components";
// import { IOptionsTag } from "../utils/interface";


// export const OptionDropdown = (props: any) => {
//   return (
//     <>{props.option?.label}</>
//   )
// }

// export const OptionPersona = (props: any) => {
//   return (
//     <Persona
//       size="extra-small"
//       textAlignment="center"
//       avatar={{ color: "colorful", "aria-hidden": true }}
//       name={props.option?.label}
//       presence={{
//         status: props.option?.data?.status,
//       }}
//       secondaryText={props.option?.data?.secondaryText}
//     />
//   )
// }

// export const OptionMultiPersona = (props: any) => {
//   return (
//     <AvatarGroup layout="stack" style={{ alignItems: "center" }} size={20}>
//       {props.partitionedItems?.inlineItems?.map((name: any) => (
//         <AvatarGroupItem name={name} key={name} />
//       ))}
//       {props.partitionedItems.overflowItems && (
//         <AvatarGroupPopover>
//           {props.partitionedItems?.overflowItems?.map(
//             (name: any) => (
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



// export const OptionTags = (props: any) => {
//   return (
//     <Tag
//       style={{ backgroundColor: props.option?.data?.color }}
//       value={props.option?.id}
//       key={props.option?.id} size="extra-small" appearance="brand">{props.option?.label}</Tag>
//   )
// }

// export const MultiOptionTags = (props: any) => {
//   return (
//     <TagGroup onDismiss={props.onTagClick} aria-label="Dismiss example" style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
//       {props.selectedOptions?.map((tag: IOptionsTag, _: any) => (
//         <InteractionTag size="extra-small" appearance="brand" value={tag.id} key={tag.id}>
//           <InteractionTagPrimary
//             style={{ backgroundColor: `${tag?.data?.color}` }}
//           >
//             {tag.label}
//           </InteractionTagPrimary>
//           <InteractionTagSecondary style={{ backgroundColor: `${tag?.data?.color}` }} aria-label="remove" />
//         </InteractionTag>
//       ))}
//     </TagGroup>
//   )
// }

// export const MultiOptionTagsIsEditingFalse = (props: any) => {
//   return (
//     <div style={{ paddingTop: "5px", paddingBottom: "5px" }}>
//       <TagGroup aria-label="Dismiss example" style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
//         {props.selectedOptions?.map((tag: IOptionsTag, _: any) => (
//           <InteractionTag size="extra-small" appearance="brand" value={tag.id} key={tag.id}>
//             <InteractionTagPrimary
//               style={{ backgroundColor: `${tag?.data?.color}` }}
//             >
//               {tag.label}
//             </InteractionTagPrimary>
//           </InteractionTag>
//         ))}
//       </TagGroup>
//     </div>
//   )
// }
// // export const MultiOptionTagsIsEditingFalse = (props: any) => {
// //   return (
// //     <div style={{ paddingTop: "5px", paddingBottom: "5px" }}>
// //       <TagGroup aria-label="Dismiss example" style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
// //         {props.selectedOptions?.map((tag: IOptionsDropdown) => (
// //           <InteractionTag size="extra-small" appearance="brand" value={tag.id} key={tag.id}>
// //             <InteractionTagPrimary
// //             >
// //               {tag.label}
// //             </InteractionTagPrimary>
// //           </InteractionTag>
// //         ))}
// //       </TagGroup>
// //     </div>
// //   )
// // }


// export const InputDropdownIsEditingFalse = (props: any) => {
//   return (
//     <div>{props.simpanDropdown}</div>
//   )
// }

/* eslint-disable */
import { useState } from "react";
import {
  Persona,
  Tag,
  TagGroup,
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  // PartitionAvatarGroupItemsOptions
} from "@fluentui/react-components";
// import { IOptionsTag } from "../utils/interface";


export const OptionDropdown = (props: any) => {
  return (
    <>{props.option?.label}</>
  )
}

export const OptionPersona = (props: any) => {
  return (
    <Persona
      size="extra-small"
      textAlignment="center"
      avatar={{ color: "colorful", "aria-hidden": true }}
      name={props.option?.label}
      presence={{
        status: props.option?.data?.status,
      }}
      secondaryText={props.option?.data?.secondaryText}
    />
  )
}

export const OptionMultiPersona = (props: any) => {
  return (
    <AvatarGroup layout="stack" style={{ alignItems: "center" }} size={20}>
      {props.partitionedItems?.inlineItems?.map((name: any) => (
        <AvatarGroupItem name={name} key={name} />
      ))}
      {props.partitionedItems.overflowItems && (
        <AvatarGroupPopover>
          {props.partitionedItems?.overflowItems?.map(
            (name: any) => (
              <AvatarGroupItem
                name={name}
                key={name}
              />
            )
          )}
        </AvatarGroupPopover>
      )}
    </AvatarGroup>
  )
}

export const OptionTags = (props: any) => {
  return (
    <Tag
      style={{ backgroundColor: props.option?.data?.color }}
      value={props.option?.id}
      key={props.option?.id} size="extra-small" appearance="brand">{props.option?.label}</Tag>
  )
}

export const MultiOptionTags = (props: any) => {
  const [hoveredTag, setHoveredTag] = useState<string | undefined>();

  const handleMouseEnter = (tagId: string): void => {
    setHoveredTag(tagId);
  };
  const handleMouseLeave = (): void => {
    setHoveredTag("");
  };
  return (
    <div style={!props.isEditing ? { paddingTop: "5px", paddingBottom: "5px" } : {}}>
      <TagGroup onDismiss={props.onTagClick} aria-label="Dismiss example" style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
        {props.selectedOptions?.map((tag: any, _: any) => (
          <InteractionTag onMouseEnter={() => handleMouseEnter(tag.id)}
            onMouseLeave={handleMouseLeave} size="extra-small" appearance="brand" value={tag.id} key={tag.id}>
            <InteractionTagPrimary
              style={{ backgroundColor: `${tag?.data?.color}` }}
            >
              {tag.label}
            </InteractionTagPrimary>
            {props.isEditing && hoveredTag === tag.id ? (<InteractionTagSecondary style={{ backgroundColor: `${tag?.data?.color}` }} aria-label="remove" />) : undefined}
          </InteractionTag>
        ))}
      </TagGroup>
    </div>
  )
}

// export const MultiOptionTagsIsEditingFalse = (props: any) => {
//   return (
//     <div style={{ paddingTop: "5px", paddingBottom: "5px" }}>
//       <TagGroup aria-label="Dismiss example" style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
//         {props.selectedOptions?.map((tag: IOptionsTag, _: any) => (
//           <InteractionTag size="extra-small" appearance="brand" value={tag.id} key={tag.id}>
//             <InteractionTagPrimary
//               style={{ backgroundColor: `${tag?.data?.color}` }}
//             >
//               {tag.label}
//             </InteractionTagPrimary>
//           </InteractionTag>
//         ))}
//       </TagGroup>
//     </div>
//   )
// }
// export const MultiOptionTagsIsEditingFalse = (props: any) => {
//   return (
//     <div style={{ paddingTop: "5px", paddingBottom: "5px" }}>
//       <TagGroup aria-label="Dismiss example" style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
//         {props.selectedOptions?.map((tag: IOptionsDropdown) => (
//           <InteractionTag size="extra-small" appearance="brand" value={tag.id} key={tag.id}>
//             <InteractionTagPrimary
//             >
//               {tag.label}
//             </InteractionTagPrimary>
//           </InteractionTag>
//         ))}
//       </TagGroup>
//     </div>
//   )
// }


export const InputDropdownIsEditingFalse = (props: any) => {
  return (
    <div>{props.simpanDropdown}</div>
  )
}





