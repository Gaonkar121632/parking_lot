
var totalSlots=0
var colorTable={}
var allcatedSlots=[]
var unAllocated=[]


module.exports.createParkingLot=(count)=>{
    totalSlots=Number(count)
    unAllocated=[...Array(totalSlots).keys()]
    return `Created a parking lot with ${count} slot`;
}

module.exports.park=(regNo,color)=>{
    if (unAllocated.length) {
        let slot=unAllocated.shift();
        allcatedSlots[slot]=[slot,regNo,color];
        insertIntoColorHash(regNo,color,slot);
        return `Allocated slot Number ${slot+1}`
    }else{
        return "No Slots available"
    }

}
module.exports.leave=(slot)=>{
    slot=Number(slot)
    if (slot-1<totalSlots) {
        allcatedSlots[slot-1]=[]
        unAllocated.push(slot-1)
        return `${slot} is free`
    }else{
        return "slots not exist"
    }
}
module.exports.status=()=>{
    let tmp='slots\t Reg No\t\t Color\n'
    allcatedSlots.forEach(ele=>{
        if (ele.length) {
            ele[0]+=1
            tmp+=ele.join("\t") +'\n'
        }
    })
    return tmp
}

module.exports.getRegIdByColor=(color)=>{
    let result=colorTable[color]||[]
    result=result.map(ele=>ele[0])
    return result.join(' ')
}

module.exports.getSlotByColor=(color)=>{
    let result=colorTable[color]||[]
    result=result.map(ele=>ele[1]+1)
    return result.join(' ')
}

module.exports.getSlotByRegNumber=(regId)=>{
    let slot=allcatedSlots.find(ele=>{
        if (ele[1]==regId) {
            return ele[0]
        }
    })
    if (slot) {
        return slot.join(' ')
    }else{
        return "Not found"
    }
}


//helpers

let insertIntoColorHash=(regNo,color,slot)=>{
    if(colorTable[color]) 
    colorTable[color].push([regNo,slot])
    else 
     colorTable[color]=[[regNo,slot]]
}
