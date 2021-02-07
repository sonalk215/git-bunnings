import React, {Component} from 'react';
import CSVFile from '../components/CSVFile/CSVFile';
import {CSVDownload, CSVLink} from 'react-csv';
import {SKU_Description_Pair} from '../helperFunctions';
import classes from './CSVRead.module.css';

class CSVRead extends Component {
  state={
    catalogA: [],
    catalogB: [],
    suppliersA: [],
    suppliersB: [],
    barcodesA: [],
    barcodesB: [],
    error: 0,
    csvData: []
  }

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
    let resultArr=[]
    
    let tempA={}, tempB={}, tempArr=[];
    // let tempCatB={};
    let codeAndSKU_A=[], codeAndSKU_B=[];
    
    // for(let i=1; i < catalogA.length ;i++) {
    //   let mid=catalogA[i].data;
    //   tempCatA[mid[0]] = mid[1]
    // }
    
    console.log(tempCatA);
    // for(let i=1; i < catalogB.length ;i++) {
    //   let mid=catalogB[i].data;
    //   tempCatB[mid[0]] = mid[1]
    // }
    // if(barcodesA.length>1 && barcodesB.length>1) {

    let tempCatA=SKU_Description_Pair(catalogA);
    let tempCatB=SKU_Description_Pair(catalogB);

    for (let i=1; i < barcodesA.length ; i++) {
      let data = barcodesA[i].data;
      
      codeAndSKU_A.push({
        "code": data[2],
        "sku": data[1]
      })

      if(tempCatA[data[1]]) {
        if(tempA[tempCatA[data[1]]]) {
          tempA[tempCatA[data[1]]] = tempA[tempCatA[data[1]]] + "," + data[2]
        }
        else {
          tempA[tempCatA[data[1]]] = data[2]
        }
      }
    }
    // console.log(tempA);

    for (let i=1; i < barcodesB.length ; i++) {
      let data= barcodesB[i].data;      
      codeAndSKU_B.push({
        "code": data[2],
        "sku": data[1]
      })

      if(tempCatB[data[1]]) {
        if(tempB[tempCatB[data[1]]]) {
          tempB[tempCatB[data[1]]] = tempB[tempCatB[data[1]]] + "," + data[2]
        }
        else {
          tempB[tempCatB[data[1]]] = data[2]
        }
      }
    }
    // console.log(tempCatB);
    // }
    // else {
    //   console.log("barcode files not selected, hence there hould be error");
    // }

    let sortedTempA= Object.keys(tempA).sort().reduce((r,k)=> (r[k] = tempA[k], r), {});
    let sortedTempB= Object.keys(tempB).sort().reduce((r,k)=> (r[k] = tempB[k], r), {});

    let allBarcodesAString='', allBarcodesBString='', allBarcodesAArr=[], allBarcodesBArr=[];

    for(let i=0;i<Object.values(sortedTempA).length;i++) {
      allBarcodesAString = allBarcodesAString + Object.values(sortedTempA)[i] + ',';
    }
    for(let i=0;i<Object.values(sortedTempB).length;i++) {
      allBarcodesBString = allBarcodesBString + Object.values(sortedTempB)[i] + ',';
    }

    allBarcodesAArr=allBarcodesAString.split(',');
    allBarcodesBArr=allBarcodesBString.split(',');
    allBarcodesAArr.pop();
    allBarcodesBArr.pop();

    for(let i=0; i<allBarcodesAArr.length ; i++) {
      let sku=codeAndSKU_A.find(x=>x.code===allBarcodesAArr[i]).sku;
      tempArr.push({
        "SKU": sku,
        "Description": '',
        "Source": 'A',
        'barcode': allBarcodesAArr[i]
      })
    }

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
    
    for (let i=0 ; i<tempArr.length; i++) {
      let obj=resultArr.find(o=>o.SKU===tempArr[i].SKU);
      if(!obj) {
        resultArr.push(tempArr[i])
      }
    }

    let sourceA = resultArr.filter(e=>e.Source==='A');
    let namesA=sourceA.map(elm=>{
      elm.Description=tempCatA[elm.SKU]
      return elm
    })

    let sourceB = resultArr.filter(e=>e.Source==='B');
    let namesB=sourceB.map(elm=>{
      elm.Description=tempCatB[elm.SKU]
      return elm
    })

    let final = [...namesA, ...namesB]
    final.forEach(elm=>delete elm.barcode);
    
    this.setState({
      csvData: final
    })  
  }
  render() {
    return (
      <div className={classes['div_files']}>
        <CSVFile fileHandler={this.fileHandler} />
        <CSVFile fileHandler={this.fileHandler} />
        <CSVFile fileHandler={this.fileHandler} />
        <CSVFile fileHandler={this.fileHandler} />
        <CSVFile fileHandler={this.fileHandler} />
        <CSVFile fileHandler={this.fileHandler} />
        <button onClick={this.generateOutput}>Generate Output</button>
        <CSVLink data={this.state.csvData}  filename={'result_output.csv'} target="/catalog-bunnings/src/output" onClick={this.test}>Download me</CSVLink>;
      </div>
    )
  }
}

export default CSVRead;