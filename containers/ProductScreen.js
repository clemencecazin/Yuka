import React from "react";
import {
    View,
    Text,
    Button,
    SafeAreaView,
    Image,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    ScrollView,
    TouchableNativeFeedback,
} from "react-native";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axios = require("axios");

// Reçoit donnée du produit

// Possibilité d'ajouter en favoris -> envoi

const ProductScreen = () => {
    const [messageFav, setMessageFav] = useState("");
    const [detailsProduct, setdetailsProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [nutriscore, setNutriscore] = useState();

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

                // setName(response.data.product.product_name);
                // setPicture(response.data.product.image_front_small_url);
                // setBrand(response.data.product.brands);

                detailsProduct.push({
                    name: response.data.product.product_name,
                    picture: response.data.product.image_front_small_url,
                    brand: response.data.product.brands,
                    ecoscore: response.data.product.ecoscore_grade,
                    nutriscore: response.data.product.nutriscore_grade,
                    ingredient: response.data.product.ingredients,
                    nutrition: response.data.product.nutrient_levels,
                    code: response.data.product.code,
                });
                // (detailsProduct.name = response.data.product.product_name),
                //     (detailsProduct.picture =
                //         response.data.product.image_front_small_url),
                //     (detailsProduct.brand = response.data.product.brands),
                //     (detailsProduct.ecoscore =
                //         response.data.product.ecoscore_grade),
                //     (detailsProduct.nutriscore =
                //         response.data.product.nutriscore_grade),
                //     (detailsProduct.ingredient =
                //         response.data.product.ingredients),
                //     (detailsProduct.nutrition =
                //         response.data.product.nutrient_levels);

                setIsLoading(false);

                for (i = 0; i < detailsProduct.length; i++) {
                    // setNutriscore(detailsProduct[i].nutriscore);
                    console.log(nutriscore);
                    if (detailsProduct[i].nutriscore === "a") {
                        setNutriscore(
                            <Image
                                source={require("../assets/nutriscore_a.png")}
                                style={styles.productImage}
                                resizeMode="contain"
                            />
                        );
                    } else if (detailsProduct[i].nutriscore === "b") {
                        setNutriscore(
                            <Image
                                source={require("../assets/nutriscore_b.png")}
                                style={styles.productImage}
                                resizeMode="contain"
                            />
                        );
                    } else if (detailsProduct[i].nutriscore === "c") {
                        setNutriscore(
                            <Image
                                source={require("../assets/nutriscore_c.png")}
                                style={styles.productImage}
                                resizeMode="contain"
                            />
                        );
                    } else if (detailsProduct[i].nutriscore === "d") {
                        setNutriscore(
                            <Image
                                source={require("../assets/nutriscore_d.png")}
                                style={styles.productImage}
                                resizeMode="contain"
                            />
                        );
                    } else if (detailsProduct[i].nutriscore === "e") {
                        setNutriscore(
                            <Image
                                source={require("../assets/nutriscore_e.png")}
                                style={styles.productImage}
                                resizeMode="contain"
                            />
                        );
                    }
                }

                // console.log(detailsProduct);
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchData();
    }, []);

    const addFavorites = async () => {
        // AsyncStorage.clear();

        // console.log("1");
        // console.log(detailsProduct);
        // Récupère les données déjà présente ou non dans le tableau
        const previousFavorites = await AsyncStorage.getItem("productFavorite");

        // Si aucun produit encore scanné, ajout et sauvegarde du produit
        if (previousFavorites === null) {
            const value = JSON.stringify(detailsProduct);

            await AsyncStorage.setItem("productFavorite", value);
            // console.log("2");
            // console.log(previousFavorites);
            setMessageFav("Produits ajouté en favoris");
        } else {
            // Si déjà un produit de scanné, ajout et sauvegarde du nouveau produit
            // Parse pour pouvoir ajouter le nouveau produit
            const tabFavorites = JSON.parse(previousFavorites);
            // console.log("tabFavorites");

            // console.log(tabFavorites);

            // Condition si le produit est déjà présent message d'alerte
            let presentProduct = false;
            for (let i = 0; i < tabFavorites.length; i++) {
                // console.log(tabFavorites[i].code);
                if (tabFavorites[i].code === detailsProduct[0].code) {
                    presentProduct = true;
                    setMessageFav("Le produit a déjà été scanné");
                }
            }

            // Sinon ajout du produit
            if (presentProduct === false) {
                tabFavorites.push(detailsProduct[0]);
                setMessageFav("Produits ajouté en favoris");
            }

            // Sauvegarde tous les produits ajoutés
            const value = JSON.stringify(tabFavorites);
            // console.log("3");
            // console.log(value);
            await AsyncStorage.setItem("productFavorite", value);
        }
    };

    return isLoading ? (
        <ActivityIndicator size="large" color="black" />
    ) : (
        <SafeAreaView style={styles.bg}>
            <ScrollView>
                {/* <Text>data : {params.data}</Text> */}
                <View style={styles.container}>
                    <View style={styles.containerProduct}>
                        <Image
                            source={{ uri: detailsProduct[0].picture }}
                            style={styles.productImage}
                            resizeMode="contain"
                        />
                        <View style={styles.descProduct}>
                            <Text style={styles.name}>
                                {detailsProduct[0].name}
                            </Text>
                            <Text style={styles.brand}>
                                {detailsProduct[0].brand}
                            </Text>
                            <Text>{nutriscore}</Text>
                        </View>
                    </View>
                    <Text>{detailsProduct[0].ecoscore}</Text>

                    {/* Nutriments */}
                    <Text style={styles.title}>Nutriments</Text>

                    <Text style={styles.details}>
                        Surgar : {detailsProduct[0].nutrition.sugars}
                    </Text>
                    <Text style={styles.details}>
                        Surgar : {detailsProduct[0].nutrition.salts}
                    </Text>
                    <Text style={styles.details}>
                        Fat : {detailsProduct[0].nutrition.fat}
                    </Text>
                    <Button
                        title="Add to favorites"
                        onPress={() => {
                            addFavorites();
                        }}
                    ></Button>
                    <Text style={styles.fav}>{messageFav}</Text>

                    <View>
                        <Text style={styles.title}>Ingrédient</Text>
                        <Text>
                            {/* {detailsProduct[0].ingredient[0].data.text} */}
                        </Text>

                        {detailsProduct[0].ingredient.map((product, index) => {
                            return (
                                <View key={product.code}>
                                    <Text>{product.text}</Text>
                                </View>
                            );
                        })}
                        {/* <FlatList
                            data={detailsProduct[0].ingredient}
                            renderItem={({ item }) => {
                                return (
                                    <Text style={styles.details}>
                                        {item.text}
                                    </Text>
                                );
                            }}
                            keyExtractor={(item) => item.id}
                        /> */}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default ProductScreen;

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: "white",
    },
    container: {
        marginHorizontal: 20,
    },
    productImage: { height: 160, width: 130 },
    fav: { color: "red" },
    containerProduct: {
        flexDirection: "row",

        marginHorizontal: 20,
        marginVertical: 10,
        height: 130,
        width: "100%",
    },
    descProduct: {
        flexDirection: "column",
        padding: 10,
        width: 200,
    },
    brand: { fontSize: 12, paddingVertical: 10, color: "grey" },
    name: { fontWeight: "bold", marginTop: 20 },
    title: { fontSize: 24, fontWeight: "bold" },
    details: { fontSize: 16, padding: 10 },
});
