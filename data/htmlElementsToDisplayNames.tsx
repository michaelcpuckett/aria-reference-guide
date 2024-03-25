import React from "react";

const NbspCharacter = () => "\u00A0";

export const htmlElementsToDisplayNames = {
  "a[href]": <>a&shy;[href]</>,
  "input[type=text]": <>input&shy;[type=&shy;text]</>,
  "input[type=number]": <>input&shy;[type=&shy;number]</>,
  "input[type=radio]": <>input&shy;[type=&shy;radio]</>,
  "input[type=range]": <>input&shy;[type=&shy;range]</>,
  "input[type=checkbox]": <>input&shy;[type=&shy;checkbox]</>,
  "input[type=reset]": <>input&shy;[type=&shy;reset]</>,
  "input[type=submit]": <>input&shy;[type=&shy;submit]</>,
  "th[scope=row]": <>th&shy;[scope=&shy;row]</>,
  "th[scope=col]": <>th&shy;[scope=&shy;col]</>,
};
