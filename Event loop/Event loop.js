console.log("A");
const promise = new Promise((resolve,reject)=>{
    console.log("B");
    resolve("E")
    console.log("C");
}).then((value)=>{

   // console.log(`value is ${value}`);
    return new Promise((resolve,reject)=>{
        console.log(value);
        setTimeout(()=>{value="U"},10);
        setTimeout(()=>{resolve(value)},20)
    })
}).then(value =>console.log(value))
console.log("D");
setTimeout(()=>console.log("R"),20)

for (var i =0;i<5;i++){
    setTimeout(()=>console.log(i),10)
}
for (let e = 0; e<5;e++){
    setTimeout(()=>console.log(e),0)
}