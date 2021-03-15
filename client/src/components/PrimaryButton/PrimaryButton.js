import { Button } from "semantic-ui-react";
import "./PrimaryButton.scss";

function PrimaryButton(props) {
  const { className, ...buttonProps } = props;

  return (
    <Button
      className={`PrimaryButton ${className ? className : ""}`}
      {...buttonProps}
    />
  );
}

export default PrimaryButton;
