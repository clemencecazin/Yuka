import React from "react";
import { View, Text, Button } from "react-native";
// CameraScreen reçoit la props navigation
const ProductScreen = ({ navigation }) => {
    return (
        <View>
            {/* <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        // La fonction navigate() permet de naviguer vers un écran. On lui passe comme argument le nom de l'écran vers lequel on souhaite naviguer (ce nom se trouve dans App.js)
        onPress={() => navigation.navigate("Details")}
      /> */}
        </View>
    );
};
export default ProductScreen;
