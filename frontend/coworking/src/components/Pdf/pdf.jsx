import React from 'react';
import {Page, Text, View, Document, StyleSheet, PDFViewer} from '@react-pdf/renderer';
import instructions from "./guide.pdf"

// Create Document Component
const Guide = () => {
    return (
        <div style={{backgroundColor: "rgb(50,54,57)"}}>
            <a href="/" style={{color: "white", fontSize: 24,textDecoration: "none", fontFamily: "sans-serif",
            backgroundColor: "lightskyblue", borderRadius: "10px", paddingLeft: 15, paddingRight: 15, marginLeft: 20}}>Назад</a>
            <iframe
                src={instructions}
                width="100%"
                height="900px"
                title="PDF Viewer"
            />
        </div>
    );
};

export default Guide;
