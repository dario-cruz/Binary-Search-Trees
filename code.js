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
        // Sort the givenArray in sequential order. 
        this.givenArray = mergeSort(this.givenArray)
        this.treeRoot = null
        this.buildStatus = false
    }
    // Write a function which takes an array of data and turns it into a balanced binary tree,
    // full of Node objects.
    buildTree() {
        // Process the array and find the mid and root of the Binary Search Tree.
        this.root = processData(this.givenArray, 0, this.givenArray.length - 1)
        // After tree is built update buildstatus value.
        this.buildStatus = true

        function processData(array, start, end) {
            // Iterate through all of the elements of the array and create the tree based on the array data. 
            if (start > end) {
                return null
            }
            // Find and store mid point so that we may reference it on recursive call.
            let mid = Math.floor((start + end) / 2)
            // Create the new node which will be the center of the start and mid points.
            let node = new treeNode(this.givenArray[mid])
            // Recursive iteration through array to build tree nodes and children.
            treeNode.leftChild = this.processData(this.givenArray. start, mid - 1)
            treeNode.rightChild = this.processData(this.givenArray, mid + 1, end)
            // Return the node with its children.
            return treeNode
        }
    }
    search(term) {
        // If the tree has not been built yet then return null
        if (this.root === null) {
            console.log('Oooops looks like the item was not found.')
            return null
        } else {
            recursiveSearchPattern(this.root)
        }
        // Recursive func for searching through BST.
        // Compares the search term and then iterates through the tree.
        function recursiveSearchPattern(node) {
            if (node.inputData === term) {
                return node
            } else if (term < node.inputData) {
                recursiveSearchPattern(node.leftChild)
            } else {
                recursiveSearchPattern(node.rightChild)
            }
        }
    }
    
    insert(term) {
        // Create an error condition in case the given data is not present or is not a number.
        if (term === null || term === undefined || isNaN(term) == true) {
            console.log('Given arg is not a number or was not given.... Try again.')
            return
        } else {
            // Recursively search for proper leaf and insert new value.
            compareAndInsert(this.root)
        }
        // Recursive function for insertion of new data elements in tree. 
        function compareAndInsert(node) {
            // if the given number is less then the node data and the node left child is not null continue to look for proper position.
            if (term < node.inputData && node.leftChild !== null) {
                compareAndInsert(node.leftChild)
            // if the given number is greater then the node data and the node right child is not null continue to look for proper position.
            } else if (term > node.inputData && node.rightChild !== null ) {
                compareAndInsert(node.rightChild)
            // if the given num is less and the node has no children insert.
            } else if (term < node.inputData && node.leftChild == null) {
                node.leftChild = new node(term)
            // if the given num is more and the node has no children insert.
            } else if (term > node.inputData && node.rightChild == null) {
                node.rightChild = new node(term)
            } else {
                console.log('Huh, not sure how we got here.... Fix the code bruh.')
                return
            }
        }
    }

    delete(term) {
        // Create an error condition in case the given data is not present or is not a number.
        if (term == null || term === undefined || isNaN(term) == true || this.buildStatus == false) {
            console.log('Given arg is not a number or was not given or the tree has not been built yet.... Try again.')
            return
        // Recursively check for the given search term. 
        } else if (term < this.root.inputData) {
            // If the search term is less then the roots inputData. Recursively traverse the right sub-tree.
            this.root.leftChild = this.delete(term)
        } else if (term > this.root.inputData) {
            // If the search term is greater then the roots inputData. Recursively traverse the left sub-tree. 
            this.root.rightChild = this.delete(term)
        }   else {
            let nodetoDelete 
            if ( this.root.rightChild == null) {

            }
        }

        function deleteTheNode(tree, term) {
            // if node to be removed has no children, this delete that thang.
            if (node.inputData == term && node.leftChild == null && node.rightChild == null) {
                
            } 
        }

        function searchForChild(term, node) {
            if (node.leftChild == term || node.right == term) {
                return node
            } else {
                searchForChild(term, node.rightChild)
                searchForChild(term, node.leftChild)
            }
        }
    }
}


// Arrays given as arguments may be un-sorted so lets sort them using mergeSort.
function mergeSort(providedArray) {
    // If the array is empty or consists of only one element return it.
    // We can't sort it obviously due to only one item or no data... 
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