import React from "react";
import { View, Text, Button, SafeAreaView } from "react-native";
// CameraScreen reçoit la props navigation
const ProductScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            {/* <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        // La fonction navigate() permet de naviguer vers un écran. On lui passe comme argument le nom de l'écran vers lequel on souhaite naviguer (ce nom se trouve dans App.js)
        onPress={() => navigation.navigate("Details")}
      /> */}
        </SafeAreaView>
    );
};
export default ProductScreen;
