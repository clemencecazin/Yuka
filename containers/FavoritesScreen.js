import React from "react";
import {
    View,
    Text,
    Button,
    SafeAreaView,
    StyleSheet,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useState, useEffect } from "react/cjs/react.development";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

// Reçoit donnée du produit ajouté en favoris

// Produit renvoi vers la fiche
const FavoritesScreen = ({ navigation }) => {
    // console.log(productFavorite);
    const [allFavorite, setAllFavorite] = useState();
    const [productFavorite, setProductFavorite] = useState();
    const [product, setProduct] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [listing, setListing] = useState([]);

    // const brand = productFavorite.brand;
    // let tab = [];
    // tab.push(productFavorite);
    // console.log(tab[0].name);

    // Récupération de la data
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            // The screen is focused
            // Mettre ici la déclaration puis l'appel de `bootstrapAsync`
            const bootstrapAsync = async () => {
                try {
                    // Récupère mon objet
                    const productFavorite = await AsyncStorage.getItem(
                        "productFavorite"
                    );
                    // console.log(3);
                    // console.log(productFavorite);
                    // Parse pour pouvoir push un nouveau produit
                    const productFavObj = JSON.parse(productFavorite);
                    // setProductFavorite(productFavObj);
                    // console.log(4);
                    // console.log(productFavObj);

                    // Push chaque nouveau produit ajouté en favoris
                    for (i = 0; i < productFavObj.length; i++) {
                        if (listing.indexOf(productFavObj[i].code) === -1) {
                            console.log(productFavObj[i].code);
                            listing.push(productFavObj[i]);
                            console.log(listing);
                        }
                    }

                    // Stocke chaque nouveaux produits

                    const value = JSON.stringify(listing);
                    console.log(1);
                    console.log(value);
                    await AsyncStorage.setItem("productFavorite", value);

                    // setListing(null);

                    setIsLoading(false);
                } catch (error) {
                    console.log(error.response);
                }
            };
            bootstrapAsync();
        });

        return unsubscribe;
    }, [navigation]);

    // useEffect(() => {
    //     const bootsAsync = async () => {
    //         const productFavorite = await AsyncStorage.getItem(
    //             "productFavorite"
    //         );

    //         const productFavObj = JSON.parse(productFavorite);
    //         setProductFavorite(productFavObj); // Récupére et Stock l'objet pour l'envoyer dans la page Favoris
    //     };
    //     console.log(productFavorite);

    //     // setProduct(productFavorite.brand);
    //     bootsAsync();
    // }, []);

    return isLoading ? (
        <ActivityIndicator size="large" color="black" />
    ) : (
        <SafeAreaView>
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
                                    source={{ uri: item.picture }}
                                    style={styles.productImage}
                                    resizeMode="contain"
                                />
                                <View style={styles.descProduct}>
                                    <Text style={styles.name} numberOfLines={2}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.brand}>
                                        {item.brand}
                                    </Text>
                                    {/* <View style={styles.nutriscore}> */}
                                    {/* {item.nutriscore} */}
                                    {/* <Text>{nutriscore}</Text> */}
                                    {/* <Image
                                                source={require("../assets/nutriscore_a.png")}
                                                style={styles.productImage}
                                                resizeMode="contain"
                                            ></Image> */}
                                    {/* </View> */}
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
            {/* {listing.map((favProduct, index) => {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.push(
                                "Product",
                                { data: favProduct.code }
                                // Navigation vers Product avec la data à passer en param dans la fiche produit
                            );
                        }}
                    >
                        <View key={favProduct.code}>
                            <Text>{favProduct.name}</Text>
                            <Text>{favProduct.brand}</Text>
                            <Image
                                source={{ uri: favProduct.picture }}
                                style={styles.productImage}
                                resizeMode="contain"
                            />
                        </View>
                    </TouchableOpacity>
                ); */}
            {/* })} */}
        </SafeAreaView>
    );
};
export default FavoritesScreen;

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
