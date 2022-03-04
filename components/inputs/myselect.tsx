export default function MySelect({
  label,
  register,
  options,
  placeholder,
  errors,
  name,
}: TextFieldInterface) {
  return (
    <div className="pt-4">
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        {placeholder}
      </label>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...register(label)}
      >
        {options.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      {errors[label] && errors[label].type === "required" && (
        <p className="mb-3 text-red-500 ">{name} is required</p>
      )}
    </div>
  );
}

export interface TextFieldInterface {
  label: string;
  register: any;
  options: string[];
  placeholder: string;
  errors: any;
  name: any;
}
