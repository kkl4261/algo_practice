class TrieNode {
  children: Map<string, TrieNode>;
  isEnd: boolean;
  constructor() {
    this.children = new Map<string, TrieNode>();
    this.isEnd = false;
  }
}

class Trie {
  root: TrieNode;
  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let curr: TrieNode = this.root;
    for (const char of word) {
      if (!curr.children.has(char)) {
        curr.children.set(char, new TrieNode());
      }
      curr = curr.children.get(char) as TrieNode;
    }
    curr.isEnd = true;
  }

  search(word: string): boolean {
    let curr = this.root;
    for (const char of word) {
      if (curr.children.has(char)) {
        curr = curr.children.get(char) as TrieNode;
      } else {
        return false;
      }
    }
    return curr.isEnd;
  }

  startsWith(prefix: string): boolean {
    let curr = this.root;
    for (const char of prefix) {
      if (curr.children.has(char)) {
        curr = curr.children.get(char) as TrieNode;
      } else {
        return false;
      }
    }
    return true;
  }
}
