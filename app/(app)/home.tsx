import { useSession } from "@/context/AuthContext";

import React from "react";
import { Alert, Platform, Text, View } from "react-native";
import Button from "../components/core/Button";


const Home = () => {
const {user, signOut} = useSession();
const handleLogout = () => {
    if (Platform.OS === 'web') {
        if(window.confirm("Are you sure you want to logout?")) {
            signOut();
        }
    }else {
        Alert.alert ("Logout", "Are you sure you want to logout?", [
            {text: "Cancel", style: "cancel"},
            {text: "Logout", style: 'destructive',onPress: () => signOut()}
        ],
        {cancelable: true});
    }

};
    return (
        <View>
        <Text>Welcome, {user?.name}</Text>
        <Button onPress={handleLogout}
        variant="danger" 
        className="rounded-2xl shadow-lg" >
            <Text className="text-white text-center font-semibold">Logout</Text>
            </Button>
        </View>
    );
}

export default Home

