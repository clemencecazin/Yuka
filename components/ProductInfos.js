import React from "react";
import { FlatList } from "react-native-gesture-handler";
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
import { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";

const ProductInfos = ({ listing, data, addFavorites, fav }) => {
    const [messageFav, setMessageFav] = useState("");

    const navigation = useNavigation();
    console.log(listing);

    const removeProduct = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (exception) {
            return false;
        }
    };

    const renderNutriscore = (nutriscore) => {
        // setNutriscore(detailsProduct[i].nutriscore);
        // console.log(nutriscore);
        if (nutriscore === "a") {
            return (
                <>
                    <FontAwesome name="circle" size={18} color="#5ac461" />
                    <Text style={{ color: "grey" }}> Excellent</Text>
                </>
            );
        } else if (nutriscore === "b") {
            return (
                <>
                    <FontAwesome name="circle" size={18} color="#68e080" />
                    <Text style={{ color: "grey" }}> Bon</Text>
                </>
            );
        } else if (nutriscore === "c" || nutriscore === "d") {
            return (
                <>
                    <FontAwesome name="circle" size={18} color="#ec9036" />
                    <Text style={{ color: "grey" }}> Médiocre</Text>
                </>
            );
        } else if (nutriscore === "e") {
            return (
                <>
                    <FontAwesome name="circle" size={18} color="#de4b5e" />
                    <Text style={{ color: "grey" }}> Mauvais</Text>
                </>
            );
        }
    };

    return (
        <>
            {data && (
                <View style={styles.containerProduct}>
                    <Image
                        source={{ uri: data.picture }}
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                    <View style={styles.descProduct}>
                        <Text style={styles.name}>{data.name}</Text>
                        <Text style={styles.brand}>{data.brand}</Text>
                        <Text style={styles.nutri}>
                            {renderNutriscore(data.nutriscore)}
                        </Text>

                        {fav ? (
                            <>
                                <FontAwesome
                                    style={styles.star}
                                    onPress={() => {
                                        addFavorites();
                                    }}
                                    name="star"
                                    size={30}
                                    color="#f5ba49"
                                />
                            </>
                        ) : (
                            <Feather
                                style={styles.star}
                                onPress={() => {
                                    addFavorites();
                                }}
                                name="star"
                                size={30}
                                color="#f5ba49"
                            />
                        )}

                        <Text style={styles.fav}>{messageFav}</Text>
                    </View>
                </View>
            )}
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
                                    <Text style={styles.nutri}>
                                        {renderNutriscore(item.nutriscore)}
                                    </Text>
                                    <TouchableOpacity
                                        removeProduct={() => {
                                            removeProduct(item.code);
                                        }}
                                    >
                                        <Ionicons
                                            style={styles.trash}
                                            name="md-trash-outline"
                                            size={24}
                                            color="black"
                                        />
                                    </TouchableOpacity>
                                </View>
                                {/* <Button
                                    title="Delete X"
                                    removeProduct={() => {
                                        removeProduct(item.code);
                                    }}
                                /> */}
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
        </>
    );
};

export default ProductInfos;

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
        paddingLeft: 20,
        marginVertical: 10,
        height: 180,
        width: "100%",
        paddingVertical: 20,
    },
    descProduct: { flexDirection: "column", paddingHorizontal: 20, width: 200 },
    brand: { fontSize: 12, paddingVertical: 10, color: "grey" },
    name: { fontWeight: "bold" },
    arrow: { justifyContent: "center" },
    nustriscore: { width: 100, height: 100 },
    nutri: { marginRight: 20 },
    trash: {
        color: "white",
        backgroundColor: "red",
        padding: 10,
        marginTop: 20,
        width: 45,
    },
    star: { marginTop: 20 },
});
