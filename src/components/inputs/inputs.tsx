import { ChangeEvent, useCallback, useState } from "react";
import { EyeComponent } from "../eyeComponent/eye";

interface InputProps {
  label: string;
  type: string;
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputComponent: React.FC<InputProps> = ({
  label,
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
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
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};
