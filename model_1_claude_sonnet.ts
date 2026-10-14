/**
 * MODEL 1: Claude 3.5 Sonnet (Cursor)
 * ------------------------------------
 * Strengths observed:
 * - Exceptional architectural rigor and separation of concerns.
 * - Explicit Sentinel nodes (dummy head & tail) to eliminate null checks in O(1) pointer updates.
 * - Thorough TypeScript generics, JSDoc annotations, and descriptive error handling.
 */

class DNode<K, V> {
  key: K;
  value: V;
  prev: DNode<K, V> | null = null;
  next: DNode<K, V> | null = null;

  constructor(key?: K, value?: V) {
    this.key = key as K;
    this.value = value as V;
  }
}

export class LRUCacheClaude<K, V> {
  private readonly capacity: number;
  private readonly map = new Map<K, DNode<K, V>>();
  private readonly head: DNode<K, V>;
  private readonly tail: DNode<K, V>;

  constructor(capacity: number) {
    if (capacity <= 0) {
      throw new RangeError("LRUCache capacity must be greater than zero.");
    }
    this.capacity = capacity;

    // Sentinel dummy nodes to eliminate boundary edge cases
    this.head = new DNode<K, V>();
    this.tail = new DNode<K, V>();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key: K): V | undefined {
    const node = this.map.get(key);
    if (!node) return undefined;

    // Move accessed node to head (most recently used)
    this.detach(node);
    this.insertHead(node);
    return node.value;
  }

  put(key: K, value: V): void {
    const existing = this.map.get(key);

    if (existing) {
      existing.value = value;
      this.detach(existing);
      this.insertHead(existing);
      return;
    }

    if (this.map.size >= this.capacity) {
      // Evict least recently used node (before tail sentinel)
      const lru = this.tail.prev;
      if (lru && lru !== this.head) {
        this.detach(lru);
        this.map.delete(lru.key);
      }
    }

    const newNode = new DNode(key, value);
    this.insertHead(newNode);
    this.map.set(key, newNode);
  }

  private detach(node: DNode<K, V>): void {
    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;
  }

  private insertHead(node: DNode<K, V>): void {
    node.next = this.head.next;
    node.prev = this.head;
    if (this.head.next) this.head.next.prev = node;
    this.head.next = node;
  }

  get size(): number {
    return this.map.size;
  }
}
