import React from "react";
import { StatusBar } from "expo-status-bar";
import { DetalhesPost } from "./screens/clicksocial-DetalhesPost/DetalhePost.jsx";
import {CriarPost} from "./screens/clicksocial-CriaPost/CriaPost.jsx";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <DetalhesPost />
      {/* <CriarPost /> */}
    </>
  );
}