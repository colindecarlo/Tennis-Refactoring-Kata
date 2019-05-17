module.exports = {
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [2339]
      }
    }
  }
}
