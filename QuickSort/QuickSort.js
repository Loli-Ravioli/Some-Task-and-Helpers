let arr=[1,4,2,6,7,4,5,6,7,8,9,2,2,1,0];

function quicksort(arr) {
    return quicksortHelper(arr,0,arr.length-1);
}
    function quicksortHelper(arr,left,right) {

        if (arr.length<2) return arr;

        const index = partition(arr,left,right);

        if(left < index-1){
            quicksortHelper(arr,left,index-1);
        }
        if(index < right){
            quicksortHelper(arr,index,right)
        }
        return arr;

    }

    function partition(arr,left,right){
    const pivot =arr[Math.floor((left+right)/2)]

        while (left<=right){
            while (arr[left]<pivot){
                left++;
            }
            while (arr[right]>pivot){
                right--;
            }
            if(left<=right){
                swap(arr,left,right);
                left++;
                right--;
            }
        }

        return left;
    }
    function swap(arr,i,j){
    const temp=arr[i];
    arr[i]=arr[j];
    arr[j]=temp
    }


console.log(quicksort(arr));