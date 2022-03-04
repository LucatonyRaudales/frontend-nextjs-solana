export default function TextField({
  label,
  register,
  rules,
  placeholder,
  errors,
  name,
  type,
}: TextFieldInterface) {
  return (
    <div className="pt-4">
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        {name}
      </label>
      <input
        placeholder={placeholder}
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...register(label, { ...rules })}
      />
      {errors[label] && errors[label].type === "required" && (
        <p className="mb-3 text-xs pt-1 text-red-500 ">{name} is required</p>
      )}
      {type == "number" && errors[label] && errors[label].type === "maxLength" && (
        <p className="mb-3 text-red-500 ">
          {name} should be have maximum of {rules.maxLength} characters
        </p>
      )}
      {type == "number" && errors[label] && errors[label].type === "min" && (
        <p className="mb-3 text-red-500 ">
          {name} should be contain atleast {rules.min} characters
        </p>
      )}
      {type == "number" &&
        errors[label] &&
        errors[label].type === "pattern" && (
          <p className="mb-3 text-red-500 ">{name} is invalid</p>
        )}
    </div>
  );
}

export interface TextFieldInterface {
  label: string;
  register: any;
  rules: any;
  placeholder: any;
  errors: any;
  name: any;
  type?: string;
}
