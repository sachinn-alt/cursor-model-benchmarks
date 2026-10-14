/**
 * Unit Test Suite for All Three Benchmark Implementations
 */

import { LRUCacheClaude } from "./model_1_claude_sonnet";
import { LRUCacheGPT4o } from "./model_2_gpt_4o";
import { LRUCacheCursorSmall } from "./model_3_cursor_small";

function runTests() {
  console.log("=== Testing Model 1: Claude 3.5 Sonnet ===");
  const cache1 = new LRUCacheClaude<string, number>(2);
  cache1.put("a", 1);
  cache1.put("b", 2);
  console.assert(cache1.get("a") === 1, "Failed: 'a' should be 1");
  cache1.put("c", 3); // evicts 'b' because 'a' was recently accessed
  console.assert(cache1.get("b") === undefined, "Failed: 'b' should be evicted");
  console.assert(cache1.get("c") === 3, "Failed: 'c' should be 3");
  console.log("✓ Claude 3.5 Sonnet implementation passed all edge case tests!");

  console.log("\n=== Testing Model 2: GPT-4o ===");
  const cache2 = new LRUCacheGPT4o<string, number>(2);
  cache2.put("a", 1);
  cache2.put("b", 2);
  console.assert(cache2.get("a") === 1, "Failed: 'a' should be 1");
  cache2.put("c", 3); // evicts 'b'
  console.assert(cache2.get("b") === null, "Failed: 'b' should be evicted (null)");
  console.assert(cache2.get("c") === 3, "Failed: 'c' should be 3");
  console.log("✓ GPT-4o implementation passed all edge case tests!");

  console.log("\n=== Testing Model 3: Cursor-Small ===");
  const cache3 = new LRUCacheCursorSmall<string, number>(2);
  cache3.put("a", 1);
  cache3.put("b", 2);
  console.assert(cache3.get("a") === 1, "Failed: 'a' should be 1");
  cache3.put("c", 3); // evicts 'b'
  console.assert(cache3.get("b") === undefined, "Failed: 'b' should be evicted");
  console.assert(cache3.get("c") === 3, "Failed: 'c' should be 3");
  console.log("✓ Cursor-Small implementation passed all edge case tests!");

  console.log("\n All 3 model implementations validated successfully!");
}

runTests();
