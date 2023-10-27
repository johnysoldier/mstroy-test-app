import { describe, expect, test } from "vitest";
import TreeStore from "./TreeStore.js";

const items = [
  { id: 1, parent: "root" },
  { id: 2, parent: 1, type: "test" },
  { id: 3, parent: 1, type: "test" },

  { id: 4, parent: 2, type: "test" },
  { id: 5, parent: 2, type: "test" },
  { id: 6, parent: 2, type: "test" },

  { id: 7, parent: 4, type: null },
  { id: 8, parent: 4, type: null },
];

const ts = new TreeStore(items);

describe("TreeStore", () => {
  test("get all", () => {
    expect(ts.getAll()).toEqual(items);
  });

  test("get item", () => {
    expect(ts.getItem(7)).toEqual({ id: 7, parent: 4, type: null });
  });

  test("get empty children", () => {
    expect(ts.getChildren(5)).toEqual([]);
  });

  test("get children", () => {
    expect(ts.getChildren(2)).toEqual([
      { id: 4, parent: 2, type: "test" },
      { id: 5, parent: 2, type: "test" },
      { id: 6, parent: 2, type: "test" },
    ]);
  });

  test("get all children", () => {
    expect(ts.getAllChildren(2)).toEqual([
      { id: 4, parent: 2, type: "test" },
      { id: 5, parent: 2, type: "test" },
      { id: 6, parent: 2, type: "test" },
      { id: 7, parent: 4, type: null },
      { id: 8, parent: 4, type: null },
    ]);
  });

  test("get all parents", () => {
    expect(ts.getAllParents(7)).toEqual([
      { id: 4, parent: 2, type: "test" },
      { id: 2, parent: 1, type: "test" },
      { id: 1, parent: "root" },
    ]);
  });
});
