import React from "react";
import { View, Text, Button, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/core";

// Envoi données produit scanné vers app.js

// Reçoit données pour envoyer vers fiche produit

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
