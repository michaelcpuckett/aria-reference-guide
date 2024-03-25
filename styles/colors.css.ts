import { abstractAriaRolesByType } from "../data";

export default Object.values(abstractAriaRolesByType)
  .flat()
  .reverse()
  .map((abstractRole, index, { length }) => {
    return `
.dialog--is-abstract-role-${abstractRole},
.nav__list-item--${abstractRole} {
  --base-hue: ${(index / length) * 360}deg;
}
`;
  })
  .join("")
  .trim();
