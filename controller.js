
var totalSlots=0
var colorTable={}
var allcatedSlots=[]
var unAllocated=[]


module.exports.createParkingLot=(count)=>{
    totalSlots=Number(count)
    unAllocated=[...Array(totalSlots).keys()]
    console.log(`Created a parking lot with ${count} slot`);
}

module.exports.park=(regNo,color)=>{
    if (unAllocated.length) {
        let slot=unAllocated.shift();
        allcatedSlots[slot]=[slot,regNo,color];
        insertIntoColorHash(regNo,color,slot);
        console.log(`Allocated slot Number ${slot+1}`);
    }else{
        console.log("No Slots available");
    }

}
module.exports.leave=(slot)=>{
    slot=Number(slot)
    if (slot-1<totalSlots) {
        allcatedSlots[slot-1]=[]
        unAllocated.push(slot-1)
        console.log(`${slot} is free`);
    }else{
        console.log("slots not exist");
    }
}
module.exports.status=()=>{
    allcatedSlots.forEach(ele=>{
        if (ele.length) {
            ele[0]+=1
            console.log(ele.join(" "));
        }
    })
    return
}

module.exports.getRegIdByColor=(color)=>{
    let result=colorTable[color].map(ele=>ele[0])
    console.log(result.join(' '));
    return 
}

module.exports.getSlotByColor=(color)=>{
    let result=colorTable[color].map(ele=>ele[1]+1)
    console.log(result.join(' '));
    return 
}

module.exports.getSlotByRegNumber=(regId)=>{
    let slot=allcatedSlots.find(ele=>{
        if (ele[1]==regId) {
            return ele[0]
        }
    })
    if (slot) {
        console.log(slot.join(' '));
    }else{
        console.log("Not found");
    }
    return
}


//helpers

let insertIntoColorHash=(regNo,color,slot)=>{
    if(colorTable[color]) 
    colorTable[color].push([regNo,slot])
    else 
     colorTable[color]=[[regNo,slot]]
}
