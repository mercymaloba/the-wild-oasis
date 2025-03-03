import Button from "../../ui/Button";
// import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
      <Modal.Open opens="table">
        <Button>Show table</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;

// const AddCabin = () => {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <div>
//       {" "}
//       <Button
//         onClick={() => setIsOpenModal((show) => !show)}
//         style={{ marginTop: "2%", width: "100%", marginBottom: "2%" }}
//       >
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default AddCabin;
