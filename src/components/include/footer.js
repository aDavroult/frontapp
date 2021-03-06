import React from "react";
import logo from '../../images/logo-royal.png'

import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
  
} from "./footerStyles";
import { Image } from 'react-bootstrap';
  
const Footer = () => {
  return (
    <Box>
      <a href="/">
        <div   className="logofooter">
          <Image  src={logo} width="1px" hight="1px" alt="image room" className="logo"></Image>
        </div>
      </a>
      <ul class="footer-links">
        <li novaref="4259376" novatype="txt" data-global="1">1, rue du Général Blaise</li> &nbsp;
        <li novaref="4259377" novatype="txt" data-global="1"> 75011 Paris - France</li>
        <li class="divider"> &nbsp;|&nbsp; </li><li>Tél : <span novaref="4259378" data-global="1" novatype="txt" novaint="1">+33 1 47 00 57 93</span></li>
        <li class="divider"> &nbsp;|&nbsp; </li><li><a href="/fr/contact.html" novaref="4259379" data-global="1" novatype="txt" novaint="1"> reservation@apphotel.com</a></li>
      </ul>
      <ul class="social">
        <li> <a href="https://www.facebook.com/GardetteParkHotel/" target="_blank"> <span class="icon-facebook">f</span> </a></li>
        <li> <a href="https://www.instagram.com/gardetteparkhotel/" target="_blank"> <span class="icon-instagram">i</span> </a></li>
      </ul>
      <ul class="footer-legal top">
        <li novaref="4259380" novatype="txt" data-global="1">appHotel</li><li class="divider">&nbsp;|&nbsp;</li>
        <li> <a href="/fr/disclaimer.html">Mentions légales</a></li><li class="divider">&nbsp;|&nbsp;</li>
        <li> <a href="/fr/privacy-policy.html">Politique de confidentialité</a></li>
      </ul>
    </Box>
  );
};
export default Footer;