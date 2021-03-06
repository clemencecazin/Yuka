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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

// Reçoit donnée du produit ajouté en favoris

// Produit renvoi vers la fiche
const FavoritesScreen = ({ navigation }) => {
    // console.log(productFavorite);
    const [allFavorite, setAllFavorite] = useState();
    const [productFavorite, setProductFavorite] = useState();
    const [product, setProduct] = useState();

    // const brand = productFavorite.brand;
    // let tab = [];
    // tab.push(productFavorite);
    // console.log(tab[0].name);

    // Récupération de la data
    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         const productFavorite = await AsyncStorage.getItem(
    //             "productFavorite"
    //         );

    //         const productFavObj = JSON.parse(productFavorite);
    //         setProductFavorite(productFavObj); // Récupére et Stock l'objet pour l'envoyer dans la page Favoris
    //     });
    //     console.log(productFavorite);

    //     // setProduct(productFavorite.brand);
    //     bootstrapAsync();
    //     return unsubscribe;
    // }, [navigation]);
    // console.log(productFavorite);

    return (
        <SafeAreaView>
            {/* <Button
                title="Go to Produit"
                onPress={() => {
                    nav.navigate("Product");
                }}
            /> */}
            {/* <Text>{product}</Text> */}
            {/* <Image
                source={{ uri: productFavorite.picture }}
                style={styles.productImage}
                resizeMode="contain"
            /> */}
        </SafeAreaView>
    );
};
export default FavoritesScreen;

const styles = StyleSheet.create({
    productImage: { height: 260, width: 200 },
});
