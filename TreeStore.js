export default class TreeStore {
  constructor(items) {
    this.items = items;
    this.map = {};
    this.parents = {};
    this.#toMap();
  }

  #toMap() {
    this.items.forEach((item) => {
      this.map[item.id] = item;

      if (this.parents[item.parent]) {
        this.parents[item.parent].push(item);
      } else {
        this.parents[item.parent] = [item];
      }
    });
  }

  getAll() {
    return this.items;
  }

  getItem(id) {
    return this.map[id] || [];
  }

  getChildren(id) {
    return this.parents[id] || [];
  }

  getAllChildren(id) {
    const allChildren = [...this.getChildren(id)];

    allChildren.forEach((child) => {
      allChildren.push(...this.getAllChildren(child.id));
    });

    return allChildren;
  }

  getAllParents(id) {
    const parentId = this.getItem(id).parent;
    const parentItem = this.getItem(parentId);

    if (!parentItem.parent) return [];

    const allParents = [
      parentItem,
      ...this.getAllParents(this.getItem(id).parent),
    ];

    return allParents;
  }
}
