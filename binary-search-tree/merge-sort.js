/*
Implementation of merge sort, exported to be used as a utility
*/


function mergeSort(inArray) {
    let left = [];
    let right = [];

    let arrLen = inArray.length;
    
    //Check if sorted, list of 1 element is automatically considered sorted
    if (arrLen <= 1){
        return inArray;
    }

    //Recursively split the left and right halves, merge at the bottom
    let splitPoint = Math.floor(arrLen/2);
    left = inArray.slice(0, splitPoint);
    right = inArray.slice(splitPoint, arrLen);
    
    left = mergeSort(left);
    right = mergeSort(right);

    return mergeArrays(left, right);
}

function mergeArrays(leftArr, rightArr) {
    let result = [];
    let i = 0;
    let j = 0;
    let k = 0;

    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            result[k] = leftArr[i];
            k++;
            i++;
        }
        else {
            result[k] = rightArr[j];
            k++;                 
            j++;
        }
    }

    //clean up rest of elements in unfinished array
    if ((i) >= leftArr.length) {
        //we finished w/ left array, so copy in the rest of right array
        result.push.apply(result, rightArr.slice(j));
    } else {
        result.push.apply(result, leftArr.slice(i));
    };

    return result;
}

export default mergeSort;