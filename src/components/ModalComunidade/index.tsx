import { Center, FormControl, Input, Modal, Button, TextArea, Select, CheckIcon } from "native-base";
import React, { useState } from "react";
import { IComunidade } from "../../interfaces/IComunidades";
import MultiSelect from 'react-native-multiple-select';


const items = [{
	id: '92iijs7yta',
	name: 'Ondo'
}, {
	id: 'a0s0a8ssbsd',
	name: 'Ogun'
}, {
	id: '16hbajsabsd',
	name: 'Calabar'
}, {
	id: 'nahs75a5sg',
	name: 'Lagos'
}, {
	id: '667atsas',
	name: 'Maiduguri'
}, {
	id: 'hsyasajs',
	name: 'Anambra'
}, {
	id: 'djsjudksjd',
	name: 'Benue'
}, {
	id: 'sdhyaysdj',
	name: 'Kaduna'
}, {
	id: 'suudydjsjd',
	name: 'Abuja'
}
];


interface IProps {
	showModal: boolean;
	setShowModal: (value: boolean) => void
}

export default function ModalComunidade({ showModal, setShowModal }: IProps) {

	return (
		<Center>
			<Button onPress={() => setShowModal(true)}>Button</Button>
			<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
				<Modal.Content width={"full"} height={"4/5"}>
					<Modal.CloseButton />
					<Modal.Header>d</Modal.Header>
					<Modal.Body>
						
						<FormControl mt="3">
							
						</FormControl>
						<FormControl>
							<Select selectedValue={''} minWidth="200" accessibilityLabel="Escolha a categoria do texto" placeholder="Choose Service" _selectedItem={{
								bg: "teal.600",
								endIcon: <CheckIcon size="5" />
							}} mt={1}>
								<Select.Item label="UX Research" value="ux" />
								<Select.Item label="Web Development" value="web" />
								<Select.Item label="Cross Platform Development" value="cross" />
								<Select.Item label="UI Designing" value="ui" />
								<Select.Item label="Backend Development" value="backend" />
							</Select>
						</FormControl>
						<FormControl>
							<FormControl.Label>Nome fonte</FormControl.Label>
							<Input />
							<FormControl.Label>URL fonte</FormControl.Label>
							<Input />
							<FormControl.Label>Descrição fonte</FormControl.Label>
							<TextArea h={16} numberOfLines={3} autoCompleteType={''} />
						</FormControl>
						<FormControl>
							<FormControl.Label>Conteúdo coletado</FormControl.Label>
							<TextArea h={20} numberOfLines={10} autoCompleteType={''} />

							<MultiSelect
								hideTags
								items={items}
								uniqueKey="id"
								onSelectedItemsChange={() => {}}
								selectText="Pick Items"
								searchInputPlaceholderText="Search Items..."
								onChangeInput={(text) => console.log(text)}
								tagRemoveIconColor="#CCC"
								tagBorderColor="#CCC"
								tagTextColor="#CCC"
								selectedItemTextColor="#CCC"
								selectedItemIconColor="#CCC"
								itemTextColor="#000"
								displayKey="name"
								searchInputStyle={{ color: '#CCC' }}
								submitButtonColor="#CCC"
								submitButtonText="Submit"
							/>

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
