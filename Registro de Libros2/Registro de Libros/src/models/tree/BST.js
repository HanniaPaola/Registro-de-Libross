import Node from './Node.js';

class BST {
    #root

    constructor() {
        this.#root = null;
    }

    add(value) {
        if (this.#root === null){
            this.#root = new Node(value);
            return this.#root !== null;
        } else {
            return this.insertNode(this.#root, value);
        }
    }

    insertNode(node, value) {
        if (value.titulo < node.value.titulo) {
            if (node.left === null) {
                node.left = new Node(value);
                return node.left !== null;
            } else {
                return this.insertNode(node.left, value);
            }
        } else {
            if (node.right === null) {
                node.right = new Node(value);
                return node.right !== null;
            } else {
                return this.insertNode(node.right, value);
            }
        }
    }

    search(autor) {
        return this.searchNode(this.#root, autor);
    }

    searchNode(node, autor) {
        if (node === null || node.value.autor === autor) {
            return node;
        } else if (autor < node.value.autor) {
            return this.searchNode(node.left, autor);
        } else {
            return this.searchNode(node.right, autor);
        }
    }

    searchById(id) {
        return this.searchNodeById(this.#root, id);
    }

    searchNodeById(node, id) {
        if (node === null || node.value.id === id) {
            return node;
        } else {
            let foundNode = this.searchNodeById(node.left, id);
            if (foundNode === null) {
                foundNode = this.searchNodeById(node.right, id);
            }
            return foundNode;
        }
    }

    findMin() {
        return this.findMinNode(this.#root);
    }

    findMinNode(node) {
        if (node.left === null) {
            return node;
        } else {
            return this.findMinNode(node.left);
        }
    }

    findMax() {
        return this.findMaxNode(this.#root);
    }

    findMaxNode(node) {
        if (node.right === null) {
            return node;
        } else {
            return this.findMaxNode(node.right);
        }
    }

    traverseInOrder(callback) {
        this.inOrderTraversal(this.#root, callback);
    }

    inOrderTraversal(node, callback) {
        if (node !== null) {
            this.inOrderTraversal(node.left, callback);
            callback(node.value);
            this.inOrderTraversal(node.right, callback);
        }
    }
}

export default BST;
