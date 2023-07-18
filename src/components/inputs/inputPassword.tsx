import { ChangeEvent, useCallback, useState } from "react";
import { EyeComponent } from "../eyeComponent/eye";
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
} from "react-hook-form";

interface InputPasswordProps {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<FieldValues>;
  errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

export const InputPasswordComponent: React.FC<InputPasswordProps> = ({
  label,
  id,
  name,
  placeholder,
  onChange,
  register,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onHandleChangePasswordVisibility = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-between">
        <label htmlFor={id} className="font-semibold capitalize">
          {label}
        </label>
      </div>
      <input
        id={id}
        type={showPassword ? "text" : "password"}
        className="form-control mt-1"
        placeholder={placeholder}
        {...register(name, {
          required: "Campo de preenchimento obrigatório!",
          minLength: {
            value: 7,
            message: " A senha deve ter pelo menos 7 caracteres.",
          },
        })}
        onChange={onChange}
      />
      <EyeComponent
        showPassword={showPassword}
        onHandleVisibility={onHandleChangePasswordVisibility}
      />
      <p>{errors && errors.message?.toString()}</p>
    </div>
  );
};
