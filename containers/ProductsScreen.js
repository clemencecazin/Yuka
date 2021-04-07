import React from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    SafeAreaView,
    Image,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductInfos from "../components/ProductInfos";

const axios = require("axios");

// ProductScreen reçoit les details du produits et ajoute tableau de produits

// Produit renvoi vers la fiche

const ProductsScreen = ({ navigation }) => {
    const [listing, setListing] = useState();
    const [isLoading, setIsLoading] = useState(true);

    // console.log(productData);
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            const fetchData = async () => {
                // console.log(listing);
                try {
                    const productData = await AsyncStorage.getItem(
                        "productData"
                    );
                    console.log("4");
                    console.log(productData);

                    // Parse pour le passer dans le state
                    const productDataTab = JSON.parse(productData);
                    console.log(5);
                    console.log(productDataTab);

                    setListing(productDataTab);
                    console.log(6);
                    console.log(listing);

                    // console.log(nutriscore);

                    // console.log(listing);
                    setIsLoading(false);
                } catch (error) {
                    console.log(error.response);
                }
            };
            fetchData();
        });
    }, [navigation]);

    return isLoading ? (
        <ActivityIndicator size="large" color="black" />
    ) : (
        <SafeAreaView style={styles.bg}>
            <ProductInfos listing={listing} />

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
export default ProductsScreen;

const styles = StyleSheet.create({
    bg: {
        backgroundColor: "white",
        flex: 1,
    },
    productImage: { height: 150, width: 120 },
    containerProduct: {
        flexDirection: "row",
        borderTopColor: "lightgrey",
        borderTopWidth: 1,
        marginLeft: 20,
        marginVertical: 10,
        height: 180,
        width: "100%",
    },
    descProduct: { flexDirection: "column", padding: 10, width: 200 },
    brand: { fontSize: 12, paddingVertical: 10, color: "grey" },
    name: { fontWeight: "bold", marginTop: 20 },
    arrow: { justifyContent: "center" },
    nustriscore: { width: 100, height: 100 },
});
