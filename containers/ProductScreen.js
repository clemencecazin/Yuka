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

const ProductScreen = ({ setFavorite }) => {
    const [name, setName] = useState();
    const [picture, setPicture] = useState();
    const [brand, setBrand] = useState();
    const [productObj, setProductObj] = useState();
    const [messageFav, setMessageFav] = useState("");

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

    const addFavorites = () => {
        setMessageFav("Produits ajouté en favoris");
        setFavorite(
            JSON.stringify({
                name: name,
                picture: picture,
                brand: brand,
            })
        );
    };

    return (
        <SafeAreaView>
            <Text>data : {params.data}</Text>

            <View>
                <Image
                    source={{ uri: picture }}
                    style={styles.productImage}
                    resizeMode="contain"
                />
                <Text>{name}</Text>
                <Text>{brand}</Text>
                <Button
                    title="Add to favorites"
                    onPress={() => {
                        addFavorites();
                    }}
                ></Button>
                <Text style={styles.fav}>{messageFav}</Text>
            </View>
        </SafeAreaView>
    );
};
export default ProductScreen;

const styles = StyleSheet.create({
    productImage: { height: 260, width: 200 },
    fav: { color: "red" },
});
