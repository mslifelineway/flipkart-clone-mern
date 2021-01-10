import { Container } from "@material-ui/core";
import "./custom-modal.scss";
function CustomModal(props) {
  return (
    <Container className={`customAppModal `+ props.show}>
      <Container className="modal-body">
        {props.modalTitle ? (
          <Container className="madal-title">
            {props.modalTitle}
          </Container>
        ) : null}

        {props.children}
      </Container>
    </Container>
  );
}

export default CustomModal;
