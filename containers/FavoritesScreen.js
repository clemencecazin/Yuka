import React from "react";
import { View, Text, Button, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/core";

// Reçoit donnée du produit ajouté en favoris

// Produit renvoi vers la fiche

const FavoritesScreen = ({ productFavorite }) => {
    const nav = useNavigation();
    console.log(productFavorite.name);
    return (
        <SafeAreaView>
            {/* <Button
                title="Go to Produit"
                onPress={() => {
                    nav.navigate("Product");
                }}
            /> */}
            <Text>{productFavorite.name}</Text>
        </SafeAreaView>
    );
};
export default FavoritesScreen;
