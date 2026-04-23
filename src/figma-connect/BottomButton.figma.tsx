import figma from "@figma/code-connect";

/**
 * Bottom Tab / Action Bar
 * Figma: https://www.figma.com/design/GN3NGt1umjyBxhnulUcdv7/RB-Design-System?node-id=11:2128
 * Storybook: Components/BottomButton
 */
figma.connect(
  "https://www.figma.com/design/GN3NGt1umjyBxhnulUcdv7/RB-Design-System?node-id=11:2128",
  {
    props: {
      primaryText: figma.string("Primary Button"),
      secText: figma.string("Secondary"),
      disabled: figma.boolean("disabled", { true: true, false: false }),
    },
    example: (props) => (
      <BottomButton
        item={{
          primaryText: props.primaryText,
          secText: props.secText,
        }}
        disabled={props.disabled}
        onClickPrimary={() => {}}
        onClickSecondary={() => {}}
      />
    ),
  }
);

// Component import reference
import { BottomButton } from "src/components/Common/BottomButton";
