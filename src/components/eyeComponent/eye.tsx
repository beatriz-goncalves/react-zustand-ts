import React, { useCallback, useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

interface EyeProps {
  showPassword: boolean;
  onHandleVisibility: () => void;
}

export const EyeComponent: React.FC<EyeProps> = ({
  onHandleVisibility,
  showPassword,
}) => {
  return (
    <span
      style={{
        position: "absolute",
        top: "50%",
        right: "10px",
        cursor: "pointer",
        backgroundColor: "white",
        color: "#0dcaf0",
      }}
      onClick={onHandleVisibility}
    >
      {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
    </span>
  );
};
