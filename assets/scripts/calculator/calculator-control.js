import { DateHour } from "./date-hour.js";
import { Operation } from "./operation.js";
import { Screen } from "./screen.js";
export default class CalculatorControl {
    screen;
    operation;
    constructor(screen = new Screen(), operation = new Operation({
        onCalculate: (result) => (this.screen.content = result),
    })) {
        this.screen = screen;
        this.operation = operation;
        new DateHour();
        this.buttonEvents();
    }
    buttonEvents() {
        document.querySelectorAll("#teclado button").forEach((element) => {
            element.addEventListener("click", (event) => {
                const target = event.target;
                switch (target.id) {
                    case "zero":
                    case "um":
                    case "dois":
                    case "tres":
                    case "quatro":
                    case "cinco":
                    case "seis":
                    case "sete":
                    case "oito":
                    case "nove":
                        this.addNumber(Number(target.dataset.valor));
                        break;
                    case "adicao":
                    case "subtracao":
                    case "multiplicacao":
                    case "divisao":
                        this.addOperator(target.dataset.valor);
                        break;
                    case "ponto":
                        this.addOperating(".");
                        break;
                    case "limpar":
                        this.clean();
                        break;
                    case "desfazer":
                        this.undo();
                        break;
                    case "porcentagem":
                        this.percet();
                        break;
                    case "igual":
                        this.calculate();
                        break;
                }
            });
        });
    }
    percet() {
        this.operation.percent();
    }
    undo() {
        this.operation.undo();
    }
    clean() {
        this.operation.clean();
    }
    calculate() {
        this.operation.calculate();
    }
    addOperating(value) {
        this.operation.add(value);
        console.log(this.operation.length);
    }
    addNumber(value) {
        if (isNaN(Number(this.operation.lastStand))) {
            this.addOperating(value.toString());
        }
        else {
            value = Number(this.operation.lastStand.toString() + value.toString());
            this.operation.lastStand = value.toString();
        }
        this.screen.content = value.toString();
    }
    addOperator(operator) {
        if (isNaN(Number(this.operation.lastStand))) {
            this.operation.lastStand = operator;
        }
        else {
            if (this.operation.length === 0) {
                this.addOperating("0");
            }
            this.addOperating(operator);
        }
    }
}
//# sourceMappingURL=calculator-control.js.map