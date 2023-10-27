import { Center, FormControl, Input, Modal, Button } from "native-base";
import React, { useState } from "react";

interface IProps {
	showModal: boolean;
	setShowModal: (value: boolean) => void
}

export default function ModalComunidade({ showModal, setShowModal }: IProps) {

	return (
		<Center>
			<Button onPress={() => setShowModal(true)}>Button</Button>
			<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
				<Modal.Content  width={"full"} height={"4/5"}>
					<Modal.CloseButton />
					<Modal.Header>Contact Us</Modal.Header>
					<Modal.Body>
						<FormControl>
							<FormControl.Label>Name</FormControl.Label>
							<Input />
						</FormControl>
						<FormControl mt="3">
							<FormControl.Label>Email</FormControl.Label>
							<Input />
						</FormControl>
					</Modal.Body>
					<Modal.Footer>
						<Button.Group space={2}>
							<Button variant="ghost" colorScheme="blueGray" onPress={() => {
								setShowModal(false);
							}}>
								Cancel
							</Button>
							<Button onPress={() => {
								setShowModal(false);
							}}>
								Save
							</Button>
						</Button.Group>
					</Modal.Footer>
				</Modal.Content>
			</Modal>
		</Center>
	);
};
