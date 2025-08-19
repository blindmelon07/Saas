import { useSession } from "@/context/AuthContext";
import React from "react";
import { Text, View } from "react-native";


const Home = () => {
const {user} = useSession()
    return (
        <View>
        <Text>Welcome, {user?.name}</Text>
        </View>
    );
}

export default Home

