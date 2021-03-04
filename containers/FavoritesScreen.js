import React from "react";
import {
    View,
    Text,
    Button,
    SafeAreaView,
    StyleSheet,
    Image,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useState, useEffect } from "react/cjs/react.development";

// Reçoit donnée du produit ajouté en favoris

// Produit renvoi vers la fiche
const FavoritesScreen = ({ productFavorite }) => {
    console.log(productFavorite);
    const [allFavorite, setAllFavorite] = useState();
    // const brand = productFavorite.brand;
    // let tab = [];
    // tab.push(productFavorite);
    // console.log(tab[0].name);

    return (
        <SafeAreaView>
            {/* <Button
                title="Go to Produit"
                onPress={() => {
                    nav.navigate("Product");
                }}
            /> */}
            <Text>{productFavorite.brand}</Text>
            <Image
                source={{ uri: productFavorite.picture }}
                style={styles.productImage}
                resizeMode="contain"
            />
        </SafeAreaView>
    );
};
export default FavoritesScreen;

const styles = StyleSheet.create({
    productImage: { height: 260, width: 200 },
});
