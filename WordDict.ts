class WordDictionary {
  private children: WordDictionary[];
  private isEnd: boolean;
  constructor() {
    this.children = [];
    this.isEnd = false;
  }

  addWord(word: string): void {
    let curr: WordDictionary = this;
    for (const char of word) {
      const index = char.charCodeAt(0) - 97;
      if (!curr.children[index]) {
        curr.children[index] = new WordDictionary();
      }
      curr = curr.children[index];
    }
    curr.isEnd = true;
  }

  /**
   * Returns true if there is any string in the data structure that matches word or false otherwise. word may contain dots '.' where dots can be matched with any letter.
   * @param word
   * @returns
   */
  search(word: string): boolean {
    let curr: WordDictionary = this;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (char === ".") {
        for (const child of curr.children) {
          if (child && child.search(word.substring(i + 1))) return true;
        }
        return false;
      }
      const index = char.charCodeAt(0) - 97;
      if (!curr.children[index]) return false;
      curr = curr.children[index];
    }
    return curr && curr.isEnd;
  }
}
