var assert = require("assert");
import {defaultUnicode} from "../dist/unicode";

describe("Package", function () {
  it("works", ()=>{
    assert.ok(defaultUnicode());
    const uni = defaultUnicode();
    assert.ok(uni.get('d'));
    assert.strictEqual(uni.getBidirectionalCategory('d'), 'L');
    assert.strictEqual(uni.getGeneralCategory(0x6a), 'Ll');
    assert.strictEqual(uni.getBidirectionalCategory(0xe01ef), 'NSM');
    assert.strictEqual(uni.getGeneralCategory(0xe01ef), 'Mn');
  });
});
