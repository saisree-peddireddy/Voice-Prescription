import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import { Table } from 'antd';




const Quixote = (props) => {
      
      const columns = [
            {
                  title: 'Topic',
                  dataIndex: 'topic',
                  render: text => <b>{text}</b>,
            },
            {
                  title: 'Data',
                  dataIndex: 'data',
                  render: text => <a>{text}</a>,
            }

      ];

      const data = [
            {
                  topic: 'Name',
                  data: props.name,
            },
            {
                  topic: 'Age',
                  data: props.age,
            },
            {
                  topic: 'Diagnosis',
                  data:  props.diagnosis ,
            },
            {
                  topic: 'Remarks',
                  data:  props.remarks ,
            },
            {
                  topic: 'Symptoms',
                  data: props.symptoms ,
            },

      ];


      return (
            <Document>
                  <Page style={styles.text}>
                        <Text style={styles.header} fixed>
                              ~ Created with VoicePrescription ~
                        </Text>
                        <br />
                        <Table
                              columns={columns}
                              dataSource={data}
                              bordered
                        />
                  </Page>
            </Document>
      );
}

Font.register({
      family: 'Oswald',
      src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
      body: {
            paddingTop: 35,
            paddingBottom: 65,
            paddingHorizontal: 35,
      },
      title: {
            fontSize: 24,
            textAlign: 'center',
            fontFamily: 'Oswald'
      },
      author: {
            fontSize: 12,
            textAlign: 'center',
            marginBottom: 40,
      },
      subtitle: {
            fontSize: 18,
            margin: 12,
            fontFamily: 'Oswald'
      },
      text: {
            margin: 12,
            fontSize: 14,
            textAlign: 'justify',
            fontFamily: 'Times-Roman'
      },
      image: {
            marginVertical: 15,
            marginHorizontal: 100,
      },
      header: {
            fontSize: 12,
            marginBottom: 20,
            textAlign: 'center',
            color: 'grey',
      },
      pageNumber: {
            position: 'absolute',
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'grey',
      },
});

export default Quixote;
