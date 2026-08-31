import React from "react";
import { Text, TouchableOpacity } from "react-native";

export function RedButton() {
  return (
    <TouchableOpacity
      onPress={() => console.log("hi world")}
      style={{
        backgroundColor: "#DC2626",
        borderRadius: 6,
        padding: 14,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontWeight: "600" }}>{"hello"}</Text>
    </TouchableOpacity>
  );
}

export default RedButton;
