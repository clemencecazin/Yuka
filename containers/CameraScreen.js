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

// Envoi données produit scanné vers app.js

// Reçoit données pour envoyer vers fiche produit

const CameraScreen = ({ setInfos }) => {
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

        // Info apporté à App.js
        setInfos(data);

        // console.log(data);
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
                        color="#f194ff"
                        title={"Scan"}
                        onPress={() => setScanned(false)}
                    />
                )}

                {scanned && (
                    <>
                        <Button
                            backgroundColor="black"
                            color="#f194ff"
                            style={styles.button}
                            title={"Tap to Scan Again"}
                            onPress={() => setScanned(false)}
                        />
                        <Button
                            backgroundColor="black"
                            color="#f194ff"
                            title="Go to Produit"
                            onPress={() => {
                                nav.navigate("Product", { data: data });
                            }}
                        />
                    </>
                )}
            </View>
            <Text style={styles.text}>{data}</Text>
        </>
    );
};
export default CameraScreen;

const styles = StyleSheet.create({
    text: { fontSize: 34 },
    button: { color: "#f194ff" },
});
