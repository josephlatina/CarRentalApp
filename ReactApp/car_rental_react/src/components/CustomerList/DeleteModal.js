import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useMutate } from "../../hooks/axios";

const DeleteModal = (props) => {

  const [deleteCustomer, { loading }] = useMutate({
    url: `/api/customers/${props.customerId}/`,
    method: "DELETE",
    onCompleted: () => {
      props.close();
      props.refetch();
    },
  });

  return (
    <>
    {loading && <div>Loading</div>}
      <Modal show={props.show} className="darkcolor" onHide={props.close}>
        <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete customer?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.close}>
            No
          </Button>
          <Button className="btn btn-confirm-pear" onClick={deleteCustomer}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
