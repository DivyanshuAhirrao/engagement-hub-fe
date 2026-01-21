import React from "react";
import { useNavigate } from "react-router-dom";
import { ShellBar, ShellBarItem } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/home";
import "@ui5/webcomponents-icons/dist/product";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ShellBar
      primaryTitle="Engagement Hub"
      onLogoClick={() => navigate("/")}
      style={{ marginBottom: "1rem" }}
    >
      <ShellBarItem icon="home" text="Home" onClick={() => navigate("/")} />
      <ShellBarItem
        icon="product"
        text="Propositions"
        onClick={() => navigate("/propositions")}
      />
    </ShellBar>
  );
};

export default Header;
