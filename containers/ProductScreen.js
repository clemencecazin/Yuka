import React from "react";
import {
    View,
    Text,
    Button,
    SafeAreaView,
    Image,
    StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/core";

const axios = require("axios");

// Reçoit donnée du produit

// Possibilité d'ajouter en favoris -> envoi

const ProductScreen = () => {
    const [name, setName] = useState();
    const [picture, setPicture] = useState();
    const [brand, setBrand] = useState();

    const { params } = useRoute();
    // const id = route.params.data;
    // console.log(params);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://world.openfoodfacts.org/api/v0/product/${params.data}`
                );
                // console.log(response.data);

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
            <Text>data : {params.data}</Text>

            <View>
                <Image source={{ uri: picture }} style={styles.productImage} />
                <Text>{name}</Text>
                <Text>{brand}</Text>
            </View>
        </SafeAreaView>
    );
};
export default ProductScreen;

const styles = StyleSheet.create({
    productImage: { height: 160, width: 100 },
});
