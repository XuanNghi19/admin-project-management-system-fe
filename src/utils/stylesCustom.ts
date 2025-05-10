export const styleSelect = {
  control: (base: any, state: { isFocused: any; }) => ({
    ...base,
    borderWidth: "1px", // border-1
    borderColor: state.isFocused ? "#3B82F6" : "#9CA3AF", // focus: blue-500, unfocus: gray-400
    boxShadow: state.isFocused ? "0 0 0 1px #3B82F6" : "none", // mimic focus outline
    padding: "0 0.75rem",
    minHeight: "45px",
    height: "45px",
    fontSize: "1rem",
    backgroundColor: "white",
    dispaly: "flex",
    alignItems: "center",
    "&:hover": {
      borderColor: state.isFocused ? "#3B82F6" : "#6B7280", // hover: gray-500
    },
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "#9CA3AF", // text-gray-400
  }),
  option: (base: any, state: { isSelected: any; isFocused: any; }) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#3B82F6" // blue-500
      : state.isFocused
      ? "#DBEAFE" // blue-100
      : "#ffffff",
    color: state.isSelected ? "#ffffff" : "#111827", // text-white or text-gray-900
    padding: "10px 12px",
    cursor: "pointer",
  }),
  menu: (base: any) => ({
    ...base,
    borderRadius: "0.5rem", // rounded
    zIndex: 100,
    overflow: "hidden",
    outerHeight: "auto",
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "#111827", // text-gray-900
  }),
};