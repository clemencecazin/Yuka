import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/core";

const FavoritesScreen = () => {
    const navigation = useNavigation();

    return (
        <View>
            <Button
                title="Go to Produit"
                onPress={() => {
                    navigation.navigate("Product");
                }}
            />
        </View>
    );
};
export default FavoritesScreen;
