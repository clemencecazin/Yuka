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
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
const axios = require("axios");

// ProductScreen reçoit les details du produits et ajoute tableau de produits

// Produit renvoi vers la fiche

const ProductScreen = ({ productData, navigation }) => {
    const [listProduct, setListProduct] = useState(null);
    const [listing, setListing] = useState([]);

    // console.log(productData);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://world.openfoodfacts.org/api/v0/product/${productData}`
                );
                // console.log(response.data);
                // On copie le tableau et on push les infos souhaitées
                const newProduct = [...listing];

                // Si le produit n'est pas présent
                if (newProduct.indexOf(response.data.product.id) === -1) {
                    newProduct.push({
                        code: response.data.product.code,
                        name: response.data.product.product_name,
                        image: response.data.product.image_front_small_url,
                        brand: response.data.product.brands,
                    });
                    setListing(newProduct);
                }

                console.log(listing);
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchData();
    }, [productData]);

    return (
        <SafeAreaView>
            <FlatList
                data={listing}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.push(
                                    "Product",
                                    { data: item.code }
                                    // Navigation vers Product avec la data à passer en param dans la fiche produit
                                );
                            }}
                        >
                            <Image
                                source={{ uri: item.image }}
                                style={styles.productImage}
                            />
                            <Text>{item.name}</Text>
                            <Text>{item.brand}</Text>
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item) => item.code}
            />

            {/* <Image source={{ uri: picture }} style={styles.productImage} />
                <Text>{name}</Text>
                <Text>{brand}</Text> */}
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
