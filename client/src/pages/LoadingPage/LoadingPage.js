import { Loader } from "semantic-ui-react";
import "./LoadingPage.scss";

function LoadingPage(props) {
  return (
    <div className="LoadingPage">
      <Loader className="loadingText" active inline size="big">
        {props.loadingText}
      </Loader>
    </div>
  );
}

export default LoadingPage;
