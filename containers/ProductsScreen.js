import React from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    SafeAreaView,
    Image,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
const axios = require("axios");

// ProductScreen reçoit les details du produits et ajoute tableau de produits

// Produit renvoi vers la fiche

const ProductScreen = ({ productData, navigation }) => {
    const nav = useNavigation();
    const [listProduct, setListProduct] = useState(null);
    const [name, setName] = useState();
    const [picture, setPicture] = useState();
    const [brand, setBrand] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://world.openfoodfacts.org/api/v0/product/${productData}`
                );
                console.log(response.data);

                // Rendu du produit

                setName(response.data.product.product_name);
                setPicture(response.data.product.image_front_small_url);
                setBrand(response.data.product.brands);
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchData();
    }, []);

    return (
        <SafeAreaView>
            <TouchableOpacity
                onPress={() => {
                    //ici on fait un navigation.push pour naviguer vers un "nouveau" screen Character et non pas un navigation.navigate qui "retournerait" sur l'ancien
                    navigation.push(
                        "Product",
                        { data: productData }
                        //Lors de la navigation vers le Screen Character je passe le params item
                    );
                }}
            >
                <Image source={{ uri: picture }} style={styles.productImage} />
                <Text>{name}</Text>
                <Text>{brand}</Text>
            </TouchableOpacity>
            {/* {listProduct === null ? (
                <>
                    <Text>Nothing yet : </Text>
                    <Button
                        title="Go to scan a product"
                        onPress={() => nav.navigate("CameraTab")}
                    />
                </>
            ) : (
                <Button
                    title="Go to Produit"
                    onPress={() => {
                        nav.navigate("Product");
                    }}
                />
            )} */}
        </SafeAreaView>
    );
};
export default ProductScreen;

const styles = StyleSheet.create({
    productImage: { height: 160, width: 100 },
});
