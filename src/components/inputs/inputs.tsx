import { ChangeEvent } from "react";
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
} from "react-hook-form";

interface InputProps {
  label: string;
  type: string;
  id: string;
  name: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<FieldValues>;
  errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

export const InputComponent: React.FC<InputProps> = ({
  label,
  type,
  id,
  name,
  placeholder,
  onChange,
  register,
  errors,
}) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-between">
        <label htmlFor={id} className="font-semibold capitalize">
          {label}
        </label>
      </div>
      <input
        id={id}
        type={type}
        className="form-control mt-1"
        placeholder={placeholder}
        {...register(name, {
          required: "Campo de preenchimento obrigatório!",
        })}
        onChange={onChange}
      />
      {errors && <p>{errors.message?.toString()}</p>}
    </div>
  );
};
