import { Center, FormControl, Input, Button, Modal } from "native-base";
import React from "react";
import { useState } from "react";

interface Props {
  setShowModal: (v: boolean) => void;
  showModal: boolean;
  dynamicContent: React.ReactNode;
}

export const FormAssuntoComunidade = ({
  setShowModal,
  showModal,
  dynamicContent,
}: Props) => {
  return (
    <Center>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        height={"full"}
      >
        <Modal.Content w={"96"} h={"full"} p={4}>
          {dynamicContent}
        </Modal.Content>
      </Modal>
    </Center>
  );
};
