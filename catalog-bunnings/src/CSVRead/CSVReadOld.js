import React, {Component} from 'react';
import CSVFile from '../components/CSVFile/CSVFile';
import classes from './CSVRead.module.css';

class CSVRead extends Component {
  state={
    catalogA: [],
    catalogB: [],
    suppliersA: [],
    suppliersB: [],
    barcodesA: [],
    barcodesB: [],
    error: 0
  }

  fileHandler=(file, data)=>{
    // console.log(file);
    // console.log(data);

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
    let tempA={}
    let tempB={}
    let tempCatA={};
    let tempCatB={};
    // let barCodeArr=[];
    // console.log("generate output");

    console.log(barcodesA);
    console.log(barcodesB);

    

    for(let i=1; i < catalogA.length ;i++) {
      let mid=catalogA[i].data;
      tempCatA[mid[0]] = mid[1]
    }
    for(let i=1; i < catalogB.length ;i++) {
      let mid=catalogB[i].data;
      tempCatB[mid[0]] = mid[1]
    }
    // if(barcodesA.length>1 && barcodesB.length>1) {
      console.log(tempCatB);
      console.log(tempCatA)


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
        
        // if(tempA[data[1]]) {
        //   tempA[data[1]] = tempA[data[1]] + ","+ data[2];
        // }
        // else {
        //   if(tempCatA[tempA[data[1]]]) {
        //     tempA[tempCatA[tempA[data[1]]]] = data[2];
        //   }
        //   // tempA[data[1]] = data[2];
        // }
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
        // if(tempB[data[1]]) {
        //   tempB[data[1]] = tempB[data[1]] + ","+ data[2];
        // }
        // else {
        //   tempB[data[1]] = data[2];
        // }
      }
    // }
    // else {
    //   console.log("barcode files not selected, hence there hould be error");
    // }

    console.log(tempA);
    console.log(tempB);

    let sortedTempA= Object.keys(tempA).sort().reduce((r,k)=> (r[k] = tempA[k], r), {});
    let sortedTempB= Object.keys(tempB).sort().reduce((r,k)=> (r[k] = tempB[k], r), {});
    console.log(sortedTempA);
    console.log(sortedTempB);
    //const sortObject = o => Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {})

    let objAKeys=Object.keys(sortedTempA);
    let objBKeys=Object.keys(sortedTempB);

    for(let i=0; i<objAKeys.length;i++) {
      // for(let i=0; i<1;i++) {
      if(objBKeys.indexOf(objAKeys[i])!==-1) {
        let txt=objAKeys[i];
        let codesA=sortedTempA[txt];
        let codesB=sortedTempB[txt];

        let codeArrA=codesA.split(",");
        let codeArrB=codesB.split(",")

        console.log(codeArrA);
        console.log(codeArrB)

        for(let i=0; i< codeArrA.length ;i++) {
          if(codeArrB.indexOf(codeArrA[i])!==-1) {
            resultArr.push({
              "description": txt,
              "source": 'A',
              "sku": ''
            })
            break;
          }
          else {
            resultArr.push({
              "description": txt,
              "source": 'A',
              "sku": ''
            })

            resultArr.push({
              "description": txt,
              "source": 'B',
              "sku": ''
            })
            break;
          }
        }
      }
    }

    // console.log(Object.keys(sortedTempA));
    console.log(resultArr);
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
      </div>
      
    )
  }
}

export default CSVRead;
