import { useForm } from "react-hook-form";
import TextField from "../inputs/mytextfield";
import SixNumbers from "../inputs/numbersfields";
import MySelect from "../inputs/myselect";
import { useEffect } from "react";

export default function NewPurchaseForm({
  onSubmit,
  isSending,
}: LocalInterface) {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm();

  useEffect(() => {
    console.log("resetting", isSending);
    if (!isSending) reset();
  }, [isSending]);

  return (
    <form className="w-2/3 sm:w-3/5 md:w-1/2 lg:w-2/3 xl:w-1/3 py-10 ">
      <div className="grid sm:grid-cols-2 sm:gap-2">
        <TextField
          label="firstName"
          placeholder="John"
          register={register}
          name="Buyer first name"
          errors={errors}
          rules={{ maxLength: 20, required: true, min: 3 }}
        />
        <TextField
          label="lastName"
          placeholder="Doe"
          register={register}
          name="Buyer last name"
          errors={errors}
          rules={{ maxLength: 20, required: true, min: 3 }}
        />
      </div>
      <TextField
        label="email"
        placeholder="johndoe@gmail.com"
        register={register}
        name="Buyer Email"
        errors={errors}
        rules={{
          required: true,
          pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        }}
      />

      <div className="grid sm:grid-cols-2 sm:gap-2">
        <MySelect
          label="gameName"
          placeholder="Select the game"
          register={register}
          name="Lotery name"
          options={["Power Play", "Mega Play"]}
          errors={errors}
        />

        <TextField
          type="datetime-local"
          label="drawDay"
          placeholder="Stark store"
          register={register}
          name="Draw day"
          errors={errors}
          rules={{ maxLength: 20, required: true, min: 3 }}
        />
      </div>

      <label
        htmlFor="countries"
        className="block mb-2 pt-4 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        Insert your six numbers
      </label>
      <div className="grid grid-cols-6 gap-2 xl:gap-6">
        <SixNumbers label="n1" register={register} errors={errors} />
        <SixNumbers label="n2" register={register} errors={errors} />
        <SixNumbers label="n3" register={register} errors={errors} />
        <SixNumbers label="n4" register={register} errors={errors} />
        <SixNumbers label="n5" register={register} errors={errors} />
        <SixNumbers label="n6" register={register} errors={errors} />
      </div>

      <div className="grid sm:grid-cols-2 gap-2">
        <MySelect
          label="cityPowerBall"
          placeholder="Lottery city"
          register={register}
          name="Lotery name"
          options={["New York", "Minnesota", "Los Ángeles", "San Francisco"]}
          errors={errors}
        />

        <TextField
          type="number"
          label="ticketPrice"
          placeholder="Insert the price"
          register={register}
          name="Ticket price"
          errors={errors}
          rules={{ maxLength: 20, required: true, min: 3 }}
        />
      </div>
      <div className="divider" />

      <input
        type="submit"
        disabled={isSending}
        onClick={handleSubmit(onSubmit)}
        value={isSending ? 'Enviando...' : 'Enviar'}
        className="m-auto w-full p-4 border rounded-md shadow-sm text-sm font-medium text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex justify-center"
      />
    </form>
  );
}

interface LocalInterface {
  onSubmit: (data: any) => Promise<void>;
  isSending: boolean;
}
