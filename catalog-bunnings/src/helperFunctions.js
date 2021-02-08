import { toast } from "react-toastify";

//CREATE OBJECT WITH sku AND DESCRIPTION DATA
export const SKU_Description_Pair=catalog=>{
    let tempCatalog={};
    for(let i=1; i < catalog.length ;i++) {
        let data=catalog[i].data;
        tempCatalog[data[0]] = data[1]
    }
    return tempCatalog;
}

//CREATE OBJECT WITH SKU AND BARCODE PAIR
export const Code_SKU_Pair = data=>({
    "code": data[2],
    "sku": data[1]
})


//RETURN ARRAY WITH BARCODES FROM SOURCES
export const CreateBarcodesArray=(tempArr)=>{
    let barcodesString='', barcodesArr=[];
    let sortedTempArr= Object.keys(tempArr).sort().reduce((r,k)=> (r[k] = tempArr[k], r), {});

    for(let i=0;i<Object.values(sortedTempArr).length;i++) {
        barcodesString = barcodesString + Object.values(sortedTempArr)[i] + ',';
    }

    barcodesArr=barcodesString.split(',');
    barcodesArr.pop();
    return barcodesArr;
}

//ADD DESCRIPTION TO FINAL ARRAY
export const Add_Description=(arr, cond, tempCatalog)=>{
    let filtered = arr.filter(e=>e.Source===cond);
    let addNamesArr=filtered.map(elm=>{
      elm.Description=tempCatalog[elm.SKU]
      return elm
    })
    return addNamesArr
}


//SHOW ERROR MESSAGE IN TOASTR
export const ToastrMessage=(msg, state)=>{
    if(state==='error') {
        return toast.error(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          })
    }
}

export const Create_Final_CSV_File=(namesA, namesB)=>{
    let final = [...namesA, ...namesB]
    let headers={"SKU": "SKU", "Description": "Description", "Source": "Source"};
    final.forEach(elm=>delete elm.barcode);

      //PUSH HEADER FIELDS INTO RESULT ARRAY
      final.unshift(headers);
      let csv = ConvertToCSV(final);
      let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

      //GENERATE OUTPUT FOR CSV AND ALSO AUTO DOWNLOAD IT
      if ( window.webkitURL ) {
        let link = document.createElement("a");
        if (link.download !== undefined) {
          let url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", 'result_output.csv');
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
}


//CONVERT ARRAY TO CSV
export const ConvertToCSV= objArray =>{
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in array[i]) {
        if (line != '') line += ','
        line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
}

export const Create_Output=(barcodesA, barcodesB, codeAndSKU_A, codeAndSKU_B, tempA, tempB, tempCatA, tempCatB)=>{

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

}