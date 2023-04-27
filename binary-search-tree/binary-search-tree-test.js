
/*
A testing script to be loaded by index.html and used in a browser
*/

import {BST} from './binary-search-tree.js';
import deepClone from './deep-clone.js';

/* TESTING STUFF */

// Printing function from: https://www.theodinproject.com/lessons/javascript-binary-search-trees

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

/* Test create BST */
console.log('----- Test create BST');
const testArray1 = [9, 8, 7, 6, 3, 1, 0];

console.log(testArray1);

const testTree = new BST(testArray1);
prettyPrint(testTree.root);

const testArray2 = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
const testTree2 = new BST(testArray2);
prettyPrint(testTree2.root);

const testArray3 = [18, -6, 14, 33, 52, 4, 3, 17, 8, 40, 19, 20, 21, 22, 23];
const testTree3 = new BST(testArray3);
prettyPrint(testTree3.root);

/* Test BST.find(value) */
console.log('----- Test BST.find(value)');
console.log(testTree.find(7));
console.log(testTree.find(0));
console.log(testTree.find(-1));
console.log(testTree.find(6));

console.log(testTree3.find(18));
console.log(testTree3.find(33));
console.log(testTree3.find(40));
console.log(testTree3.find(52));
console.log(testTree3.find(8));
console.log(testTree3.find(-6));

/* Test BST.insert(value) */
console.log('----- Test BST.insert(value)');
let tt =  deepClone(testTree);
tt.insert(777);
prettyPrint(testTree.root);
prettyPrint(tt.root);

testTree.insert(-888);
prettyPrint(testTree.root);
prettyPrint(tt.root);


tt.insert(-1);
prettyPrint(tt.root);
tt.insert(-6);
prettyPrint(tt.root);
tt.insert(-5);
prettyPrint(tt.root);
tt.insert(4);
prettyPrint(tt.root);
tt.insert(2);
prettyPrint(tt.root);
prettyPrint(testTree.root);

/* Test BST.findMinVal() */
console.log(testTree.findMinVal());
console.log(tt.findMinVal());

/* Test BST.findMaxVal() */
console.log(testTree.findMaxVal());
console.log(tt.findMaxVal());

console.log(testTree.root.left.left.left.parent);

/* Test BST.delete(value) */

//smallest val
testTree.delete(-888);
prettyPrint(testTree.root);
//largest val
testTree.delete(9);
prettyPrint(testTree.root);
//Root with 2 children
testTree.delete(6);
prettyPrint(testTree.root);

tt = deepClone(testTree3);
prettyPrint(tt.root);


tt.insert(39);
tt.insert(37);
tt.insert(38);
tt.insert(34);
prettyPrint(tt.root);
tt.delete(23);
prettyPrint(tt.root);
tt.delete(39);
prettyPrint(tt.root);


/* Test BST.levelOrder(callback) */
console.log(tt.levelOrderBFS());
const logMe = (node) => {
    console.log(node.data);
}
tt.levelOrderBFS(logMe);

/* Test BST.inOrderDFS(callback) */
console.log(tt.inOrderDFS());
tt.inOrderDFS(logMe);

/* Test BST.preOrderDFS(callback) */
console.log(tt.preOrderDFS());
tt.preOrderDFS(logMe);

/* Test BST.postOrderDFS(callback) */
console.log(tt.postOrderDFS());
tt.postOrderDFS(logMe);

/* Test BST.height() */
prettyPrint(tt.root);
console.log(tt.height());

/* Test BST.depth() */
prettyPrint(tt.root);
let testNode = tt.find(19);
console.log('depth of:', testNode.data, ':', tt.depth(testNode));

testNode = tt.find(8);
console.log('depth of:', testNode.data, ':', tt.depth(testNode));

testNode = tt.find(-6);
console.log('depth of:', testNode.data, ':', tt.depth(testNode));

testNode = tt.find(52);
console.log('depth of:', testNode.data, ':', tt.depth(testNode));

testNode = tt.find(38);
console.log('depth of:', testNode.data, ':', tt.depth(testNode));

// testNode = tt.find(999);
// console.log('depth of:', testNode.data, ':', tt.depth(testNode));

/* Test BST.isBalanced() */
console.log(tt.isBalanced());
tt.insert(39);
prettyPrint(tt.root);
console.log(tt.isBalanced());

/* Test BST.rebalance() */
console.log(tt.inOrderDFS());
let newTree = tt.rebalance();
console.log(newTree);
prettyPrint(newTree.root);