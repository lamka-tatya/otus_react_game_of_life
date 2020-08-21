import { GameSettings, SettingsPanel } from ".";
import React, { FC } from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean, number } from "@storybook/addon-knobs";

export default {
  title: "Settings panel",
  component: SettingsPanel,
  decorators: [withKnobs],
};

export const SettingsStory: FC = () => {
  return (
    <SettingsPanel
      setIsSettingsVisible={action("Set settings visibility")}
      setSettings={action("Set settings")}
      visible={boolean("Visible", true)}
      settings={
        {
          height: number("Height", 300, undefined, "Settings"),
          width: number("Width", 300, undefined, "Settings"),
          rowCount: number("Row count", 10, undefined, "Settings"),
          columnCount: number("Column count", 10, undefined, "Settings"),
          fillingPercent: number("Percent", 50, undefined, "Settings"),
          frequency: number("Frequency", 100, undefined, "Settings"),
        } as GameSettings
      }
    />
  );
};
