// SemanticCodeValue:[Isolated, Initial, Medial, Final].
// Use null for non-applicable.
export const unicodeCursiveMap:{[id:number]:number[]} = {
  0x627: [0xfe8d, null, null, 0xfe8e], // ALEF
  0x628: [0xfe8f, 0xfe91, 0xfe92, 0xfe90], // BEH
  0x629: [0xfe93, null, null, 0xfe94], // MARBUTA
  0x62a: [0xfe95, 0xfe97, 0xfe98, 0xfe96], // TEH
  0x62b: [0xfe99, 0xfe9b, 0xfe9c, 0xfe9a], // THEH
  0x62c: [0xfe9d, 0xfe9f, 0xfea0, 0xfe9e], // JEEM
  0x62d: [0xfea1, 0xfea3, 0xfea4, 0xfea2], // HAH
  0x62e: [0xfea5, 0xfea7, 0xfea8, 0xfea6], // KHAH
  0x62f: [0xfea9, null, null, 0xfeaa], // DAL
  0x630: [0xfeab, null, null, 0xfeac], // THAL
  0x631: [0xfead, null, null, 0xfeae], // REH
  0x632: [0xfeaf, null, null, 0xfeb0], // ZAIN
  0x633: [0xfeb1, 0xfeb3, 0xfeb4, 0xfeb2], // SEEN
  0x634: [0xfeb5, 0xfeb7, 0xfeb8, 0xfeb6], // SHEEN
  0x635: [0xfeb9, 0xfebb, 0xfebc, 0xfeba], // SAD
  0x636: [0xfebd, 0xfebf, 0xfec0, 0xfebe], // DAD
  0x637: [0xfec1, 0xfec3, 0xfec4, 0xfec2], // TAH
  0x638: [0xfec5, 0xfec7, 0xfec8, 0xfec6], // ZAH
  0x639: [0xfec9, 0xfecb, 0xfecc, 0xfeca], // AIN
  0x63a: [0xfecd, 0xfecf, 0xfed0, 0xfece], // GHAIN
  0x641: [0xfed1, 0xfed3, 0xfed4, 0xfed2], // FEH
  0x642: [0xfed5, 0xfed7, 0xfed8, 0xfed6], // QAF
  0x643: [0xfed9, 0xfedb, 0xfedc, 0xfeda], // KAF
  0x644: [0xfedd, 0xfedf, 0xfee0, 0xfede], // LAM
  0x645: [0xfee1, 0xfee3, 0xfee4, 0xfee2], // MEEM
  0x646: [0xfee5, 0xfee7, 0xfee8, 0xfee6], // NOON
  0x647: [0xfee9, 0xfeeb, 0xfeec, 0xfeea], // HEH
  0x648: [0xfeed, null, null, 0xfeee], // WAW
  0x64a: [0xfef1, 0xfef3, 0xfef4, 0xfef2], // YEH,
};

let directions:{[id:string]:string} = null;
export function getGlyphDirections():{[id:string]:string} {
  if(directions) {
    return directions;
  }
  directions = {};
  'L LRE LRO EN ES ET'.split(' ').forEach((cat)=>{
    // Left-to-right.
    directions[cat] = 'L';
  });
  'R AL AN RLE RLO'.split(' ').forEach((cat)=>{
    // Right-to-left
    directions[cat] = 'R';
  });
  'PDF CS ON WS BN S NSM B'.split(' ').forEach((cat)=>{
    // Neutral characters
    directions[cat] = null;
  });
  return directions;
}

let i = 0;
export const UNICODE_CODE_VALUE = i++;
export const UNICODE_CHARACTER_NAME = i++;
export const UNICODE_GENERAL_CATEGORY = i++;
export const UNICODE_CANONICAL_COMBINING_CLASSES = i++;
export const UNICODE_BIDIRECTIONAL_CATEGORY = i++;
export const UNICODE_DECOMPOSITION_MAPPING = i++;
export const UNICODE_DECIMAL_DIGIT_VALUE = i++;
export const UNICODE_DIGIT_VALUE = i++;
export const UNICODE_NUMERIC_VALUE = i++;
export const UNICODE_MIRRORED = i++;
export const UNICODE_UNICODE_10_NAME = i++;
export const UNICODE_COMMENT_FIELD = i++;
export const UNICODE_UPPERCASE_MAPPING = i++;
export const UNICODE_LOWERCASE_MAPPING = i++;
export const UNICODE_TITLECASE_MAPPING = i++;

const ALL_FIELDS = [
  UNICODE_CODE_VALUE,
  UNICODE_CHARACTER_NAME,
  UNICODE_GENERAL_CATEGORY,
  UNICODE_CANONICAL_COMBINING_CLASSES,
  UNICODE_BIDIRECTIONAL_CATEGORY,
  UNICODE_DECOMPOSITION_MAPPING,
  UNICODE_DECIMAL_DIGIT_VALUE,
  UNICODE_DIGIT_VALUE,
  UNICODE_NUMERIC_VALUE,
  UNICODE_MIRRORED,
  UNICODE_UNICODE_10_NAME,
  UNICODE_COMMENT_FIELD,
  UNICODE_UPPERCASE_MAPPING,
  UNICODE_LOWERCASE_MAPPING,
  UNICODE_TITLECASE_MAPPING
]

export default class Unicode {
  unicodeProperties:any;
  unicodeBidiCounts:any;
  unicodeCategoryCounts:any;
  _loaded:boolean;
  onLoad:Function;
  _onLoad:Function;
  _onLoadThisArg:object;

  constructor() {
    this.unicodeProperties = {};
    this.unicodeBidiCounts = {};
    this.unicodeCategoryCounts = {};
  }

  getGeneralCategory(letter:string|number):string {
    if (typeof letter !== 'number') {
      letter = letter.charCodeAt(0);
    }
    const data = this.get(letter);
    if (!data) {
      return "Lo";
    }
    return data[UNICODE_GENERAL_CATEGORY];
  }

  getBidirectionalCategory(codeOrLetter:string|number) {
    const data = this.get(codeOrLetter);
    if (!data) {
      return "L";
    }
    return data[UNICODE_BIDIRECTIONAL_CATEGORY];
  }

  get(codeOrLetter:string|number) {
    if (typeof codeOrLetter === 'number') {
      return this.unicodeProperties[codeOrLetter];
    }
    return this.unicodeProperties[codeOrLetter.charCodeAt(0)];
  };

  getCursiveMapping(t:any) {
    if (typeof t !== 'number') {
      t = t.charCodeAt(0);
    }
    return unicodeCursiveMap[t];
  };

  getGlyphDirection(text:string|number) {
    const directions:{[id:string]:string} = getGlyphDirections();
    const dir = directions[this.getBidirectionalCategory(text)];
    if (dir === undefined) {
      throw new Error(
          'Unrecognized character: \\u' +
        text.toString().charCodeAt(0).toString(16),
      );
    }
    return dir;
  };

  cursive(
      givenLetter:string|number,
      prevLetter:string|number,
      nextLetter:string|number,
  ) {
    const cursiveMapping = this.getCursiveMapping(givenLetter);
    if (!cursiveMapping) {
      return null;
    }
    let prevCursiveMapping = null;
    if (prevLetter) {
      prevCursiveMapping = this.getCursiveMapping(prevLetter);
    }
    if (!prevCursiveMapping) {
      prevLetter = null;
    }
    let nextCursiveMapping = null;
    if (nextLetter) {
      nextCursiveMapping = this.getCursiveMapping(nextLetter);
    }
    if (!nextCursiveMapping) {
      nextLetter = null;
    }

    if (nextLetter) {
      if (prevLetter && prevCursiveMapping[1]) {
        if (cursiveMapping[2]) {
          givenLetter = cursiveMapping[2]; // medial
        } else {
          givenLetter = cursiveMapping[0]; // isolated
        }
      } else {
        // Next is, but previous wasn't.
        if (cursiveMapping[1]) {
          givenLetter = cursiveMapping[1]; // initial
        } else {
          givenLetter = cursiveMapping[0]; // isolated
        }
      }
    } else if (prevLetter) {
      if (cursiveMapping[3]) {
        givenLetter = cursiveMapping[3]; // final
      } else {
        givenLetter = cursiveMapping[0]; // isolated
      }
    } else {
      givenLetter = cursiveMapping[0]; // isolated
    }

    return givenLetter;
  };

  isArabic(letter:string|number) {
    if (typeof letter !== 'number') {
      letter = letter.charCodeAt(0);
    }
    const data = this.get(letter);
    if (!data) {
      return false;
    }
    const cv = data[UNICODE_CODE_VALUE];
    return cv >= 0x621 && cv <= 0x64a;
  };

  isMark(letter:string|number) {
    const cat = this.getGeneralCategory(letter);
    return cat === 'Mn' || cat === 'Mc' || cat === 'Me';
  };

  isArabicDiacritic(letter:string|number) {
    if (typeof letter !== 'number') {
      letter = letter.charCodeAt(0);
    }
    const data = this.get(letter);
    if (!data) {
      return false;
    }
    const cv = data[UNICODE_CODE_VALUE];
    return cv >= 0x621 && cv <= 0x64a;
  };

  completeLoading() {
    if (this.loaded()) {
      return;
    }
    // console.log("Time till unicode parsed: " + elapsed(START_TIME));
    this._loaded = true;
    if (this.onLoad) {
      this.onLoad();
    }
    if (this._onLoad) {
      this._onLoad.call(this._onLoadThisArg || this);
    }
  }

  loadLocally() {
    if (this.loaded()) {
      return;
    }
    this.loadFromString(require("./UnicodeDataFilteredWithoutLoL.csv").default, [
      UNICODE_CODE_VALUE,
      UNICODE_GENERAL_CATEGORY,
      UNICODE_BIDIRECTIONAL_CATEGORY
    ]);
  }

  loadFromString(t:string, filteredFields?:number[]) {
    if (this.loaded()) {
      return;
    }
    if (!filteredFields) {
      filteredFields = ALL_FIELDS;
    }
    let lines = 0;
    let start = 0;
    const ws = /[\n\r]/;
    for (let i = 0; i < t.length; ++i) {
      if (ws.test(t[i])) {
        const charData = t.substring(start, i).split(';');
        if (lines < 100) {
          // console.log(charData);
        }
        start = i + 1;
        ++lines;

        const charNamedData:any[] = [];
        charData.forEach((fieldValue, fieldIndex)=>{
          const unicodeField = filteredFields[fieldIndex];
          if (unicodeField === UNICODE_CODE_VALUE || unicodeField >= UNICODE_UPPERCASE_MAPPING) {
            charNamedData[unicodeField] = parseInt(fieldValue, 16);
          } else if(unicodeField === UNICODE_DECIMAL_DIGIT_VALUE) {
            charNamedData[unicodeField] = parseInt(fieldValue);
          } else if(unicodeField === UNICODE_DIGIT_VALUE) {
            charNamedData[unicodeField] = parseFloat(fieldValue);
          } else {
            charNamedData[unicodeField] = fieldValue;
          }
        });
        this.unicodeProperties[charNamedData[UNICODE_CODE_VALUE]] = charNamedData;

        if (!(charNamedData[UNICODE_BIDIRECTIONAL_CATEGORY] in this.unicodeBidiCounts)) {
          this.unicodeBidiCounts[
              charNamedData[UNICODE_BIDIRECTIONAL_CATEGORY]
          ] = 1;
        } else {
          ++this.unicodeBidiCounts[charNamedData[UNICODE_BIDIRECTIONAL_CATEGORY]];
        }
        if (!(charNamedData[UNICODE_GENERAL_CATEGORY] in this.unicodeCategoryCounts)) {
          this.unicodeCategoryCounts[charNamedData[UNICODE_GENERAL_CATEGORY]] = 1;
        } else {
          ++this.unicodeCategoryCounts[charNamedData[UNICODE_GENERAL_CATEGORY]];
        }
      }
    }
    // console.log("Text received: " + t.length + " bytes, " + lines + " lines");
    this.completeLoading();
  };

  load(dbURL:string, storage?:any) {
    if (this.loaded()) {
      return;
    }
    // console.log(new Error("LOADING UNICODE"));
    if (!dbURL) {
      dbURL = '/UnicodeData.txt';
    }
    const storageKey = 'UNICODE@' + dbURL;
    const that = this;
    if (storage) {
      let unicode = storage.getItem(storageKey);
      if (unicode) {
        try {
          unicode = JSON.parse(unicode);
          this.unicodeProperties = unicode.unicodeProperties;
          this.unicodeBidiCounts = unicode.unicodeBidiCounts;
          this.unicodeCategoryCounts = unicode.unicodeCategorycounts;
          this.completeLoading();
          return;
        } catch (ex) {
          console.log('Failed to read stored Unicode data');
          console.log(ex);
          storage.removeItem(storageKey);
        }
      }
    }
    const xhr = new XMLHttpRequest();
    xhr.open('GET', dbURL);
    xhr.onreadystatechange = ()=>{
      if (xhr.readyState == 4 && xhr.status == 200) {
        // console.log("Time till unicode received: " +
        // elapsed(START_TIME));
        that.loadFromString(xhr.responseText);
        if (storage) {
          const unicodeData = {
            unicodeCategoryCounts: that.unicodeCategoryCounts,
            unicodeBidiCounts: that.unicodeBidiCounts,
            unicodeProperties: that.unicodeProperties,
          };
          try {
            storage.setItem(storageKey, JSON.stringify(unicodeData));
          } catch (ex) {
            console.log(ex);
          }
        }
      } else {
        // console.log("Receiving " + xhr.readyState + "\n" +
        // xhr.responseText.length + " bytes received.\nTime: "
        // + new Date().getTime()/1000);
      }
    };
    xhr.send();
  };

  loaded() {
    return this._loaded;
  };

  setOnLoad(onLoad:Function, onLoadThisArg?:object) {
    if (this._loaded) {
      throw new Error('Unicode character database is already loaded');
    }
    this._onLoad = onLoad;
    this._onLoadThisArg = onLoadThisArg;
  };
}

let UNICODE_INSTANCE:Unicode = null;
export function defaultUnicode() {
  if (!UNICODE_INSTANCE) {
    UNICODE_INSTANCE = new Unicode();
    UNICODE_INSTANCE.loadLocally();
  }
  return UNICODE_INSTANCE;
}

export function setDefaultUnicode(unicode:Unicode) {
  UNICODE_INSTANCE = unicode;
}

