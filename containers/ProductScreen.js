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
} from "react-native";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axios = require("axios");

// Reçoit donnée du produit

// Possibilité d'ajouter en favoris -> envoi

const ProductScreen = ({ setFavorite }) => {
    const [name, setName] = useState();
    const [picture, setPicture] = useState();
    const [brand, setBrand] = useState();
    const [productObj, setProductObj] = useState();
    const [messageFav, setMessageFav] = useState("");
    const [detailsProduct, setdetailsProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

                console.log(detailsProduct[0].ingredient[1].text);
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchData();
    }, []);

    const addFavorites = async () => {
        const value = JSON.stringify({
            name: name,
            picture: picture,
            brand: brand,
        });
        const productFavorite = await AsyncStorage.setItem(
            "productFavorite",
            value
        );
        setMessageFav("Produits ajouté en favoris");
    };

    // const addFavorites = () => {
    //     setMessageFav("Produits ajouté en favoris");
    //     setFavorite(
    //         JSON.stringify({
    //             name: name,
    //             picture: picture,
    //             brand: brand,
    //         })
    //     );
    // };

    return isLoading ? (
        <ActivityIndicator size="large" color="black" />
    ) : (
        <SafeAreaView>
            <ScrollView>
                {/* <Text>data : {params.data}</Text> */}

                <View>
                    <Image
                        source={{ uri: detailsProduct[0].picture }}
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                    <Text>{detailsProduct[0].name}</Text>
                    <Text>{detailsProduct[0].brand}</Text>
                    <Text>{detailsProduct[0].ecoscore}</Text>
                    <Text>{detailsProduct[0].nutriscore}</Text>
                    <Text>Surgar : {detailsProduct[0].nutrition.sugars}</Text>
                    <Text>Surgar : {detailsProduct[0].nutrition.salts}</Text>
                    <Text>Fat : {detailsProduct[0].nutrition.fat}</Text>

                    <Button
                        title="Add to favorites"
                        onPress={() => {
                            addFavorites();
                        }}
                    ></Button>
                    <Text style={styles.fav}>{messageFav}</Text>

                    <View>
                        <Text>Ingrédient</Text>
                        <Text>
                            {/* {detailsProduct[0].ingredient[0].data.text} */}
                        </Text>

                        <FlatList
                            data={detailsProduct[0].ingredient}
                            renderItem={({ item }) => {
                                return <Text>{item.text}</Text>;
                            }}
                            // keyExtractor={(item) => item}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default ProductScreen;

const styles = StyleSheet.create({
    productImage: { height: 260, width: 200 },
    fav: { color: "red" },
});
