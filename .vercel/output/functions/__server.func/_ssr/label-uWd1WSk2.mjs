import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { mt as cn } from "./router-PvLfXnWv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/label-uWd1WSk2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = (0, import_react.forwardRef)(({ className, type = "text", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	type,
	ref,
	className: cn("h-11 w-full rounded-md bg-raised px-3 text-sm text-fg placeholder:text-faint", "shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-fg)_12%,transparent)]", "transition-[box-shadow] duration-150 ease-out", "focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--color-accent)]", "disabled:opacity-40", className),
	...props
}));
Input.displayName = "Input";
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-xs font-medium tracking-wide text-muted", className),
		...props
	});
}
//#endregion
export { Label as n, Input as t };
