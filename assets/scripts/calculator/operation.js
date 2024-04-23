export class Operation {
    operation;
    onCalculate;
    constructor(opts, operation = []) {
        this.operation = operation;
        this.onCalculate = opts.onCalculate;
    }
    add(value) {
        if (this.operation.length === 3) {
            this.calculate();
        }
        return this.operation.push(value);
    }
    getResult() {
        let result = "0";
        try {
            result = eval(this.operation.join("")).toString();
        }
        catch (error) {
            result = "ERROR";
        }
        return result;
    }
    percent() {
        let result = this.getResult();
        result = (Number(result) / 100).toString();
        this.operation = [result];
        this.onCalculate(result);
    }
    undo() {
        this.operation.pop();
        this.onCalculate(this.lastStand);
    }
    clean() {
        this.operation = [];
        this.onCalculate("0");
    }
    calculate() {
        let result = this.getResult();
        if (result.length > 12) {
            result = result.substr(0, 12);
        }
        this.operation = [result];
        this.onCalculate(result);
    }
    get lastStand() {
        return this.operation.length
            ? this.operation[this.operation.length - 1]
            : "0";
    }
    set lastStand(value) {
        const ultimate = this.operation.length ? this.operation.length - 1 : 0;
        this.operation[ultimate] = value;
    }
    get length() {
        return this.operation.length;
    }
}
//# sourceMappingURL=operation.js.map