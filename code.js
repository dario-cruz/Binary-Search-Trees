// Build a Node class / factory. It should have an attribute for the data it stores as well as its left and right children.
class treeNode {
    constructor(inputData, leftChild = null, rightChild = null) {
        this.inputData = inputData
        this.leftChild
        this.rightChild
    }
}

// Build a Tree class / factory which accepts an array when initialized. 
// The Tree class should have a root attribute which uses the return value of buildTree which you’ll write next.
class tree {
    constructor(givenArray) {
        this.givenArray = givenArray
        this.treeRoot = null
    }
    // Write a function which takes an array of data and turns it into a balanced binary tree,
    // full of Node objects.
    buildTree() {
        // Sort the givenArray in sequential order. 
        this.givenArray = mergeSort(this.givenArray)

        // Process the array and find the mid and root of the Binary Search Tree.
        let mid = this.givenArray.length / 2
        this.treeRoot = this.givenArray[mid]
        
    }
}


// Arrays given as arguments may be un-sorted so lets sort them using mergeSort.
function mergeSort(providedArray) {
    // If the array is empty or consists of only one element return it.
    // We can't sort it. 
    if (providedArray.length <= 1) {
        return providedArray 
    }
    // Find the middle of the array and store it.
    let mid = Math.floor(providedArray.length / 2)
    // Recursively divide the array still we can't divide no more. 
    let left = mergeSort(providedArray.slice(0, mid))
    let right = mergeSort(providedArray.slice(mid))

    // Merge the halves in a sorted manner.
    return 
}

function merge(left, right) {
    let resultArray = []
    // Counters for when we run through the array halves.
    let rightCounter = 0
    let leftCounter = 0
    // Compare elements from sub arrays.
    while (leftCounter < left.length && rightCounter < right.length) {
        if (left[leftCounter] <= right[rightCounter]) {
            resultArray.push(left[leftCounter])
            leftCounter++
        } else {
            resultArray.push(right[rightCounter])
            rightCounter++
        }
    }
    // Add the remaining elements fom sub arrays after on of the left or the right
    // sub arrays is exhausted. 
    while (leftCounter < left.length) {
        resultArray.push(left[leftCounter])
        leftCounter++
    }
    while (rightCounter < right.length) {
        resultArray.push(right[rightCounter])
        rightCounter++
    }
    // Return the completely sorted array. 
    return resultArray
}