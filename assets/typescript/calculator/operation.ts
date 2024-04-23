interface IOperationOptions {
  onCalculate: any;
}

export class Operation {
  private onCalculate: any;
  constructor(opts: IOperationOptions, private operation: string[] = []) {
    this.onCalculate = opts.onCalculate;
  }

  add(value: string): number {
    if (this.operation.length === 3) {
      this.calculate();
    }
    return this.operation.push(value);
  }

  getResult(): string {
    let result: string = "0";

    try {
      result = eval(this.operation.join("")).toString();
    } catch (error) {
      result = "ERROR";
    }

    return result;
  }

  percent(): void {
    let result = this.getResult();
    result = (Number(result) / 100).toString();
    this.operation = [result];
    this.onCalculate(result);
  }

  undo(): void {
    this.operation.pop();
    this.onCalculate(this.lastStand);
  }

  clean(): void {
    this.operation = [];
    this.onCalculate("0");
  }

  calculate(): void {
    let result = this.getResult();
    if (result.length > 12) {
      result = result.substr(0, 12);
    }

    this.operation = [result];
    this.onCalculate(result);
  }

  get lastStand(): string {
    return this.operation.length
      ? this.operation[this.operation.length - 1]
      : "0";
  }

  set lastStand(value: string) {
    const ultimate = this.operation.length ? this.operation.length - 1 : 0;
    this.operation[ultimate] = value;
  }

  get length(): number {
    return this.operation.length;
  }
}
