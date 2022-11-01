
//1 вырбрать опорный элемент
//2 Разделить массив на два подмассива (больше и мень опорного)
//3 рекурсить до победного



let arr=[1,4,2,6,7,4,5,6,7,8,9,2,2,1,0];

function quickSort(arr) {
if (arr.length<2) return arr;

const pivotIndex=Math.floor(arr.length/2);
const pivot =arr[pivotIndex]
const less=[];
const greater=[];

for (let i=0;i<arr.length;i++){
    if(i===pivotIndex)continue;
    if(arr[i]<= pivot) less.push(arr[i]);
    else {
        greater.push(arr[i]);
    }
}
return [...quickSort(less),pivot,...quickSort(greater)]

}
console.log(quickSort(arr))