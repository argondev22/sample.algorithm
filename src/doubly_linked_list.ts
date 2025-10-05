/**
 * 双方向連結リスト（Doubly Linked List）
 * head -> node1 <-> node2 <-> node3 <- tail
 */

/**
 * 双方向連結リストのノードクラス
 */
class DoublyListNode {
  constructor(
    public value: number,
    public prev: DoublyListNode | null = null,
    public next: DoublyListNode | null = null
  ) {}
}

/**
 * 双方向連結リストクラス
 */
class DoublyLinkedList {
  private head: DoublyListNode | null = null;
  private tail: DoublyListNode | null = null;
  private size: number = 0;

  /**
   * リストの先頭に要素を追加
   */
  prepend(value: number): void {
    const newNode = new DoublyListNode(value, null, this.head);

    if (this.head) {
      this.head.prev = newNode;
    } else {
      // 空のリストの場合、tailも設定
      this.tail = newNode;
    }

    this.head = newNode;
    this.size++;
  }

  /**
   * リストの末尾に要素を追加
   */
  append(value: number): void {
    const newNode = new DoublyListNode(value, this.tail, null);

    if (this.tail) {
      this.tail.next = newNode;
    } else {
      // 空のリストの場合、headも設定
      this.head = newNode;
    }

    this.tail = newNode;
    this.size++;
  }

  /**
   * 指定された位置に要素を挿入
   */
  insertAt(value: number, index: number): boolean {
    if (index < 0 || index > this.size) {
      return false;
    }

    if (index === 0) {
      this.prepend(value);
      return true;
    }

    if (index === this.size) {
      this.append(value);
      return true;
    }

    // 挿入位置のノードを見つける
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current!.next;
    }

    const newNode = new DoublyListNode(value, current!.prev, current);
    current!.prev!.next = newNode;
    current!.prev = newNode;
    this.size++;
    return true;
  }

  /**
   * 指定された位置の要素を削除
   */
  removeAt(index: number): number | null {
    if (index < 0 || index >= this.size) {
      return null;
    }

    let value: number;

    if (this.size === 1) {
      // 要素が1つだけの場合
      value = this.head!.value;
      this.head = null;
      this.tail = null;
    } else if (index === 0) {
      // 先頭要素を削除
      value = this.head!.value;
      this.head = this.head!.next;
      this.head!.prev = null;
    } else if (index === this.size - 1) {
      // 末尾要素を削除
      value = this.tail!.value;
      this.tail = this.tail!.prev;
      this.tail!.next = null;
    } else {
      // 中間要素を削除
      let current = this.head;
      for (let i = 0; i < index; i++) {
        current = current!.next;
      }
      value = current!.value;
      current!.prev!.next = current!.next;
      current!.next!.prev = current!.prev;
    }

    this.size--;
    return value;
  }

  /**
   * 指定された値を持つ要素を削除
   */
  remove(value: number): boolean {
    let current = this.head;

    while (current) {
      if (current.value === value) {
        if (this.size === 1) {
          // 要素が1つだけの場合
          this.head = null;
          this.tail = null;
        } else if (current === this.head) {
          // 先頭要素を削除
          this.head = current.next;
          this.head!.prev = null;
        } else if (current === this.tail) {
          // 末尾要素を削除
          this.tail = current.prev;
          this.tail!.next = null;
        } else {
          // 中間要素を削除
          current.prev!.next = current.next;
          current.next!.prev = current.prev;
        }
        this.size--;
        return true;
      }
      current = current.next;
    }

    return false;
  }

  /**
   * 指定された値を持つ要素を検索
   */
  find(value: number): number {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.value === value) {
        return index;
      }
      current = current.next;
      index++;
    }

    return -1;
  }

  /**
   * 指定された位置の要素を取得
   */
  get(index: number): number | null {
    if (index < 0 || index >= this.size) {
      return null;
    }

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current!.next;
    }

    return current!.value;
  }

  /**
   * リストのサイズを取得
   */
  getSize(): number {
    return this.size;
  }

  /**
   * リストが空かどうかを確認
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * リストの内容を配列として取得（先頭から）
   */
  toArray(): number[] {
    const result: number[] = [];
    let current = this.head;

    while (current) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  }

  /**
   * リストの内容を配列として取得（末尾から）
   */
  toArrayReverse(): number[] {
    const result: number[] = [];
    let current = this.tail;

    while (current) {
      result.push(current.value);
      current = current.prev;
    }

    return result;
  }

  /**
   * リストの内容を文字列として表示（先頭から）
   */
  toString(): string {
    return this.toArray().join(' <-> ') + ' -> null';
  }

  /**
   * リストの内容を文字列として表示（末尾から）
   */
  toStringReverse(): string {
    return this.toArrayReverse().join(' <-> ') + ' -> null';
  }

  /**
   * リストを逆順にする
   */
  reverse(): void {
    let current = this.head;
    this.head = this.tail;
    this.tail = current;

    while (current) {
      const next = current.next;
      current.next = current.prev;
      current.prev = next;
      current = next;
    }
  }

  /**
   * 先頭要素を取得
   */
  getHead(): number | null {
    return this.head ? this.head.value : null;
  }

  /**
   * 末尾要素を取得
   */
  getTail(): number | null {
    return this.tail ? this.tail.value : null;
  }
}

// 使用例とテスト
function main(): void {
  console.log('=== 双方向連結リストのデモ ===\n');

  const list = new DoublyLinkedList();

  // 要素を追加
  console.log('1. 要素を追加:');
  list.append(1);
  list.append(2);
  list.append(3);
  list.prepend(0);
  console.log(`リスト（先頭から）: ${list.toString()}`);
  console.log(`リスト（末尾から）: ${list.toStringReverse()}`);
  console.log(`サイズ: ${list.getSize()}`);
  console.log(`先頭: ${list.getHead()}, 末尾: ${list.getTail()}\n`);

  // 指定位置に挿入
  console.log('2. 位置1に要素10を挿入:');
  list.insertAt(10, 1);
  console.log(`リスト: ${list.toString()}\n`);

  // 要素を検索
  console.log('3. 要素の検索:');
  console.log(`値2の位置: ${list.find(2)}`);
  console.log(`値5の位置: ${list.find(5)} (見つからない)\n`);

  // 要素を取得
  console.log('4. 位置2の要素を取得:');
  console.log(`位置2の値: ${list.get(2)}\n`);

  // 要素を削除
  console.log('5. 要素を削除:');
  console.log(`位置1の要素を削除: ${list.removeAt(1)}`);
  console.log(`リスト: ${list.toString()}`);
  console.log(`値3を削除: ${list.remove(3)}`);
  console.log(`リスト: ${list.toString()}\n`);

  // 逆順にする
  console.log('6. リストを逆順にする:');
  list.reverse();
  console.log(`逆順（先頭から）: ${list.toString()}`);
  console.log(`逆順（末尾から）: ${list.toStringReverse()}\n`);

  // 配列として取得
  console.log('7. 配列として取得:');
  console.log(`配列（先頭から）: [${list.toArray().join(', ')}]`);
  console.log(`配列（末尾から）: [${list.toArrayReverse().join(', ')}]`);
}

// デモを実行
main();
