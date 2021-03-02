import React from "react";
import { View, Text, Button, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/core";

const CameraScreen = () => {
    const nav = useNavigation();

    return (
        <SafeAreaView>
            <Button
                title="Go to Produit"
                onPress={() => {
                    nav.navigate("Product");
                }}
            />
        </SafeAreaView>
    );
};
export default CameraScreen;
