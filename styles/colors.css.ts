import { abstractAriaRolesByType } from "../data";

export default Object.values(abstractAriaRolesByType)
  .flat()
  .sort()
  .map((abstractRole, index, { length }) => {
    return `
      body:has(.content--is-abstract-role-${abstractRole}),
      .nav__list-item--${abstractRole} {
        --base-hue: ${(index / length) * 360}deg;
      }
    `;
  })
  .join("")
  .trim();
