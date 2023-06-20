// Build a Node class / factory. It should have an attribute for the data it stores as well as its left and right children.
class treeNode {
    constructor(inputData, leftChild = null, rightChild = null) {
        this.inputData = inputData
        this.leftChild
        this.rightChild
    }
    // Create a method that checks to see if the node has children. 
    hasChildren() {
        if  (!this.leftChild && !this.rightChild) {
            return false
        } else {
            return true
        }
    }

    // Methods for checking child status's
    hadRightChild() {
        if (!this.rightChild) {
            return false
        } else {
            return true
        }
    }
    hasLeftChild() {
        if (!this.leftChild) {
            return  false
        } else {
            return true
        }
    }

    // Create a method so a node can be deleted.
    deleteSelf() {
        this.inputData = null
        this.leftChild = null
        this.rightChild = null
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
        this.treeRoot = processData(this.givenArray, 0, this.givenArray.length - 1)
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
        if (this.treeRoot === null) {
            console.log('Oooops looks like the item was not found.')
            return null
        } else {
            recursiveSearchPattern(this.treeRoot)
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
            compareAndInsert(this.treeRoot)
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

    // Create a class method that will check to see if the valueToInspect is a leaf node.
    isLeafNode(valueToInspect) {
        let foundNode = this.search(valueToInspect)
        if (foundNode.rightChild == null && foundNode.leftChild == null) {
            return true
        } else {
            return false
        }
    }
    
    // Create a method that will traverse the left side of the bst for the min value. 
    findMinLeft(node = this.treeRoot) {
        // If the leftChild is not empty keep digging deeper. 
        if(node.leftChild !== null) {
            this.findMinLeft(node.leftChild)
        } else {
            // If the leftChild is null, then we have reached the end of the left tree. 
            // Return the value of this node because it's the min value that we have found. 
            return node.inputData
        }
    }
    // Do the same traversal for the right side of the the bst. 
    findMinRight(node = this.treeRoot) {
        if (node.rightChild !== null) {
            // We recursively search the leftChild because the lower values are always on the leftside of any tree and or sub-tree.
            this.findMinRight(node.leftChild)
        } else {
            return node.inputData
        }
    }
    
    // Create a class method that allows for the deletion of a node regardless of if it has a child or not.
    delete(term, node = this.treeRoot) {
        // Create an error condition in case the given data is not present or is not a number.
        if (term == null || term === undefined || isNaN(term) == true || this.buildStatus == false) {
            console.log('Given arg is not a number or was not given or the tree has not been built yet.... Try again.')
            return
        // Recursively check for the given search term. 
        } else if (term < node.inputData) {
            // If the search term is less then the roots inputData. Recursively traverse the right sub-tree.
            node.leftChild = this.delete(term)
        } else if (term > node.inputData) {
            // If the search term is greater then the roots inputData. Recursively traverse the left sub-tree. 
            node.rightChild = this.delete(term)
        } else {
            // if root has no children delete it.
            if (node.hasChildren() == false ) {
                // Delete the node. 
                node.deleteSelf()
                // Find the parent node of the one delete.
                parentNode = searchForChild(term)
                // Based on which child matchs the deleted note, set it to null.
                parentNode.rightChild == term ? parentNode.rightChild == null : parentNode.leftChild == null
            } else if (node.hadRightChild() == true && node.rightChild.hasChildren == false) {
                node = node.leftChild
            } else if (node.hasLeftChild() == true && node.leftChild.hasChildren() == false) {
                node = node.rightChild
            } else {
                // Node must have multiple children.
                minValue = this.findMinRight(node.rightChild)
                node.inputData = minValue
                // Delete the node with the minimum value from right. 
                node.rightChild = this.delete(minValue, node.rightChild)
            }
        }
        
        function deleteTheNode(node = this.treeRoot, term) {
            // if node to be removed has no children, this delete that thang.
            if (node.inputData == term && node.leftChild == null && node.rightChild == null) {
                
            } else if (node.inputData == term && node.leftChild !== null && node.rightChild == null) {
                // if the node has only one child then replace the node with the child.
                node.inputData = node.leftChild
            } else if (node.inputData == term && node.leftChild == null && node.rightChild !== null) {
                // if the node has only one child then replace the node with the child.
                
            }
        }
        
        function searchForChild(term, node = this.treeRoot) {
            if (node.leftChild == term || node.right == term) {
                return node
            } else {
                searchForChild(term, node.rightChild)
                searchForChild(term, node.leftChild)
            }
        }
        // Return the node at the end of everything. 
        return node
    }

    levelOrder(givenFunc, node = this.treeRoot) {
        // Error condition for if the node does not exist or a arg is given with no data. 
        if (!node) {
            // If the given node is empty them return and console log a message for the user.
            console.log('No node given, please provide some data to use.')
            return
        }
        // Create a queue to manage all of the level order calls on the functions.
        let orderQueue = []
        orderQueue.push(node.inputData)
        
        // While we have items in the queue, iterate through the logic.
        while (orderQueue.length > 0) {
            let currentNode = orderQueue.shift()
            console.log(currentNode.inputData)
            if (currentNode.leftChild) {
                orderQueue.push(currentNode.leftChild)
            }
            if (currentNode.rightChild) {
                orderQueue.push(rightChild)
            }
        }
        // For each item in the queue run the given function. 
        if (!givenFunc) {
            return
        } else {
            orderQueue.forEach(element => {
                givenFunc(element)
            })
        }
        // Return the orderQueue wether the func was run on it or not. 
        return orderQueue
    }

    // In order traversal works by traversing the left tree first, then visiting the root again, then traversing all nodes on the right side of the tree.
    inOrder(node = this.treeRoot, givenFunc) {
        // Init the queue for all the values to be run on the func.
        let inOrderQueue = []
        
        // Error condition if no data is found.
        if (!node) {
            console.log('Data not found in the given node.')
            return
        } else {
            // Create Recursive functions that traverses and places the data in the queue.
            (function processInOrder(node) {
                if (!node) {
                    return
                } else {
                    // Push the nodes data into the queue so that we can run funcs on it.
                    inOrderQueue.push(node.inputData)
                    // From the root traverse the left side of the BST.
                    processInOrder(node.leftChild)
                    // From the root traverse the right side of the BST. 
                    processInOrder(node.rightChild)
                }
            })(this.treeRoot)
            
            // Run the give function on the current node.
            if (!givenFunc) {
                return
            } else {
                inOrderQueue.forEach(element => {
                    element = givenFunc(element)
                })
            }
        }
        // Return the modified queue. 
        return inOrderQueue
    }

    // Create a method that traverses the BST in preOrder.
    preOrder(node = this.treeRoot, givenFunc) {
        let preOrderQueue = []
        if (!node) {
            return
        } else {
            preOrderQueue.push(node.inputData)
            (function processPreOrder(node) {
                if(!node) {
                    return
                } else {
                    // Add the data at the root of the tree to the queue 
                    preOrderQueue.push(node.inputData)

                    if (node.leftChild !== null) {
                        (function processLeftSub(node){
                            if (!node) {
                                return
                            } else {
                                preOrderQueue.push(node.inputData)
                                processLeftSub(node.leftChild)
                                processLeftSub(node.rightChild)
                            }
                        })(node.leftChild)
                    }
                    
                    if (node.rightChild !== null) {
                        (function processRightSub() {
                            if (!node) {
                                return
                            } else {
                                preOrderQueue.push(node.inputData)
                                processRightSub(node.leftChild)
                                processRightSub(node.rightChild)
                            }
                        })(node.rightChild)
                    }
                }
            })(this.treeRoot)

            // Run the function if it was given, on the preOrderQueue.
            if (!givenFunc) {
                return
            } else {
                preOrderQueue.forEach(element => {
                    element = givenFunc(element)
                })
            }
        }
        return preOrderQueue
    }

    postOrder(node = this.treeRoot, givenFunc) {
        let postOrderQueue = []
        if (!node) {
            return
        } else {
            // Traverse the left sub tree.
            (function processPostOrder(node) {
                // Add the left and right children to the queue.
                postOrderQueue.push(node.leftChild)
                postOrderQueue.push(node.rightChild)
                // Add the root node data to the queue. 
                postOrderQueue.push(node.inputData)
                // Recursively call the function on all other nodes. 
                processPostOrder(node.leftChild)
                processPostOrder(node.rightChild)
            })(this.treeRoot)
        }
        if (!givenFunc) {
            return
        } else {
            // Run the func on all of the array elements and update there values.
            postOrderQueue.forEach(element => {
                element = givenFunc(element)
            })
        }
        return postOrderQueue
    }
    // Create a method that takes a value and finds the node with matching data and returns the depth of the node.
    findDepth(givenValue) {
        // Initialize a counter.
        let counterVar = -1

        // Error condition if tree has not been built yet.
        if (!this.treeRoot) {
            console.log('Tree not built yet. Build the tree so you can find the height!')
            return
        } else {
            // Recursive IIFE for traversal and counting of height levels. 
            (function traverseTheTree(node = this.treeRoot) {
                if (node.inputData == givenValue) {
                    counterVar = 0
                    return
                } else {
                    // Increment counter and call the func again.
                    counterVar++
                    traverseTheTree(node.leftChild)
                    traverseTheTree(node.rightChild)
                }
            })()
        }
        // Return the counter value to the user. 
        return counterVar
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

// Create a function that allows for a visual representation of the BST to be logged in the console. 
function printMyTree(node, prefix = '', isLeft = true) {
    if (!node) {
        console.log('Hey my person, I think you forgot to put the node in the args, or the node does not exsist.')
        return
    }
    if (node.rightChild !== null) {
        printMyTree(node.rightChild, `${prefix}${isLeft ? "|   " : "    "}`, false)
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.inputData}`)
    if (node.leftChild !== null) {
        printMyTree(node.leftChild, `${prefix}${isLeft ? "    " : "|   "}`, true)
    }
}