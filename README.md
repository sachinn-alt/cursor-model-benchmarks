# Benchmarking Cursor’s AI Models: Claude 3.5 Sonnet vs GPT-4o vs Cursor-Small

> **MLH Global Hack Week Challenge:** Benchmark Cursor’s Models  
> **Author:** SACHIN KUMAR SINGH (`sachin-alt`)  
> **Platform:** Cursor Desktop IDE  
> **Repository:** https://github.com/sachinn-alt/cursor-model-benchmarks

---

## 🎯 Benchmark Objective

Cursor allows developers to toggle between state-of-the-art frontier foundation models and fast in-house models directly inside the editor chat and Composer.

To evaluate consistency, architectural depth, code conciseness, and edge-case handling across Cursor's model ecosystem, we executed an identical algorithmic prompt across three distinct models:

### 📝 The Standardized Prompt
> *"Implement an LRU (Least Recently Used) Cache class in TypeScript with strict O(1) time complexity for both `get` and `put` operations. Use a Doubly Linked List paired with a Hash Map. Include capacity bounds handling, eviction tracking, full generic typing (`LRUCache<K, V>`), and a suite of unit test cases validating edge cases (e.g., updating existing keys, zero capacity, and eviction order)."*

---

## 📊 Comprehensive Comparison Matrix

| Evaluation Criteria | Claude 3.5 Sonnet | GPT-4o | Cursor-Small |
| :--- | :--- | :--- | :--- |
| **Model Category** | Frontier Reasoning Model | Frontier Multimodal Model | In-House Fast Agent Model |
| **Speed / Time-to-First-Token** | Moderate (~1.2s) | Fast (~0.8s) | **Ultra-Fast (<0.3s)** |
| **Data Structure Choice** | Sentinel DLL + Map | Raw DLL + Map | Native Ordered Map |
| **Time Complexity** | Strict $O(1)$ | Strict $O(1)$ | Amortized $O(1)$ |
| **Edge-Case Thoroughness** | **Exceptional** (Throws on $\le 0$) | Good (Clamps to 1) | Practical (Clamps to 1) |
| **TypeScript Typing Rigor** | **High** (Explicit null safety) | Moderate (Optional chaining) | Clean / Idiomatic |
| **Code Length / Verbosity** | 85 lines (Comprehensive) | 78 lines (Standard) | **38 lines (Ultra-concise)** |

---

## 🔍 In-Depth Model Breakdown & Pros/Cons

### 1. Claude 3.5 Sonnet
* **Implementation:** [`model_1_claude_sonnet.ts`](model_1_claude_sonnet.ts)
* **Architecture:** Utilized classic Sentinel (`head` and `tail` dummy nodes), eliminating boundary null checks when detaching and inserting nodes.
* **Pros:**
  * Highest code cleanliness and software engineering rigor.
  * Bulletproof edge-case handling (threw explicit `RangeError` on invalid capacity).
  * Highly descriptive docstrings and idiomatic TypeScript generics.
* **Cons:**
  * Slightly higher latency before generation starts compared to smaller models.

---

### 2. OpenAI GPT-4o
* **Implementation:** [`model_2_gpt_4o.ts`](model_2_gpt_4o.ts)
* **Architecture:** Implemented the classic doubly linked list without sentinels, relying on explicit `prev`/`next` pointer reassignment.
* **Pros:**
  * Balanced combination of rapid generation speed and correct algorithm logic.
  * Pragmatic return types (`V | null`) aligning with common API conventions.
* **Cons:**
  * Missing sentinel nodes meant more conditional branch logic (`if (this.head) ...`) in the pointer manipulation methods.

---

### 3. Cursor-Small (Composer Fast)
* **Implementation:** [`model_3_cursor_small.ts`](model_3_cursor_small.ts)
* **Architecture:** Leveraged JavaScript's native `Map` iteration-order guarantees (deleting and re-setting a key moves it to the most recent position; `map.keys().next().value` retrieves the oldest).
* **Pros:**
  * **Blazing fast:** Responded instantaneously with zero lag.
  * **Ultra-concise:** Solved the problem in fewer than 40 lines of clean code.
  * Excellent for quick refactoring, boilerplate generation, and repetitive tasks.
* **Cons:**
  * Bypassed manual doubly linked list construction in favor of JavaScript built-ins (practical in production, but slightly divergent from classical CS interview prompt requests).

---

## 🏆 Final Verdict & Recommendations

* **Choose Claude 3.5 Sonnet** when writing complex architectural code, designing public library APIs, refactoring intricate multi-file logic, or debugging subtle async edge cases in Cursor.
* **Choose GPT-4o** for rapid full-stack iteration, translating between languages, generating unit tests, or general-purpose pair programming.
* **Choose Cursor-Small** for inline code edits, fast autocomplete refactoring, generating boilerplate models, and quick multi-line transforms where speed is paramount.
