import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
    FontAwesome5,
    MaterialCommunityIcons,
    Entypo,
} from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

import SplashScreen from "./containers/SplashScreen";
import ProductsScreen from "./containers/ProductsScreen";
import CameraScreen from "./containers/CameraScreen";
import ProductScreen from "./containers/ProductScreen";
import FavoritesScreen from "./containers/FavoritesScreen";
import { useEffect } from "react";

export default function App() {
    const [productData, setProductData] = useState(null);
    const [productFavorite, setProductFavorite] = useState();

    // const [productObj, setProductObj] = useState();

    // Enreigstrement de la Data passée
    const setInfos = async (infos) => {
        AsyncStorage.setItem("productData", infos);

        setProductData(infos);
    };

    const setFavorite = async (value) => {
        AsyncStorage.setItem("productFavorite", value);
        setProductFavorite(value);
        console.log(value);
    };

    // Récupération de la data
    useEffect(() => {
        const bootstrapAsync = async () => {
            const productData = await AsyncStorage.getItem("productData");
            const productFavorite = await AsyncStorage.getItem(
                "productFavorite"
            );

            const productFavObj = JSON.parse(productFavorite);

            setProductData(productData); // Récupére et Stock la data du code barre pour l'envoyer dans l'historique
            setProductFavorite(productFavObj); // Récupére et Stock l'objet pour l'envoyer dans la page favoris
        };
        // console.log(productData);

        bootstrapAsync();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Tab"
                        options={{
                            headerShown: false,
                            animationEnabled: false,
                        }}
                    >
                        {() => (
                            <Tab.Navigator
                                tabBarOptions={{
                                    activeTintColor: "orange",
                                    inactiveTintColor: "black",
                                    showIcon: true,
                                    showLabel: true,
                                    iconStyle: { height: 25, width: 25 },
                                    labelStyle: {
                                        textTransform: "none",
                                        fontSize: 12,
                                    },
                                    tabStyle: {
                                        paddingVertical: 0,
                                        borderBottomWidth: 0,
                                    },

                                    style: {
                                        backgroundColor:
                                            "rgba(255,255,255,0.8)",
                                    },
                                    indicatorStyle: {
                                        backgroundColor: "transparent",
                                    },
                                }}
                                tabBarPosition="bottom"
                            >
                                <Tab.Screen
                                    name="ProductsTab"
                                    options={{
                                        tabBarLabel: "Historique",
                                        tabBarIcon: ({ color, size }) => (
                                            <FontAwesome5
                                                name="carrot"
                                                size={25}
                                                color="orange"
                                            />
                                        ),
                                    }}
                                >
                                    {/* ProductsScreen */}

                                    {() => (
                                        <Stack.Navigator>
                                            <Stack.Screen
                                                name="Products"
                                                options={{
                                                    title: "Historique",
                                                }}
                                            >
                                                {(props) => (
                                                    <ProductsScreen
                                                        {...props}
                                                        productData={
                                                            productData
                                                        }
                                                    />
                                                )}
                                            </Stack.Screen>

                                            <Stack.Screen
                                                name="Product"
                                                options={{
                                                    title: "Product",
                                                }}
                                            >
                                                {() => (
                                                    <ProductScreen
                                                        setFavorite={
                                                            setFavorite
                                                        }
                                                    />
                                                )}
                                            </Stack.Screen>
                                        </Stack.Navigator>
                                    )}
                                </Tab.Screen>

                                {/* CameraScreen */}
                                <Tab.Screen
                                    name="CameraTab"
                                    options={{
                                        tabBarLabel: "Scan",
                                        tabBarIcon: ({ color, size }) => (
                                            <MaterialCommunityIcons
                                                name="barcode-scan"
                                                size={25}
                                                color="black"
                                            />
                                        ),
                                    }}
                                >
                                    {() => (
                                        <Stack.Navigator>
                                            <Stack.Screen
                                                name="Camera"
                                                options={{
                                                    title: "Scan",
                                                    tabBarLabel: "Scan",
                                                    headerShown: false,
                                                }}
                                            >
                                                {() => (
                                                    <CameraScreen
                                                        setInfos={setInfos}
                                                    />
                                                )}
                                            </Stack.Screen>

                                            <Stack.Screen
                                                name="Product"
                                                options={{
                                                    title: "Product",
                                                }}
                                            >
                                                {() => (
                                                    <ProductScreen
                                                        setFavorite={
                                                            setFavorite
                                                        }
                                                    />
                                                )}
                                            </Stack.Screen>
                                        </Stack.Navigator>
                                    )}
                                </Tab.Screen>

                                {/* FavoritesScreen */}

                                <Tab.Screen
                                    name="FavoritesTab"
                                    options={{
                                        tabBarLabel: "Favorites",
                                        tabBarIcon: ({ color, size }) => (
                                            <Entypo
                                                name="star"
                                                size={25}
                                                color="black"
                                            />
                                        ),
                                    }}
                                >
                                    {() => (
                                        <Stack.Navigator>
                                            <Stack.Screen
                                                name="Favorites"
                                                headerRight="OK"
                                                options={{
                                                    title: "Favorites",
                                                    tabBarLabel: "Favorites",
                                                }}
                                            >
                                                {(props) => (
                                                    <FavoritesScreen
                                                        {...props}
                                                        productFavorite={
                                                            productFavorite
                                                        }
                                                    />
                                                )}
                                            </Stack.Screen>

                                            <Stack.Screen
                                                name="Product"
                                                options={{
                                                    title: "Product",
                                                }}
                                            >
                                                {() => <ProductScreen />}
                                            </Stack.Screen>
                                        </Stack.Navigator>
                                    )}
                                </Tab.Screen>
                            </Tab.Navigator>
                        )}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    all: {
        // flex: 1,
        // backgroundColor: "#fff",
        // alignItems: "center",
        // justifyContent: "center",
        marginTop: 30,
    },
});
