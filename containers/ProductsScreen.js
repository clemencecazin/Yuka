import React from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";

// ProductScreen reçoit les details du produits et ajoute tableau de produits

// Produit renvoi vers la fiche

const ProductScreen = () => {
    const nav = useNavigation();
    const [listProduct, setListProduct] = useState(null);

    return (
        <SafeAreaView>
            {listProduct === null ? (
                <>
                    <Text>Nothing yet : </Text>
                    <Button
                        title="Go to scan a product"
                        onPress={() => nav.navigate("Camera")}
                    />
                </>
            ) : (
                <Button
                    title="Go to Produit"
                    onPress={() => {
                        nav.navigate("Product");
                    }}
                />
            )}
        </SafeAreaView>
    );
};
export default ProductScreen;

const styles = StyleSheet.create({});
