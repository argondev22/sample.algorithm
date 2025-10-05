/**
 * 連結リスト
 */

/**
 * 連結リストのノードクラス
 */
class ListNode {
  constructor(public value: number, public next: ListNode | null = null) {}
}

/**
 * 簡易的な連結リストクラス
 */
class LinkedList {
  private head: ListNode | null = null;
  private size: number = 0;

  /**
   * リストの先頭に要素を追加
   */
  prepend(value: number): void {
    const newNode = new ListNode(value, this.head);
    this.head = newNode;
    this.size++;
  }

  /**
   * リストの末尾に要素を追加
   */
  append(value: number): void {
    const newNode = new ListNode(value);

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
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

    const newNode = new ListNode(value);
    let current = this.head;

    for (let i = 0; i < index - 1; i++) {
      current = current!.next;
    }

    newNode.next = current!.next;
    current!.next = newNode;
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

    if (index === 0) {
      value = this.head!.value;
      this.head = this.head!.next;
    } else {
      let current = this.head;
      for (let i = 0; i < index - 1; i++) {
        current = current!.next;
      }
      value = current!.next!.value;
      current!.next = current!.next!.next;
    }

    this.size--;
    return value;
  }

  /**
   * 指定された値を持つ要素を削除
   */
  remove(value: number): boolean {
    if (!this.head) {
      return false;
    }

    if (this.head.value === value) {
      this.head = this.head.next;
      this.size--;
      return true;
    }

    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }

    if (current.next) {
      current.next = current.next.next;
      this.size--;
      return true;
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
   * リストの内容を配列として取得
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
   * リストの内容を文字列として表示
   */
  toString(): string {
    return this.toArray().join(' -> ') + ' -> null';
  }

  /**
   * リストを逆順にする
   */
  reverse(): void {
    let prev: ListNode | null = null;
    let current = this.head;

    while (current) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    this.head = prev;
  }
}

// 使用例とテスト
function main(): void {
  console.log('=== 連結リストのデモ ===\n');

  const list = new LinkedList();

  // 要素を追加
  console.log('1. 要素を追加:');
  list.append(1);
  list.append(2);
  list.append(3);
  list.prepend(0);
  console.log(`リスト: ${list.toString()}`);
  console.log(`サイズ: ${list.getSize()}\n`);

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
  console.log(`逆順: ${list.toString()}\n`);

  // 配列として取得
  console.log('7. 配列として取得:');
  console.log(`配列: [${list.toArray().join(', ')}]`);
}

// デモを実行
main();
