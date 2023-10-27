import { View } from "native-base";
import { Ionicons } from '@expo/vector-icons';
import React from "react";
import { OpaqueColorValue } from "react-native";

interface Props {
    size?: number | undefined
    color?: string | OpaqueColorValue | undefined
}
export  default function MidButton({size, color}: Props) {
    return (
       <View width={62} 
       height={62}  
       borderRadius={'100%'} 
       backgroundColor={'#c7bebe'} 
       alignItems={'center'}
       justifyContent={'center'}
       >
        <Ionicons name="home" size={size} color={color}  />
       </View>
    )
};
