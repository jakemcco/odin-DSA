import mergeSort from './merge-sort.js'

//Learning resource: https://github.com/mgechev/javascript-algorithms/blob/master/src/data-structures/binary-search-tree.js


/**
 * Basic Node class for use in binary search tree
 * 
 * @public
 * @constructor
 */
class BSTNode {
    constructor(data = null, left = null, right = null, parent = null){
        this.data = data;
        this.left = left;
        this.right = right;
        this.parent = parent;
    }
}

/**
 * This implementation of BST does not handle duplicates to reduce complexity of balancing etc...
 *
 * @public
 * @constructor
 */
class BST {
    constructor(sourceArray = []) {
        this.root = null;
        this.root = this.buildTree(sourceArray, 'recur');
        this.minNode = null;
        this.maxNode = null;
    }

    /**
     * Accepts an array (ordered or unordered)
     * Sorts array and removes duplicates
     * Returns the level-0 root node of the tree
     * 
     * @public
     * @param {Array} fromArray 
     * @param {String} approach
     * @returns {BSTNode|null}
     */
    buildTree(fromArray = [], approach = 'recur') {
        //Reject bad input
        if (fromArray.length <= 0) return null;

        //Clear any existing nodes tied to this tree
        if (this.root !== null) this.root = null;

        //Sort the array, returns sorted array
        const sortedArray = mergeSort(fromArray);

        //Remove duplicates, returns dupe-free array
        /*
        +++++++++++++++
        TODO------> implement duplicate pruning
        +++++++++++++++
        */
        //const dupeFreeArray = deleteDuplicates(sortedArray);
        const dupeFreeArray = sortedArray;

        //Function to build BST, either iteratively
        /*
        +++++++++++++++
        TODO------> implement duplicate pruning
        +++++++++++++++
        */
        const buildIter = (input) => {
            let root;
            return root;
        }

        //Function to build BST, recursively
        const buildRecur = (inArray, startIndex, endIndex, parentNode) => {
            //We've reached the either end of the array
            if (startIndex > endIndex) return null;

            //Get the new middle
            let middleIndex = Math.floor((startIndex + endIndex)/2);
        
            //Create a new root node with the value at this index
            let root = new BSTNode(inArray[middleIndex], null, null, parentNode);
            
            //Proceed dividing the array in half at each node until we hit the end
            root.left = buildRecur(inArray, startIndex, middleIndex - 1, root);
            root.right = buildRecur(inArray, middleIndex + 1, endIndex, root);

            //Returns the root node to be used by the call above it
            //The top-level call will have the reference to the 0-th level root node, which is the midpoint of the array
            return root;
        }

        //Func caller depending on options
        if(approach == 'iter') {
            return buildIter(dupeFreeArray, 0, dupeFreeArray.length - 1, null);
        }
        else if (approach == 'recur') {
            return buildRecur(dupeFreeArray, 0, dupeFreeArray.length - 1, null);
        }
        else {
            throw Error('Error with buildTree(approach) parameter, should be \'iter\' or \'recur\'');
        }
    }

    /**
     * Accepts a value to insert into the tree
     * Checks for duplicates before inserting
     * 
     * @public
     * @param {Number|String} value
     */
    insert(value) {
        let currentNode = this.root;

        //In case the BST is empty, this will be the new root
        if (currentNode === null) {
            this.root = new BSTNode(value, null, null, null);
            return;
        }

        while(true) {
            if (value == currentNode.data) {
                return;
            }

            //proceed down left side
            if (value < currentNode.data) {
                if (currentNode.left) {
                    currentNode = currentNode.left;
                }
                else {
                    currentNode.left = new BSTNode(value, null, null, currentNode);
                    return;
                }
            }
            //must be greater than, proceed down right side
            else {
                if (currentNode.right) {
                    currentNode = currentNode.right;
                }
                else {
                    currentNode.right = new BSTNode(value, null, null, currentNode);
                    return;
                }
            }
        }
    }

    /**
     * Accepts a value to delete from the tree if it exists
     * Since the tree holds no duplicates we don't need to support multi-element deletion
     * If delete is successful, returns true, otherwise false
     * 
     * @public
     * @param {Number|String} value
     * @return {Boolean}
     */
    delete(value) {
        let targetNode = this.find(value);
        //Exit if we couldn't find the value
        if (targetNode === null) return false;

        //Are we the root node?
        //When we're the root node there's an edge case for the parent being null, otherwise there's only one parent, so straightforward

        //How many children does this node have?
        //When we have 0 we're a leaf, easy, just remove parent's child
        //1 child that's straightforward too, just link parent with its grandchild
        //When we have 2 children we need to ensure that the BST remains valid
            //Find minimum of the right subtree, a subtree minimum by necessity must be a leaf with no left child (since there's no lesser value)
            //There may be a right child though
            //Alternatively we can find max of left subtree

        //If we call recursively, we can maintain a link to the parent node's correct child slot (left/right)
        //Otherwise we need to test to make sure we're linking to the parent's correct child slot

        //Test for number of children

        //0 children
        if (targetNode.right === null && targetNode.left === null) {
            this.replaceChild(targetNode.parent, targetNode, null);
        }
        //One child on the right
        if (targetNode.left === null) {
            this.replaceChild(targetNode.parent, targetNode, targetNode.right);
        }
        //One child on the left
        else if (targetNode.right === null) {
            this.replaceChild(targetNode.parent, targetNode, targetNode.left);
        }
        //Must be two children
        else {
            //Search for min element of right subtree
            let minNode = this._findMinValNode(targetNode.right);
            //Replace value in this node with that of the min
            targetNode.data = minNode.data;
            this.replaceChild(minNode.parent, minNode, minNode.right);//Right of midnode could be null or have a subtree itself
        }
        return true;
    }

    /**
     * Changes a given node's child to a new one
     * 
     * @private
     */
    replaceChild(parentNode, childToBeReplaced, newChild) {
        if (parentNode === null) {
            //we're the root of the BST
            this.root = newChild;
            if (newChild){
                newChild.parent = null;
            }
        }
        else {
            if (childToBeReplaced === parentNode.left) {
                parentNode.left = newChild;
            }
            else {
                parentNode.right = newChild;
            }
            if (newChild){
                newChild.parent = parentNode;
            }
        }
    }


    /**
     * Finds the node with the given value if it exists
     * Since the tree holds no duplicates we don't need to support multi-element find
     * If tree is balanced it should be O(log n)
     * 
     * @public
     * @param {Number|String} value 
     * @returns {BSTNode}
     */
    find(value) {
        let currentNode = this.root;

        while(currentNode){
            if (value == currentNode.data) {
                break;
            }
            else if (value < currentNode.data) {
                currentNode = currentNode.left;
            }
            else {
                currentNode = currentNode.right;
            }
        }
        
        return currentNode;                
    }

    /**
     * Internal function to find node with minimum value of any balanced BST subtree given a starting root node
     * 
     * @private 
     * @param {BSTNode} root 
     * @returns {BSTNode}
     */
    _findMinValNode(root){
        while(root.left) {
            root = root.left;
        }
        return root;
    }

    /**
     * External function to find the min value of the entire BST
     * 
     * @public
     * @returns {Number|String} 
     */
    findMinVal(){
        return this._findMinValNode(this.root).data;
    }

    /**
     * Internal function to find node with maximum value of any balanced BST subtree given a starting root node
     * 
     * @private
     * @param {BSTNode} root 
     * @returns {BSTNode}
     */
    _findMaxValNode(root) {
        while(root.right) {
            root = root.right;
        }
        return root;
    }

    /**
     * External function to find the min value of the entire BST
     * 
     * @public
     * @returns {Number|String}
     */
    findMaxVal() {
        return this._findMaxValNode(this.root).data;
    }

    /**
     * BFS Level-order traversal of the BST starting from the supplied root node
     * 
     * @private
     * @param {BSTNode} root Root node from which to begin the BFS traversal
     * @param {Function} callback Callback function to be executed for each node
     */
    _levelOrderBFS(root, callback) {
        //Initialize queue
        let q = [];
        if (!root) {
            return;
        }
        else {
            q.push(root);
   
            while (q.length != 0){
                let tmp = q.shift(); //Dequeue node
                callback(tmp);
                if (tmp.left) {
                    q.push(tmp.left);
                }
                if (tmp.right) {
                    q.push(tmp.right);
                }
            }
        }
    }


    /**
     * BFS Level-order traversal of the entire BST starting with the BST root
     * 
     * @public
     * @param {Function} callback Callback to be called for each node we traverse
     */
    levelOrderBFS(callback) {
        if (!this.root) throw Error('No nodes in BST');
        //Default behavior if no callback function provided to return an array of values in level-order
        if (typeof callback !== 'function') {
            console.log('NOT A FUNCTION');
            let output = [];
            const internalCB = (node) => {
                output.push(node.data);
            }
            this._levelOrderBFS(this.root, internalCB);
            return output;
        }
        else {
            return this._levelOrderBFS(this.root, callback);
        }
    }

    /**
     * In-order traversal of BST starting from the current node
     * 
     * @private
     * @param {BSTNode} currentNode 
     * @param {Function} callback Callback function to be called on each node
     */
    _inOrderDFS(currentNode, callback) {
        if (!currentNode) {
            return;
        }
        this._inOrderDFS(currentNode.left, callback);
        callback(currentNode);
        this._inOrderDFS(currentNode.right, callback);
    }

    /**
     * In-order traversal of the entire BST
     * 
     * @public
     * @param {Function} callback Callback to be called for each node we traverse
     */

    inOrderDFS(callback) {
        if (!this.root) throw Error('No nodes in BST');
        //Default behavior if no callback function provided to return an array of values in level-order
        if (typeof callback !== 'function') {
            console.log('NOT A FUNCTION');
            let output = [];
            const defaultCB = (node) => {
                output.push(node.data);
            };
            this._inOrderDFS(this.root, defaultCB);
            return output;
        }
        else {
            return this._inOrderDFS(this.root, callback);
        }
    }

    /**
     * Pre-order traversal of BST starting from the current node
     * 
     * @private
     * @param {BSTNode} currentNode 
     * @param {Function} callback Callback function to be called on each node
     */
    _preOrderDFS(currentNode, callback) {
        if (!currentNode) {
            return;
        }
        callback(currentNode);
        this._preOrderDFS(currentNode.left, callback);
        this._preOrderDFS(currentNode.right, callback);
    }
    

    /**
     * Pre-order traversal of the entire BST
     * 
     * @param {Function} callback Callback function to be called on each node
     */
    preOrderDFS(callback) {
        if (!this.root) throw Error('No nodes in BST');
        //Default behavior if no callback function provided to return an array of values in level-order
        if (typeof callback !== 'function') {
            console.log('NOT A FUNCTION');
            let output = [];
            const defaultCB = (node) => {
                output.push(node.data);
            };
            this._preOrderDFS(this.root, defaultCB);
            return output;
        }
        else {
            return this._preOrderDFS(this.root, callback);
        }
    }

    /**
     * Post-order traversal of BST starting from the current node
     * 
     * @private
     * @param {BSTNode} currentNode 
     * @param {Function} callback Callback function to be called on each node
     * @returns
     */
    _postOrderDFS(currentNode, callback) {
        if (!currentNode) {
            return;
        }
        this._postOrderDFS(currentNode.left, callback);
        this._postOrderDFS(currentNode.right, callback);
        callback(currentNode);
    }

    /**
     * Post-order traversal of the entire BST
     * 
     * @public
     * @param {Function} callback Callback function to be called on each node
     * @returns 
     */
    postOrderDFS(callback) {
        if (!this.root) throw Error('No nodes in BST');
        //Default behavior if no callback function provided to return an array of values in level-order
        if (typeof callback !== 'function') {
            console.log('NOT A FUNCTION');
            let output = [];
            const defaultCB = (node) => {
                output.push(node.data);
            };
            this._postOrderDFS(this.root, defaultCB);
            return output;
        }
        else {
            return this._postOrderDFS(this.root, callback);
        }
    }

    /**
     * Height of the given node (number of edges between the node and
     * the furthest leaf along the longest subtree path)
     * 
     * @private
     * @param {BSTNode} node
     * @returns {Number}
     */
    _height(node) {
        if (!node){
            return -1;
        }
        else {
            let leftHeight = 1 + this._height(node.left);
            let rightHeight = 1 + this._height(node.right);
            let nodeHeight = Math.max(leftHeight, rightHeight);

            console.log(node.data, nodeHeight);    
            return nodeHeight;
        }
    }

    /**
     * Height of the entire BST
     * Number of edges between root node and leaf along the longest path)
     * 
     * @public
     * @returns {Number}
     */
    height() {
        return this._height(this.root);
    }


    /**
     * Calculates the number of edges between the BST root node and the supplied node
     * 
     * @private
     * @param {BSTNode} node 
     * @returns {Number}
     */
    _depth(node) {
        if (!this.root){
            throw Error ('Empty BST, no root');
        }
        if (!node) {
            throw Error ('Invalid node');
        }

        let edgeCount = 0;
        let currentNode = node;
        //Escape condition triggers when we're at the root since root.parent === null
        while (currentNode.parent) {
            edgeCount ++;
            currentNode = currentNode.parent;
        }
        return edgeCount;
    }

    /**
     * Depth of the requested Node
     * Number of edges between the node and the root of the BST
     * 
     * @public
     * @param {BSTNode} requestedNode
     * @returns 
     */
    depth(requestedNode) {
        return this._depth(requestedNode);
    }

    /**
     * Checks if the subtrees of the given root node are balanced
     * A balanced tree is one where for every node, the difference
     * in heights of the left and right subtrees is <=1
     * 
     * @private
     * @param {BST} root
     * @returns {Boolean}
     */
    _isBalanced(root) {
        if (!root) {
            return true;
        }

        let leftHeight = this._height(root.left);
        let rightHeight = this._height(root.right);
        let diff = Math.abs(leftHeight - rightHeight)//Handles the case where calling height on null returns -1;

        if (diff <= 1) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Checks if entire BST is balanced
     * A balanced tree is one where for every node, the difference
     * in heights of the left and right subtrees is <=1
     * 
     * @public
     * @returns {Boolean}
     */
    isBalanced() {
        //Note: will return true for an empty BST
        return this._isBalanced(this.root);
    }


    /**
     * Rebalances the subtrees of the provided node
     * 
     * @private
     * @param {BSTNode} node 
     */
    _rebalance(root) {
        //In-order traversal --> sorted array
        const tmp = [];
        const buildArray = (node) => {
            tmp.push(node.data);
        }
        //Array-to-bst
        this._inOrderDFS(root, buildArray);
        console.log(tmp);

        return new BST(tmp);
    }

    /**
     * Rebalances the entire BST
     * 
     * 
     */
    rebalance() {
        if (!this.root){
            throw Error ('BST is empty, no root node');
        }
        else {
            return this._rebalance(this.root);
        }
    }
}

export {BST}