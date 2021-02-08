/* CSVRead.js
Read files
Author(s):
    Sonal Khare
Date Created:
    February 07th, 2021
*/
import React, {Component} from 'react';
import CSVFile from '../components/CSVFile/CSVFile';
// import {CSVDownload, CSVLink} from 'react-csv';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {SKU_Description_Pair, Code_SKU_Pair, Add_Description, ToastrMessage, ConvertToCSV, CreateBarcodesArray, Create_Final_CSV_File} from '../helperFunctions';
import classes from './CSVRead.module.css';

class CSVRead extends Component {
  state={
    catalogA: [],
    catalogB: [],
    suppliersA: [],
    suppliersB: [],
    barcodesA: [],
    barcodesB: [],
    // error: 0,
    csvData: []
  }

  // GET FILES DATA AND SAVE INTO RESPECTIVE STATE
  fileHandler=(file, data)=>{
    if(file.name==='catalogA.csv') {
      this.setState({catalogA: data})
    }
    else if(file.name==='catalogB.csv') {
      this.setState({catalogB: data})
    }
    else if(file.name==="suppliersA.csv") {
      this.setState({suppliersA: data})
    }
    else if(file.name==="suppliersB.csv") {
      this.setState({suppliersB: data})
    }
    else if(file.name==="barcodesA.csv") {
      this.setState({barcodesA: data})
    }
    else if(file.name==="barcodesB.csv") {
      this.setState({barcodesB: data})
    }
  }

  generateOutput=()=>{
    let {barcodesA, barcodesB, catalogA, catalogB} = this.state;
    let resultArr=[];
    let tempA={}, tempB={}, tempArr=[];
    let codeAndSKU_A=[], codeAndSKU_B=[];

    if(barcodesA.length>1 && barcodesB.length>1 && catalogA.length>1 && catalogB.length>1) {
      let tempCatA=SKU_Description_Pair(catalogA);
      let tempCatB=SKU_Description_Pair(catalogB);

      for (let i=1; i < barcodesA.length ; i++) {
        let data = barcodesA[i].data;
        codeAndSKU_A.push(Code_SKU_Pair(barcodesA[i].data));

        if(tempCatA[data[1]]) {
          if(tempA[tempCatA[data[1]]]) {
            tempA[tempCatA[data[1]]] = tempA[tempCatA[data[1]]] + "," + data[2]
          }
          else {
            tempA[tempCatA[data[1]]] = data[2]
          }
        }
      }

      for (let i=1; i < barcodesB.length ; i++) {
        let data= barcodesB[i].data;      
        codeAndSKU_B.push(Code_SKU_Pair(barcodesB[i].data));

        if(tempCatB[data[1]]) {
          if(tempB[tempCatB[data[1]]]) {
            tempB[tempCatB[data[1]]] = tempB[tempCatB[data[1]]] + "," + data[2]
          }
          else {
            tempB[tempCatB[data[1]]] = data[2]
          }
        }
      }

      let allBarcodesAArr=CreateBarcodesArray(tempA);
      let allBarcodesBArr = CreateBarcodesArray(tempB);

      //PUSH ALL BARCODES FOR A INTO AN ARRAY
      for(let i=0; i<allBarcodesAArr.length ; i++) {
        let sku=codeAndSKU_A.find(x=>x.code===allBarcodesAArr[i]).sku;
        tempArr.push({
          "SKU": sku,
          "Description": '',
          "Source": 'A',
          'barcode': allBarcodesAArr[i]
        })
      }

      //SELECT BARCODES FROM B WHICH ARE NOT PRESENT IN A
      for(let i=0; i<allBarcodesBArr.length ; i++) {
        if(allBarcodesAArr.indexOf(allBarcodesBArr[i])===-1) {
          let sku=codeAndSKU_B.find(x=>x.code===allBarcodesBArr[i]).sku;
          tempArr.push({
            "SKU": sku,
            "Description": '',
            "Source": 'B',
            'barcode': allBarcodesBArr[i]
          })
        }
      }
      
      //CREATE ARRAY TO HAVE ONLY ONE SKU PER BARCODE AND PRODUCT
      for (let i=0 ; i<tempArr.length; i++) {
        let obj=resultArr.find(o=>o.SKU===tempArr[i].SKU);
        if(!obj) {
          resultArr.push(tempArr[i])
        }
      }

      //ADD PRODUCT NAMES TO THE RESULT
      let namesA=Add_Description(resultArr, 'A', tempCatA);
      let namesB=Add_Description(resultArr, 'B', tempCatB);
      Create_Final_CSV_File(namesA, namesB);
    }
    else {
      ToastrMessage('Please select catalogA, catalogB, barcodeA and barcodeB files to proceed', "error");
    }
  }

  render() {
    /*
      React component to read selected files data and generate CSV output file
      Args:
          props: NA
      Returns:
          uses CSVFile component and button to generate output csv file
    */
    return (
      <div className={classes['div_files']}>
        <CSVFile fileHandler={this.fileHandler} />
        <CSVFile fileHandler={this.fileHandler} />
        <CSVFile fileHandler={this.fileHandler} />
        <CSVFile fileHandler={this.fileHandler} />
        <CSVFile fileHandler={this.fileHandler} />
        <CSVFile fileHandler={this.fileHandler} />
        <button onClick={this.generateOutput} className={classes['btn-generate']}>Generate Output</button>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
        />
      </div>
    )
  }
}

export default CSVRead;