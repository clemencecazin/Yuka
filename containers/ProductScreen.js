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
import ProductInfos from "../components/ProductInfos";
import {
    FontAwesome,
    MaterialIcons,
    MaterialCommunityIcons,
    Entypo,
} from "@expo/vector-icons";

const axios = require("axios");

// Reçoit donnée du produit

// Possibilité d'ajouter en favoris -> envoi

const ProductScreen = () => {
    const [detailsProduct, setdetailsProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [nutriscore, setNutriscore] = useState();
    const [data, setData] = useState([]);
    const [fav, setFav] = useState(false);

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
                objectToStore = {
                    name: response.data.product.product_name,
                    picture: response.data.product.image_front_small_url,
                    brand: response.data.product.brands,
                    ecoscore: response.data.product.ecoscore_grade,
                    nutriscore: response.data.product.nutriscore_grade,
                    ingredient: response.data.product.ingredients,
                    nutrition: response.data.product.nutrient_levels,
                    code: response.data.product.code,
                };

                setData(objectToStore);

                console.log("salt");
                console.log(objectToStore.nutrition.salt);

                // console.log("Step 1");
                // console.log(objectToStore);
                // Récupère les données déjà présente ou non dans le tableau
                const previousData = await AsyncStorage.getItem("productData");

                // AsyncStorage pour dataProduct
                // AsyncStorage.clear();
                // Si aucun produit encore scanné, ajout et sauvegarde du produit
                if (previousData === null) {
                    const value = JSON.stringify([objectToStore]);

                    await AsyncStorage.setItem("productData", value);
                    // console.log("Step 2");
                    // console.log(value);
                } else {
                    // Si déjà un produit de scanné, ajout et sauvegarde du nouveau produit
                    // Parse pour pouvoir ajouter le nouveau produit
                    const tabData = JSON.parse(previousData);
                    // console.log("Step tabData");

                    // console.log(tabData);

                    // Condition si le produit est déjà présent message d'alerte
                    let presentProduct = false;
                    for (let i = 0; i < tabData.length; i++) {
                        // console.log(objectToStore.code);
                        if (tabData[i].code === objectToStore.code) {
                            presentProduct = true;
                        }
                    }

                    // Sinon ajout du produit
                    if (presentProduct === false) {
                        tabData.push(objectToStore);
                    }

                    // Sauvegarde tous les produits ajoutés
                    const value = JSON.stringify(tabData);
                    // console.log("3");
                    // console.log(value);
                    await AsyncStorage.setItem("productData", value);
                }

                setIsLoading(false);

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
            const value = JSON.stringify([objectToStore]);

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
                if (tabFavorites[i].code === objectToStore.code) {
                    presentProduct = true;
                    setMessageFav("Le produit a déjà été ajouté aux favoris");
                }
            }

            // Sinon ajout du produit
            if (presentProduct === false) {
                tabFavorites.push(objectToStore);
                setMessageFav("Produits ajouté en favoris");
                setFav(true);
            }

            // Sauvegarde tous les produits ajoutés
            const value = JSON.stringify(tabFavorites);
            // console.log("3");
            // console.log(value);
            await AsyncStorage.setItem("productFavorite", value);
        }
    };

    const circleNote = (info) => {
        if (info === "low") {
            return (
                <>
                    <Text style={{ color: "grey" }}>Faible </Text>
                    <View style={styles.score}>
                        <FontAwesome name="circle" size={18} color="#5ac461" />
                    </View>
                </>
            );
        } else if (info === "moderate") {
            return (
                <>
                    <Text style={{ color: "grey" }}>Moyen </Text>
                    <FontAwesome
                        style={styles.score}
                        name="circle"
                        size={18}
                        color="#ec9036"
                    />
                </>
            );
        } else if (info === "high") {
            return (
                <>
                    <Text style={{ color: "grey" }}>Elevé </Text>
                    <FontAwesome name="circle" size={18} color="#de4b5e" />
                </>
            );
        }
    };

    return isLoading ? (
        <ActivityIndicator size="large" color="black" />
    ) : (
        <SafeAreaView style={styles.bg} key={objectToStore.code}>
            <ScrollView>
                {/* <Text>data : {params.data}</Text> */}
                <View style={styles.container}>
                    <ProductInfos
                        data={objectToStore}
                        addFavorites={addFavorites}
                        fav={fav}
                    />

                    {/* Nutriments */}
                    <Text style={styles.title}>Nutriments</Text>

                    {objectToStore.nutrition.sugars !== "undefined" && (
                        <View style={styles.details}>
                            <View style={styles.nutri}>
                                <MaterialCommunityIcons
                                    name="spoon-sugar"
                                    size={38}
                                    color="black"
                                />

                                <Text style={styles.nutriName}>Sugar</Text>
                            </View>
                            <Text>
                                {circleNote(objectToStore.nutrition.sugars)}
                            </Text>
                        </View>
                    )}

                    {objectToStore.nutrition.salt !== "" ? (
                        <View style={styles.details}>
                            <View style={styles.nutri}>
                                <MaterialIcons
                                    name="grain"
                                    size={38}
                                    color="black"
                                />

                                <Text style={styles.nutriName}>Salt</Text>
                            </View>
                            <Text>
                                {circleNote(objectToStore.nutrition.salt)}
                            </Text>
                        </View>
                    ) : (
                        ""
                    )}
                    {objectToStore.nutrition.fat !== "undefined" && (
                        <View style={styles.details}>
                            <View style={styles.nutri}>
                                <Entypo name="drop" size={38} color="black" />
                                <Text style={styles.nutriName}>Fat</Text>
                            </View>
                            <Text>
                                {circleNote(objectToStore.nutrition.fat)}
                            </Text>
                        </View>
                    )}

                    <View>
                        <Text style={styles.title}>Ingrédient</Text>
                        <Text>
                            {/* {detailsProduct[0].ingredient[0].data.text} */}
                        </Text>

                        {objectToStore.ingredient.map((product, index) => {
                            return (
                                <View key={product.code}>
                                    <Text style={styles.ingredient}>
                                        {product.text}
                                    </Text>
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
    details: {
        marginTop: 0,
        fontSize: 16,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: "lightgrey",
        borderBottomWidth: 0.5,
        marginBottom: 30,
    },
    score: { justifyContent: "flex-end" },
    nutri: { flexDirection: "row" },
    nutriName: {
        fontSize: 18,
        marginLeft: 20,
        alignItems: "center",
    },
    ingredient: {
        paddingVertical: 10,
        fontSize: 16,
    },
});
