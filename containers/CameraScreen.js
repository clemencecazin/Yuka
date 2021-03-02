import React from "react";
import { View, Text, Button, SafeAreaView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";

// Envoi données produit scanné vers app.js

// Reçoit données pour envoyer vers fiche produit

const CameraScreen = () => {
    const nav = useNavigation();
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        // console.log(data);
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        setData(data);
        console.log(data);
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

                <Button
                    title="Go to Produit"
                    onPress={() => {
                        nav.navigate("Product", { data: data });
                    }}
                />

                {scanned && (
                    <Button
                        title={"Tap to Scan Again"}
                        onPress={() => setScanned(false)}
                    />
                )}
            </View>
            <Text style={styles.text}>{data}</Text>
        </>
    );
};
export default CameraScreen;

const styles = StyleSheet.create({
    text: { fontSize: 34 },
});
