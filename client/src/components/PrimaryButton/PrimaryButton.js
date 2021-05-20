import { Button } from "semantic-ui-react";
import classnames from "classnames";
import "./PrimaryButton.scss";

function PrimaryButton(props) {
  const { className, ...buttonProps } = props;

  return (
    <Button
      className={classnames("PrimaryButton", className)}
      {...buttonProps}
    />
  );
}

export default PrimaryButton;
