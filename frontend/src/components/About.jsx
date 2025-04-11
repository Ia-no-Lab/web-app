import React from "react";
import "./About.css";
import {Link } from "@chakra-ui/react"
import { LuExternalLink } from "react-icons/lu"

function About() {
  return (
    <div className="bigBoxAbout">
      <h1>Sobre</h1>
      <p>Ia no Lab é um website de código aberto feito por estudantes que visa simplificar a ciência por meio do uso de Inteligência Artificial.</p>
      <h2>
      <Link
        variant="underline"
        fontSize = "2xl"
        href="https://github.com/Ia-no-Lab" 
        color="#24201bff">Visite o código<LuExternalLink/></Link>
      </h2>
    </div>
  );
}

export default About;
