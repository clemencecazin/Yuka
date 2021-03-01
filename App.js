import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

import SplashScreen from "./containers/SplashScreen";
import ProductsScreen from "./containers/ProductsScreen";
import CameraScreen from "./containers/CameraScreen";
import ProductScreen from "./containers/ProductScreen";
import FavoritesScreen from "./containers/FavoritesScreen";

export default function App() {
    return (
        <NavigationContainer style={styles.all}>
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
                                    backgroundColor: "rgba(255,255,255,0.8)",
                                },
                                indicatorStyle: {
                                    backgroundColor: "transparent",
                                },
                            }}
                            tabBarPosition="bottom"
                        >
                            <Tab.Screen
                                name="Products"
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
                                            {() => <ProductsScreen />}
                                        </Stack.Screen>

                                        <Stack.Screen
                                            name="Camera"
                                            options={{
                                                title: "Camera",
                                            }}
                                        >
                                            {() => <CameraScreen />}
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

                            {/* CameraScreen */}
                            <Tab.Screen
                                name="Camera"
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
                                            }}
                                        >
                                            {() => <CameraScreen />}
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

                            {/* FavoritesScreen */}

                            <Tab.Screen
                                name="Favorites"
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
                                            options={{
                                                title: "Favorites",
                                                tabBarLabel: "Favorites",
                                            }}
                                        >
                                            {() => <FavoritesScreen />}
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
