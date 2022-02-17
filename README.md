# parsegraph-unicode

This module provides a class to retrieve bidirectional information on a given glyph,
and the exact glyph needed to form a given join.

    import {defaultUnicode} from "parsegraph-unicode";

    const uni = defaultUnicode();
    assert.ok(uni.get("d"));
    assert.strictEqual(uni.getBidirectionalCategory("d"), "L");
    assert.strictEqual(uni.getGeneralCategory(0x6a), "Ll");
    assert.strictEqual(uni.getBidirectionalCategory(0xe01ef), "NSM");
    assert.strictEqual(uni.getGeneralCategory(0xe01ef), "Mn");
