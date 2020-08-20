import React, { FC } from "react";
import { action } from "@storybook/addon-actions";
import { ImageButton } from ".";
import { withKnobs, select, boolean, text  } from "@storybook/addon-knobs";

export default {
  title: "Image button",
  component: ImageButton,
  decorators: [withKnobs],
};

export const ImageButtonStory: FC = () => {

  return (
    <ImageButton
      onClick={action("Click")}
     // type={select("Type", {submit:"submit", reset:"reset", button:"button"}, "submit")}
	  title={text('Title', 'title')}
	  disabled={boolean('Disabled', false)}
    />
  );
};