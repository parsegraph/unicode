var assert = require("assert");
import todo from "../dist/unicode";

describe("Package", function () {
  it("works", ()=>{
    assert.equal(todo(), 42);
  });
});
