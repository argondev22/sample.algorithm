/**
 * ハイブリッド連結リスト（Hybrid Linked List）
 * head -> node1 -> node2 -> node3 <- tail
 *
 * リファレンス: 令和07年 【春期】【秋期】 応用情報技術者 合格教本 p.77
 */

/**
 * ハイブリッド連結リストのノードクラス
 */
class HybridListNode {
  constructor(
    public value: number,
    public next: HybridListNode | null = null
  ) {}
}

/**
 * ハイブリッド連結リストクラス
 */
class HybridLinkedList {
  private head: HybridListNode | null = null;
  private tail: HybridListNode | null = null;
  private size: number = 0;

  /**
   * リストの先頭に要素を追加
   */
  prepend(value: number): void {
    const newNode = new HybridListNode(value, this.head);

    if (!this.head) {
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
    const newNode = new HybridListNode(value);

    if (!this.head) {
      // 空のリストの場合、headも設定
      this.head = newNode;
    } else {
      // 現在のtailのnextを新しいノードに設定
      this.tail!.next = newNode;
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

    // 挿入位置の前のノードを見つける
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current!.next;
    }

    const newNode = new HybridListNode(value, current!.next);
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

    if (this.size === 1) {
      // 要素が1つだけの場合
      value = this.head!.value;
      this.head = null;
      this.tail = null;
    } else if (index === 0) {
      // 先頭要素を削除
      value = this.head!.value;
      this.head = this.head!.next;
    } else {
      // 中間要素または末尾要素を削除
      let current = this.head;
      for (let i = 0; i < index - 1; i++) {
        current = current!.next;
      }

      value = current!.next!.value;
      current!.next = current!.next!.next;

      // 削除された要素が末尾だった場合、tailを更新
      if (index === this.size - 1) {
        this.tail = current;
      }
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
      // 先頭要素を削除
      this.head = this.head.next;
      if (this.size === 1) {
        this.tail = null;
      }
      this.size--;
      return true;
    }

    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }

    if (current.next) {
      current.next = current.next.next;
      // 削除された要素が末尾だった場合、tailを更新
      if (current.next === null) {
        this.tail = current;
      }
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
    let prev: HybridListNode | null = null;
    let current = this.head;

    // headとtailを入れ替え
    this.head = this.tail;
    this.tail = current;

    while (current) {
      const next = current.next;
      current.next = prev;
      prev = current;
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

  /**
   * 末尾から先頭への配列を取得（O(n)で実装）
   */
  toArrayReverse(): number[] {
    const result: number[] = [];
    let current = this.head;

    // まず通常の順序で配列を作成
    while (current) {
      result.push(current.value);
      current = current.next;
    }

    // 配列を逆順にする
    return result.reverse();
  }

  /**
   * 末尾から先頭への文字列表現
   */
  toStringReverse(): string {
    return this.toArrayReverse().join(' -> ') + ' -> null';
  }
}

// 使用例とテスト
function main(): void {
  console.log('=== ハイブリッド連結リストのデモ ===\n');

  const list = new HybridLinkedList();

  // 要素を追加
  console.log('1. 要素を追加:');
  list.append(1);
  list.append(2);
  list.append(3);
  list.prepend(0);
  console.log(`リスト: ${list.toString()}`);
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
  console.log(`逆順: ${list.toString()}\n`);

  // 配列として取得
  console.log('7. 配列として取得:');
  console.log(`配列（先頭から）: [${list.toArray().join(', ')}]`);
  console.log(`配列（末尾から）: [${list.toArrayReverse().join(', ')}]`);
}

// デモを実行
main();
