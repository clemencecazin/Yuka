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
import ProductInfos from "../components/ProductInfos";

// Reçoit donnée du produit ajouté en favoris

// Produit renvoi vers la fiche
const FavoritesScreen = ({ navigation }) => {
    // console.log(productFavorite);

    const [isLoading, setIsLoading] = useState(true);
    const [listing, setListing] = useState([]);
    const [nutriscore, setNutriscore] = useState();

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
                    // Récupère mon objet pour l'afficher
                    const productFavorite = await AsyncStorage.getItem(
                        "productFavorite"
                    );
                    // console.log("4");
                    // console.log(productFavorite);

                    // Parse pour le passer dans le state
                    const productFavObj = JSON.parse(productFavorite);
                    // console.log(4);
                    // console.log(productFavObj);

                    setListing(productFavObj);

                    // console.log(listing);

                    // setListing(null);

                    setIsLoading(false);
                } catch (error) {
                    console.log(error.response);
                }
            };
            bootstrapAsync();
        });

        // return unsubscribe;
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
            <ProductInfos listing={listing} />

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
