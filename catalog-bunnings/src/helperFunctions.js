export const SKU_Description_Pair=catalog=>{
    let tempCatalog={};
    for(let i=1; i < catalog.length ;i++) {
        let data=catalog[i].data;
        tempCatalog[data[0]] = data[1]
    }
    return tempCatalog;
}

export const Code_SKU_Pair = data=>({
    "code": data[2],
    "sku": data[1]
})

export const Add_Description=(arr, cond, tempCatalog)=>{
    // let sourceA = resultArr.filter(e=>e.Source==='A');
    // let namesA=sourceA.map(elm=>{
    //   elm.Description=tempCatA[elm.SKU]
    //   return elm
    // })

    let filtered = arr.filter(e=>e.Source===cond);
    let addNamesArr=filtered.map(elm=>{
      elm.Description=tempCatalog[elm.SKU]
      return elm
    })
    return addNamesArr
}