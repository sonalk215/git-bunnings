import React, {Component} from 'react';
import CSVFile from '../components/CSVFile/CSVFile';
import {CSVDownload, CSVLink} from 'react-csv';
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
    let resultArr=[]
    let {barcodesA, barcodesB, catalogA, catalogB} = this.state
    let tempA={}, tempB={};
    let tempCatA={}, tempCatB={};
    

    for(let i=1; i < catalogA.length ;i++) {
      let mid=catalogA[i].data;
      tempCatA[mid[0]] = mid[1]
    }
    for(let i=1; i < catalogB.length ;i++) {
      let mid=catalogB[i].data;
      tempCatB[mid[0]] = mid[1]
    }
    // if(barcodesA.length>1 && barcodesB.length>1) {


      for (let i=1; i < barcodesA.length ; i++) {
        let data = barcodesA[i].data;

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

        if(tempCatB[data[1]]) {
          if(tempB[tempCatB[data[1]]]) {
            tempB[tempCatB[data[1]]] = tempB[tempCatB[data[1]]] + "," + data[2]
          }
          else {
            tempB[tempCatB[data[1]]] = data[2]
          }
        }
      }
    // }
    // else {
    //   console.log("barcode files not selected, hence there hould be error");
    // }

    let sortedTempA= Object.keys(tempA).sort().reduce((r,k)=> (r[k] = tempA[k], r), {});
    let sortedTempB= Object.keys(tempB).sort().reduce((r,k)=> (r[k] = tempB[k], r), {});

    let objAKeys=Object.keys(sortedTempA);
    let objBKeys=Object.keys(sortedTempB);

    for(let i=0; i<objAKeys.length;i++) {
      // for(let i=0; i<1;i++) {
      if(objBKeys.indexOf(objAKeys[i])!==-1) {
        let txt=objAKeys[i];
        let codesA=sortedTempA[txt];
        let codesB=sortedTempB[txt];

        let codeArrA=codesA.split(",");
        let codeArrB=codesB.split(",");

        for(let i=0; i< codeArrA.length ;i++) {
          if(codeArrB.indexOf(codeArrA[i])!==-1) {
            resultArr.push({
              "SKU": '',
              "Description": txt,
              "Source": 'A',
            })
            break;
          }
          else {
            resultArr.push({
              "SKU": '',
              "Description": txt,
              "Source": 'A'
            })

            resultArr.push({
              "SKU": '',
              "Description": txt,
              "Source": 'B'
            })
            break;
          }
        }
      }
      else {
        resultArr.push({
          "SKU": '',
          "Description": objAKeys[i],
          "Source": 'A'
        })
      }
    }

    //GET ELEMENTS ONLY IN SOURCE B
    // console.log(objBKeys);
    let onlyBKeys=objBKeys.filter(e=>!objAKeys.includes(e));
    // console.log(onlyBKeys);

    for (let i=0 ; i<onlyBKeys.length ; i++) {
      resultArr.push({
        "SKU": '',
        "Description": onlyBKeys[i],
        "Source": 'B'
      })
    }

    let changedA = [], changedB = [], sourceA=[], sourceB=[];
    console.log(resultArr);
    for (let i=0; i<resultArr.length ; i++) {
      // if(resultArr[i].)
      sourceA = resultArr.filter(e=>e.Source==='A');
      sourceB = resultArr.filter(e=>e.Source==='B');
    }  

      // console.log(tempCatA);
    let prodNamesA=Object.values(tempCatA);
    let prodSKUA=Object.keys(tempCatA);

    changedA = sourceA.map(e=>{
      let idx= prodNamesA.indexOf(e.Description);
      let tempSKU = prodSKUA[idx];
      return {
        "SKU": tempSKU,
        "Description": e.Description,
        "Source": e.Source,
        
      }
    })

    let prodNamesB=Object.values(tempCatB);
    let prodSKUB=Object.keys(tempCatB);

    changedB = sourceB.map(e=>{
      let idx= prodNamesB.indexOf(e.Description);
      let tempSKU = prodSKUB[idx];
      return {
        "SKU": tempSKU,
        "Description": e.Description,
        "Source": e.Source
      }
    })
    let headers=[{"SKU": "SKU", "Description": "Description", "Source": "Source"}];
    console.log([...headers, ...changedA, ...changedB]);
    let final = [...changedA, ...changedB]
    this.setState({
      csvData: final
    })

    

    // /CSVDownload
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
        <CSVLink data={this.state.csvData}  filename={'result_output.csv'}target="/catalog-bunnings/src/output">Download me</CSVLink>;
      </div>
      
    )
  }
}

export default CSVRead;