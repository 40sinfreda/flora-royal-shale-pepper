import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { mt as cn } from "./router-PvLfXnWv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/select-CDibZZWI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Select = (0, import_react.forwardRef)(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
	ref,
	className: cn("h-11 w-full appearance-none rounded-md bg-raised bg-[length:12px] bg-no-repeat px-3 pe-9 text-sm text-fg [background-position:right_12px_center] rtl:[background-position:left_12px_center]", "shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-fg)_12%,transparent)]", "focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--color-accent)]", "disabled:opacity-40", className),
	style: { backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path fill='%239AA8A4' d='M1 1.5 6 6.5 11 1.5'/></svg>\")" },
	...props,
	children
}));
Select.displayName = "Select";
//#endregion
export { Select as t };
