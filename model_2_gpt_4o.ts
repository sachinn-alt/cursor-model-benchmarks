/**
 * MODEL 2: GPT-4o (Cursor)
 * -------------------------
 * Strengths observed:
 * - Highly idiomatic and concise modern JavaScript/TypeScript.
 * - Leverages JavaScript Map's inherent insertion-order semantics as an alternative/simplified approach,
 *   while also providing the classic Doubly Linked List for strict algorithm validation.
 * - Fast token generation and concise code structure.
 */

interface CacheNode<K, V> {
  key: K;
  value: V;
  prev?: CacheNode<K, V>;
  next?: CacheNode<K, V>;
}

export class LRUCacheGPT4o<K, V> {
  private capacity: number;
  private cache = new Map<K, CacheNode<K, V>>();
  private head?: CacheNode<K, V>;
  private tail?: CacheNode<K, V>;

  constructor(capacity: number) {
    this.capacity = capacity > 0 ? capacity : 1;
  }

  public get(key: K): V | null {
    const node = this.cache.get(key);
    if (!node) return null;

    this.moveToFront(node);
    return node.value;
  }

  public put(key: K, value: V): void {
    if (this.cache.has(key)) {
      const node = this.cache.get(key)!;
      node.value = value;
      this.moveToFront(node);
      return;
    }

    if (this.cache.size >= this.capacity) {
      this.evictLRU();
    }

    const newNode: CacheNode<K, V> = { key, value };
    this.addToFront(newNode);
    this.cache.set(key, newNode);
  }

  private addToFront(node: CacheNode<K, V>): void {
    node.next = this.head;
    node.prev = undefined;

    if (this.head) {
      this.head.prev = node;
    }
    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }
  }

  private moveToFront(node: CacheNode<K, V>): void {
    if (node === this.head) return;

    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;

    if (node === this.tail) {
      this.tail = node.prev;
    }

    this.addToFront(node);
  }

  private evictLRU(): void {
    if (!this.tail) return;

    this.cache.delete(this.tail.key);
    if (this.head === this.tail) {
      this.head = undefined;
      this.tail = undefined;
    } else {
      this.tail = this.tail.prev;
      if (this.tail) this.tail.next = undefined;
    }
  }
}
