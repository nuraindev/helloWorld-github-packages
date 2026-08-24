import React from "react";
import { Text, TouchableOpacity } from "react-native";

export function HelloWorldButton() {
  return (
    <TouchableOpacity
      onPress={() => console.log("Hello World")}
      style={{
        backgroundColor: "#3677BC",
        borderRadius: 6,
        padding: 14,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontWeight: "600" }}>{"hello"}</Text>
    </TouchableOpacity>
  );
}

export default HelloWorldButton;
