class BinarySearchTree {
 constructor(key = null, value = null, parent = null) {
     this.key = key;
     this.value = value;
     this.parent = parent;
     this.left = null;
     this.right = null;
 }
 insert(key, value) {
  // If the tree is empty then this key being inserted is the root node of the tree
  if (this.key == null) {
      this.key = key;
      this.value = value;
  }

  /* If the tree already exists, then start at the root, 
     and compare it to the key you want to insert.
     If the new key is less than the node's key 
     then the new node needs to live in the left-hand branch */
  else if (key < this.key) {
   //console.log(key, this.key)
      /* If the existing node does not have a left child, 
         meaning that if the `left` pointer is empty, 
         then we can just instantiate and insert the new node 
         as the left child of that node, passing `this` as the parent */
      if (this.left == null) {
          this.left = new BinarySearchTree(key, value, this);
      }
      /* If the node has an existing left child, 
         then we recursively call the `insert` method 
         so the node is added further down the tree */
      else {
          this.left.insert(key, value);
      }
  }
  // Similarly, if the new key is greater than the node's key 
    // then you do the same thing, but on the right-hand side */
  else {
      if (this.right == null) {
          this.right = new BinarySearchTree(key, value, this);
      }
      else {
          this.right.insert(key, value);
      }
  }
}
find(key) {
 // If the item is found at the root then return that value
 if (this.key == key) {
     return this.value;
 }
 /* If the item you are looking for is less than the root 
    then follow the left child.
    If there is an existing left child, 
    then recursively check its left and/or right child
    until you find the item */
 else if (key < this.key && this.left) {
     return this.left.find(key);
 }
 /* If the item you are looking for is greater than the root 
    then follow the right child.
    If there is an existing right child, 
    then recursively check its left and/or right child
    until you find the item */
 else if (key > this.key && this.right) {
     return this.right.find(key);
 }
 // You have searched the tree and the item is not in the tree
 else {
     throw new Error('Key Error');
 }
}
remove(key) {
 if (this.key == key) {
     if (this.left && this.right) {
         const successor = this.right._findMin();
         this.key = successor.key;
         this.value = successor.value;
         successor.remove(successor.key);
     }
     /* If the node only has a left child, 
        then you replace the node with its left child */
     else if (this.left) {
      console.log('recursive left call')
         this._replaceWith(this.left);
     }
     /* And similarly if the node only has a right child 
        then you replace it with its right child */
     else if (this.right) {
      console.log('recursive right call')
         this._replaceWith(this.right);
     }
     /* If the node has no children then
        simply remove it and any references to it 
        by calling "this._replaceWith(null)" */
     else {
         this._replaceWith(null);
     }
 }
 else if (key < this.key && this.left) {
     this.left.remove(key);
 }
 else if (key > this.key && this.right) {
     this.right.remove(key);
 }
 else {
     throw new Error('Key Error');
 }
}
_replaceWith(node) {
 if (this.parent) {
 // console.log('this',this)
     if (this == this.parent.left) {
         this.parent.left = node;
     }
     else if (this == this.parent.right) {
         this.parent.right = node;
     }

     if (node) {
         node.parent = this.parent;
     }
 }
 else {
     if (node) {
         this.key = node.key;
         this.value = node.value;
         this.left = node.left;
         this.right = node.right;
     }
     else {
         this.key = null;
         this.value = null;
         this.left = null;
         this.right = null;
     }
 }
}

_findMin() {
 if (!this.left) {
     return this;
 }
 return this.left._findMin();
}
}


//4. It joins values (left to right) of the tree nodes separated by zeros 0 
// If you had nodes 3,1,4,6 --> with values carrot, potato,orange, lime 
// it would result in potato,carrot,orange, lime
// runtime = O(n) as it must execute on all of them 

//5. Height of BST 
// Height is longest path 
// find (largest nodes) - 1 = edges. 

function main(){
 function tree(t){
  if(!t){
      return 0;
  }
  return tree(t.left) + t.value + tree(t.right)
}

 let BT = new BinarySearchTree
 BT.insert(3)
 BT.insert(2)
 BT.insert(1)
 BT.insert(5)
 BT.insert(0)
 BT.insert(6)
 BT.insert(7)
 BT.insert(8)


 //console.log(tree(BT))

let leftCount = 0
let rightCount = 0
let count = 0
 function findHeight(T){
 
  if (!T){
   if (leftCount > rightCount){
    return leftCount 
   } else {
    return rightCount
   }
  }
 
  if(T.right !== null && T.left !== null){
    findHeight(T.right) 
    rightCount ++
    findHeight(T.left)
    leftCount ++ 
   } else if (T.left !== null) {
   findHeight(T.left)
   leftCount ++ 
  } else if (T.right !== null) {
   findHeight(T.right)
   rightCount ++
  }
 
  if (leftCount > rightCount){
   return leftCount 
  } else {
   return rightCount
  }
  
 }
 //console.log(findHeight(BT))
 //console.log(BT)

// 6. BST checker 
let badBST = [5,1,4,null,null,3,6] // assume 1st root = 5,1L,4R,nullL,nullR,3L,6R
let goodBST = [2,1,3]

function isBST(nodes){

for (let i=1;i<nodes.length;i++){
 if (i % 2 === 0){ // meaning 1%2 no so 5 < 1 

    if (nodes[0] > nodes[i]){
     return false
    } 
 } else {

  if(nodes[0] < nodes[i]){ // if 5 is less than 1,4,null,null,3,6 - one 
   return false
  }
 } 
}
return true

}
//console.log(isBST(goodBST))

//7. 3rd Largest Node 
let results = []
function whatIs3rdLargest(T){

 results.push(T.key)

 if (T === null){
  return 
 }
 if (T.right !== null && T.left !== null){ // ROOT START 
  whatIs3rdLargest(T.right)
  whatIs3rdLargest(T.left)
 }
 else if (T.left !== null) { // LEFT SIDE 

  return whatIs3rdLargest(T.left)

 } else if (T.right !== null){ // RIGHT SIDE

  return whatIs3rdLargest(T.right)

 }
 return results.sort().reverse()[2]
}

//console.log(whatIs3rdLargest(BT))

// 8. Balanced BST 
let leftH = 0
let rightH = 0
function isBalanced(T){

if (T === null){
 return 
}
if (T.right !== null && T.left !== null){
 leftH++ 
 rightH++
 isBalanced(T.right)
 isBalanced(T.left)
} else if (T.left !== null){
 leftH++
 isBalanced(T.left)
} else if (T.right !== null){
 rightH++
 isBalanced(T.right)
}
if (Math.abs(leftH - rightH) === 1 || Math.abs(leftH - rightH) === 0){
 return true
} else {
return false
}
}
//console.log(isBalanced(BT))


//9. Same BSTs  --- R L R 

let left = []
let leftR = []
let left2 = []
let right =[]
let right2=[]

function isSame(T1,T2){
 let index = 0
 let indexR = 0
if(T1.length !== T2.length){ // SAME SIZE? 
 return false
}
for (let i=1; i<T1.length;i++){ 
 if(T1[0] < T1[i]){
  right.push(T1[i]) 
  if (right.length > 3){
   indexR ++ 
  }
 } else {
  left.push(T1[i])
  if (left.length > 3){
   index ++ 
  }
 }
 if(T2[0] > T2[i]){
  left2.push(T2[i])
 } else {
  right2.push(T2[i])
 }
}
console.log(indexR)
console.log(left,left2,right,right2)
if(left[0] !== left2[0] || right[0] !== right2[0]){ // IF FIRST CHILD NOT SAME 
 return false
} else if (left.length !== left2.length || right.length !== right2.length){ // IF BRANCHES DIFFER IN LENGTH
return false
} 
if (index > 0 ){

 console.log('left',index)
  // IF LEFT SIDE HAS MORE THAN 3 - 2nd NODE MUST BE SAME
  for (let l=0;l<index;l++){
  console.log(l)
   if (left[l] !== left2[l]){
    
    return false
   }
  }
} else if (indexR > 0) {
  // IF RIGHT SIDE HAS MORE THAN 3 - 2ND,3RD,4TH etc NODE MUST BE SAME

  for (let r=0;r<indexR;r++){


   if (right[r] !== right2[r]){
    return false
   }
  }
}

return true
 
 }
 let BTree1r = [3,5,4,6,1,0,2,7]
 let BTree2r = [3,1,5,2,4,6,0,7]
 // TRUE 
 let B = [1,2,3,4,5,6]
 let B2 = [1,2,4,3,5,6]
 // FALSE
 let b10 = [10,5,2,4,6,1,0,11]
 let b102 = [10,5,2,4,1,6,0,11]
 // TRUE
 let treeArray = [1,0,2,3,4]
 let tree2Array = [1,0,2,4,3]
 // FALSE 
 console.log(isSame(BTree1r,BTree2r))






}
main()