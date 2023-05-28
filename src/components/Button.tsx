import React from "react";

const Button = ({ text, onClick }: { text: string; onClick?: any }) => {
  return (
    <button className="common_button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
