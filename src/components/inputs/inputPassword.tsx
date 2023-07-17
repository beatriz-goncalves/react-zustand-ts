import { ChangeEvent, useCallback, useState } from "react";
import { EyeComponent } from "../eyeComponent/eye";

interface InputPasswordProps {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputPasswordComponent: React.FC<InputPasswordProps> = ({
  label,
  id,
  name,
  placeholder,
  value,
  onChange,
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
        name={name}
        onChange={onChange}
        value={value}
      />
      <EyeComponent
        showPassword={showPassword}
        onHandleVisibility={onHandleChangePasswordVisibility}
      />
    </div>
  );
};
