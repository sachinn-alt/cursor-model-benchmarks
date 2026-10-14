/**
 * MODEL 3: Cursor-Small / Composer (Cursor In-House Fast Model)
 * -------------------------------------------------------------
 * Strengths observed:
 * - Extremely low latency (near instantaneous streaming response).
 * - Focused, practical, and highly pragmatic code generation.
 * - Leans toward concise solutions with minimal boilerplate.
 */

export class LRUCacheCursorSmall<K, V> {
  private capacity: number;
  private items = new Map<K, V>();

  constructor(capacity: number) {
    this.capacity = Math.max(1, capacity);
  }

  get(key: K): V | undefined {
    if (!this.items.has(key)) return undefined;

    // JavaScript Map keys preserve insertion order:
    // Re-inserting effectively updates the key to "Most Recently Used"
    const value = this.items.get(key)!;
    this.items.delete(key);
    this.items.set(key, value);
    return value;
  }

  put(key: K, value: V): void {
    if (this.items.has(key)) {
      this.items.delete(key);
    } else if (this.items.size >= this.capacity) {
      // The first item in Map iterator is the Least Recently Used
      const oldestKey = this.items.keys().next().value;
      if (oldestKey !== undefined) {
        this.items.delete(oldestKey);
      }
    }

    this.items.set(key, value);
  }

  get size(): number {
    return this.items.size;
  }
}
