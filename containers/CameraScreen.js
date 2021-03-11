import React from "react";
import {
    View,
    Text,
    Button,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import { TouchableHighlight } from "react-native-gesture-handler";
import {
    NativeRouter,
    Route,
    Link,
    Redirect,
    withRouter,
} from "react-router-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Envoi données produit scanné vers app.js

// Reçoit données pour envoyer vers fiche produit

const CameraScreen = ({ setInfos }) => {
    const nav = useNavigation();
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [data, setData] = useState(null);
    const [messageProduct, setMessageProduct] = useState("");
    const [productData, setProductData] = useState(null);
    const [tab, setTab] = useState([]);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        // console.log(data);
        setScanned(true);
        setMessageProduct(
            <>
                Votre produit a bien été scanné
                <Button
                    color="blue"
                    title="Go to Produit"
                    onPress={() => {
                        nav.navigate("Product", { data: data });
                    }}
                />
            </>
        );
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        setData(data);

        // Info apporté à App.js
        // setInfos(data);

        // J'enregistre le nouveau code à chaque fois que je scanne un produit
        // const newTab = [...tab];
        // newTab.push(data);
        // console.log(newTab);

        // setTab(newTab);

        // Je l'envoi dans l'asyncStorage

        // AsyncStorage.setItem("productData", data);

        // setProductData(data);

        // console.log(setData);

        // setInfos(data);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <>
            <View
                style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "flex-end",
                }}
            >
                <BarCodeScanner
                    onBarCodeScanned={
                        scanned ? undefined : handleBarCodeScanned
                    }
                    style={StyleSheet.absoluteFillObject}
                />

                {!scanned && (
                    <Button
                        backgroundColor="black"
                        color="white"
                        title={"Scan"}
                        onPress={() => setScanned(false)}
                    />
                )}

                {scanned && (
                    <>
                        <Button
                            color="white"
                            style={styles.button}
                            title={"Tap to Scan Again"}
                            onPress={() => setScanned(false)}
                        />
                    </>
                )}
            </View>
            <Text style={styles.text}>{messageProduct}</Text>

            <Text style={styles.text}>{data}</Text>
        </>
    );
};
export default CameraScreen;

const styles = StyleSheet.create({
    text: { fontSize: 24, color: "red" },
});
