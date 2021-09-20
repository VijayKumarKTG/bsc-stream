import Button from '@restart/ui/esm/Button';

import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
// import ReactDOM from "react-dom";
// import { useForm } from "react-hook-form";
import './Header.css';

import { ethers } from "ethers";
import ErrorMessage from "../ErroMessage/ErrorMessage";
import TxList from "../TxList/TxList";


const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};


const Header = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr")
    });
  };

  return (


     <div class="d-flex justify-content-center header-container">
  <div className='container '>
  <h6 className='p-3'>Tap the button below to create your first stream</h6>
  <Button className=" bn54 "  variant="primary" onClick={handleShow}>
  <span class="bn54span"> <b>Stream Now</b></span>
  </Button>
  </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Stream</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form className="" onSubmit={handleSubmit}>
  <Form.Group

            className="input input-bordered block w-full focus:ring focus:outline-none" >

    <Form.Label> <b>How is the recipients? (ENS name or Ethereum Address)</b></Form.Label>
    <Form.Control type="text"  name="addr"  placeholder="Recipient Address" />
    {/* <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text> */}
  </Form.Group>

  <Form.Group

            className="input input-bordered block w-full focus:ring focus:outline-none"
           >
    <Form.Label> <b>How much you want to stream in total</b>
    </Form.Label>
    <Form.Control name="ether"  type="text" placeholder="Amount in ETH" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    {/* <Form.Check type="checkbox" label="Check me out" /> */}
  </Form.Group>
  <Button  className="bn55 mb-3  btn btn-warning submit-button focus:ring focus:outline-none w-full"  variant="primary" type="submit">
  <b> Create stream</b>

  </Button>
  <ErrorMessage message={error} />
  <TxList txs={txs} />

</Form>




</Modal.Body>

      </Modal>
    </div>






//   <Modal
//     show={show}
//     onHide={handleClose}
//     backdrop="static"
//     keyboard={false}
//   >
//     <Modal.Header closeButton>
//       <Modal.Title>Modal title</Modal.Title>
//     </Modal.Header>
//     <Modal.Body>
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <label>First Name</label>
//       <input
//         {...register("firstName", {
//           required: true,
//           maxLength: 20,
//           pattern: /^[A-Za-z]+$/i
//         })}
//       />
//       {/* {errors?.firstName?.type === "required" && <p>This field is required</p>}
//       {errors?.firstName?.type === "maxLength" && (
//         <p>First name cannot exceed 20 characters</p>
//       )}
//       {errors?.firstName?.type === "pattern" && (
//         <p>Alphabetical characters only</p>
//       )} */}
//       <label>Laste Name</label>
//       <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
//       {/* {errors?.lastName?.type === "pattern" && (
//         <p>Alphabetical characters only</p>
//       )} */}
//       <label>Age</label>a
//       <input {...register("age", { min: 18, max: 99 })} />
//       {/* {errors.age && (
//         <p>You Must be older then 18 and younger then 99 years old</p>
//       )} */}
//       <input type="submit" />
//     </form>
//     </Modal.Body>
//     <Modal.Footer>
//       <Button variant="secondary" onClick={handleClose}>
//         Close
//       </Button>
//       <Button variant="primary">Create Stream</Button>
//     </Modal.Footer>
//   </Modal>
// </div>
  );
};

export default Header;
