import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import Logo from './logo.png'
import './pdf.scss'

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10
  },
  image: {
    width: '50%',
    padding: 10,
    alignSelf: "center"
  },
  footer: {
    bottom: 0,
    textAlign: "center",
    position: "absolute"
  }
});

// Create Document Component
const MyDocument = ({ requestDetail }) => (
  <Document className="document">
      {
          requestDetail?
            <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Image style={styles.image} src={Logo} />
            </View>
            <View style={styles.section}>
                <Text>Request ID:</Text><Text>{requestDetail[0]["request_id"]}</Text>
            </View>
            <View style={styles.section}>
                <Text>Project: </Text><Text>{requestDetail[0]["project_name"]}</Text>
            </View>
            <View style={styles.section}>
            {
                requestDetail[0]["item_details"].map((item, index) => {
                    return <Text key={"item" + index}>{index}. {item.name} - {item.quantity}</Text>
                })
            }
            </View>
            <View style={styles.section}>
                <Text>Collection Date:  </Text><Text>{requestDetail[0]["collection_date"]}</Text>
            </View>
            <View style={styles.section}>
                <Text>Requestor:  </Text><Text>{requestDetail[0]["requestor"]}</Text>
            </View>
            <View style={styles.section}>
                <Text>Collector:  </Text><Text>{requestDetail[0]["collector"]}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.footer}>Produced by Jeffrey © copyright reserved</Text>
            </View>
            </Page>
        : null
      }
  </Document>
);



export default MyDocument