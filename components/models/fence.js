class Fence {
  valueTitles = [];
  specs;

  constructor(specs) {
    this.specs = specs;
  }

  init() {
    this.specs.forEach((s) => {
      this.pushValueTitles(s.value);
    });
  }

  pushValueTitles(title) {
    this.valueTitles.push(title);
  }
}

export { Fence };
