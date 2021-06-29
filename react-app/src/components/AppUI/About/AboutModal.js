/*************************** REACT IMPORTS ***************************/
import React, { useState } from 'react';


/*************************** OTHER FILE IMPORTS ***************************/
import { Modal } from '../../../context/Modal';
import About from './About';

/*************************** COMPONENTS ***************************/

function AboutModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
        <span className="main-nav__about" onClick={() => setShowModal(true)}>About</span>
        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <About/>
        </Modal>
        )}
    </>
  );
}


/*************************** EXPORT ***************************/

export default AboutModal;