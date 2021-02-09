import { useState, useEffect, useContext } from "react";
import { Button, Modal } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import dateFormat from "dateformat";
import AppContext from "../../AppContext";
import "./ProfileModal.scss";

function ProfileModal(props) {
  const { user, portfoliosList } = useContext(AppContext);

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    // Initialize values everytime modal reopens
    if (props.open) {
      setCurrentUser(user);
    }
  }, [props.open, user]);

  const handleDeleteAccount = () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? Your portfolios and entries will be permanently deleted as well."
      )
    ) {
      return;
    }
    props.onDeleteAccount();
    props.onClose();
  };

  return (
    <Modal
      className="ProfileModal"
      onClose={props.onClose}
      open={props.open}
      size="small"
      closeOnEscape={true}
      closeIcon
    >
      <Modal.Header className="header">
        <div className="headerContent">
          <span className="userPhoto">
            {currentUser.photo ? (
              <img className="photo" src={currentUser.photo} alt="profile" />
            ) : (
              <FontAwesomeIcon className="photo" icon={faUserCircle} />
            )}
          </span>
          <span className="displayName">{currentUser.displayName}</span>
        </div>
      </Modal.Header>

      <Modal.Content className="content">
        <div className="details">
          <table>
            <tbody>
              <tr>
                <td>ID</td>
                <td>{currentUser._id}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{currentUser.email}</td>
              </tr>
              <tr>
                <td>Date Joined</td>
                <td>{dateFormat(currentUser.creationDate, "mmm dd, yyyy")}</td>
              </tr>
              <tr>
                <td>Last Login</td>
                <td>{dateFormat(currentUser.lastLoginDate, "mmm dd, yyyy")}</td>
              </tr>
              <tr>
                <td>Portfolios</td>
                <td>
                  {portfoliosList.length > 0
                    ? portfoliosList.map((portfolio, index) => (
                        <div className="portfolioRow" key={index}>
                          <span className="portfolioName">
                            {portfolio.name}
                          </span>

                          <span className="portfolioNumEntries">
                            ({portfolio.numEntries}{" "}
                            {portfolio.numEntries === 1 ? "entry" : "entries"})
                          </span>
                        </div>
                      ))
                    : "None"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal.Content>
      <Modal.Actions className="footer">
        <div>
          <Button size="small" negative onClick={handleDeleteAccount}>
            Delete Account
          </Button>
        </div>
        <div>
          <Button size="small" as="a" href="/api/logout">
            Logout
          </Button>
        </div>
      </Modal.Actions>
    </Modal>
  );
}

export default ProfileModal;
