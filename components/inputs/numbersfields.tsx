
export default function SixNumbers({
  label,
  register,
  errors,
}: TextFieldInterface) {
  return (
    <div>
      <input
        type="number"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...register(label, { required: true, maxLength: 2 })}
      />
      {errors[label] && errors[label].type === "required" && (
        <p className="mb-3 pt-1 text-xs text-red-500 ">required!</p>
      )}
      {errors[label] && errors[label].type === "maxLength" && (
        <p className="mb-3 pt-1 text-xs text-red-500 ">only 00 - 99</p>
      )}
    </div>
  );
}

export interface TextFieldInterface {
  label: string;
  register: any;
  errors: any;
}