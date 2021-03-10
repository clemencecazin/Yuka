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
import { MaterialIcons } from "@expo/vector-icons";

const axios = require("axios");

// ProductScreen reçoit les details du produits et ajoute tableau de produits

// Produit renvoi vers la fiche

const ProductScreen = ({ productData, navigation }) => {
    const [listing, setListing] = useState([]);
    const [nutriscore, setNutriscore] = useState();

    // console.log(productData);
    useEffect(() => {
        const fetchData = async () => {
            // console.log(listing);
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
                        nutriscore: response.data.product.nutriscore_grade,
                    });
                    setListing(newProduct);
                }

                setNutriscore(response.data.product.nutriscore_grade);

                // console.log(nutriscore);

                // console.log(listing);
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchData();
    }, [productData]);

    return (
        <SafeAreaView style={styles.bg}>
            {listing === [] ? (
                <Text>Nothing yet</Text>
            ) : (
                <FlatList
                    data={listing}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate(
                                        "Product",
                                        { data: item.code }
                                        // Navigation vers Product avec la data à passer en param dans la fiche produit
                                    );
                                }}
                            >
                                <View style={styles.containerProduct}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={styles.productImage}
                                        resizeMode="contain"
                                    />
                                    <View style={styles.descProduct}>
                                        <Text
                                            style={styles.name}
                                            numberOfLines={2}
                                        >
                                            {item.name}
                                        </Text>
                                        <Text style={styles.brand}>
                                            {item.brand}
                                        </Text>
                                        <View style={styles.nutriscore}>
                                            <Text>{item.nutriscore} </Text>
                                            <Text>{nutriscore}</Text>
                                            {/* <Image
                                                source={require("../assets/nutriscore_a.png")}
                                                style={styles.productImage}
                                                resizeMode="contain"
                                            ></Image> */}
                                        </View>
                                    </View>
                                    <View style={styles.arrow}>
                                        <MaterialIcons
                                            name="keyboard-arrow-right"
                                            size={34}
                                            color="black"
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(item) => item.code}
                />
            )}

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
