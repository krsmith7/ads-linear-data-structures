class DLLNode {
  constructor({ element = undefined, next = this, prev = this, isSentinel = false }) {
    this.element = element;
    this.next = next;
    this.prev = prev;
    this._active = !isSentinel;
  }

  remove() {
    if (this._active) {
      this.prev.next = this.next;
      this.next.prev = this.prev;
      this._active = false;
      return this.element;
    }
  }
}

class DoublyLinkedList {
  constructor(Node = DLLNode) {
    this.Node = Node;
    this._sentinel = new this.Node({ isSentinel: true });
  }

  _head() {
    return this._sentinel.next;
  }

  _tail() {
    return this._sentinel.prev;
  }

  insertHead(element) {
    let newHead = new this.Node({element, next: this._head(), prev: this._sentinel});
    this._head().prev = newHead;
    this._sentinel.next = newHead;

    return newHead;
  }

  insertTail(element) {
    let newTail = new this.Node({element, next: this._sentinel, prev: this._tail()});
    this._tail().next = newTail;
    this._sentinel.prev = newTail;
    return newTail;
  }

  removeHead() {
    return this._head().remove();
  }

  removeTail() {
    return this._tail().remove();
  }

  remove(node) {
    if (node.remove) {
      return node.remove();
    }
    else {
      return undefined
    }
  }

  forEach(callback) {
     let currentNode = this._head();
     let index = 0;

     while (currentNode != this._sentinel) {

         callback(currentNode.element, index, this);

       currentNode = currentNode.next;
       index++;
     }
  }

  count() {
    let nodeCount = 0;
    this.forEach(() => nodeCount++);
    return nodeCount;
  }
}

export default DoublyLinkedList;
