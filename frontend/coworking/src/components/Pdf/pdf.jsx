import React from 'react';
import {Page, Text, View, Document, StyleSheet, PDFViewer} from '@react-pdf/renderer';
import instructions from "./guide.pdf"

// Create Document Component
const Guide = () => {
    return (
        <div>
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
