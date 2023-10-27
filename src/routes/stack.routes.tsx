import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Comunidade } from '../screens/comunidade';
import { View } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AreaComunidade from '../screens/AreaComunidade';

const Stack = createStackNavigator();

export function StackRoute() {
	const navigation = useNavigation();
	function onPressLeftComunidadesScreen() {
		//@ts-ignore
		navigation.navigate('Iniciar')
	}
	return (
		<Stack.Navigator screenOptions={{
			title: '',
			headerStyle: {
				backgroundColor: '#1A1717'
			},
			headerShadowVisible: false,
			headerTintColor: 'transparent',
		}}>
			<Stack.Screen
				name="AreaComunidade"
				component={AreaComunidade}
				options={{
					headerStyle: {
						backgroundColor: '#1A1717',
					},
					headerTitle: 'Comunidades',
					headerTitleStyle: {
						color: 'white',
						fontSize: 34,
						fontWeight: "900",
						justifyContent: 'center',
						alignItems: 'center'
					}
					,
					headerLeft: () => {
						return (
							<View flex={1} justifyContent={'center'} justifyItems={'center'} flexDirection={'row'}>
								<FontAwesome name='chevron-left' size={26} color="white" style={{ paddingLeft: 22 }} onPress={onPressLeftComunidadesScreen} />
								<Ionicons name="md-people" size={36} color="white" style={{ paddingLeft: 16 }} />
							</View>
						)
					},
				}} />
				<Stack.Screen
					name='Comunidade'
					component={Comunidade}
					options={{
						headerTintColor: 'white'
					}}
				/>
		</Stack.Navigator>
	);
}