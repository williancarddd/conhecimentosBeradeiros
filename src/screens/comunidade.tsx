import React from "react";
import { Center, FormControl, Input, Text, View, Button, TextArea } from "native-base";
import { StackNavigationProp } from "@react-navigation/stack";

interface IniciarProps {

}

interface Props {
    navigation: StackNavigationProp<
        Record<string, object | undefined>,
        string
    >;
}

export function Comunidade() {
    return (
        <Center w={'100%'} padding={4}>
            <View w={'100%'} mb={4}>
                <Text bold fontSize="xl" textAlign={'center'} borderBottomColor={'gray.200'} borderBottomWidth={1} paddingBottom={2}>
                    Informações Básicas
                </Text>
                <FormControl>
                   
                    <Input borderWidth={1} placeholder="Digite o nome da comunidade" />
                    <FormControl.Label>Descrição da Comunidade</FormControl.Label>
                    <TextArea h={16} numberOfLines={3} placeholder="Digite uma breve descrição da comunidade" autoCompleteType={''}/>
                </FormControl>
            </View>
            <View w={'100%'} mt={4}>
                <Text bold fontSize="xl" mb={4} textAlign={'center'}>
                    Localização da Comunidade
                </Text>
                <FormControl paddingBottom={2}>
                    <FormControl.Label>Latitude</FormControl.Label>
                    <Input placeholder="Digite a latitude da comunidade" />
                    <FormControl.Label>Longitude</FormControl.Label>
                    <Input placeholder="Digite a longitude da comunidade" />
                </FormControl>
            </View>
            <Button size="lg" colorScheme="blue" mt={4}>
                Criar Comunidade
            </Button>
        </Center>
    )
}
