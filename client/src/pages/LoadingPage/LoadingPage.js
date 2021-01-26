import "./LoadingPage.scss";

function LoadingPage(props) {
  return (
    <div className="LoadingPage">
      <div className="loadingText">{props.loadingText}</div>
    </div>
  );
}

export default LoadingPage;
