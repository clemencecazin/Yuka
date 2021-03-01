import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";

// ProductScreen reçoit la props navigation
const ProductScreen = () => {
    const navigation = useNavigation();

    return (
        <View>
            {/* <Button
                title="Go to Camera"
                // La fonction navigate() permet de naviguer vers un écran. On lui passe comme argument le nom de l'écran vers lequel on souhaite naviguer (ce nom se trouve dans App.js)
                onPress={() => {
                    navigation.navigate("Camera");
                }}
            /> */}

            <Button
                title="Go to Produit"
                onPress={() => {
                    navigation.navigate("Product");
                }}
            />
        </View>
    );
};
export default ProductScreen;

const styles = StyleSheet.create({});
