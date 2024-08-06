import React from 'react';
import Modal from 'react-modal';

const DeleteConfirmation = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Delete Confirmation"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-6 shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
        <p className="mb-4">Are you sure you want to delete this quiz?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="border-red-500 text-white border-[2.5px] bg-red-500 px-3 font-semibold py-2 rounded-md hover:bg-white hover:text-red-500 transition-colors"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="border-gray-900 text-white border-[2.5px] bg-gray-900 px-3 font-semibold py-2 rounded-md hover:bg-white hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmation;
