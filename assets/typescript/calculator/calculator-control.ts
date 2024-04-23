import { DateHour } from "./date-hour.js";
import { Operation } from "./operation.js";
import { Screen } from "./screen.js";

export default class CalculatorControl {
  constructor(
    private screen = new Screen(),
    private operation = new Operation({
      onCalculate: (result: string) => (this.screen.content = result),
    })
  ) {
    new DateHour();
    this.buttonEvents();
  }

  buttonEvents(): void {
    document.querySelectorAll("#teclado button").forEach((element) => {
      element.addEventListener("click", (event: Event) => {
        const target = event.target as HTMLButtonElement;

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
            this.addOperator(<string>target.dataset.valor);
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

  percet(): void {
    this.operation.percent();
  }

  undo(): void {
    this.operation.undo();
  }
  clean() {
    this.operation.clean();
  }

  calculate(): void {
    this.operation.calculate();
  }

  addOperating(value: string): void {
    this.operation.add(value);
    console.log(this.operation.length);
  }

  addNumber(value: number): void {
    if (isNaN(Number(this.operation.lastStand))) {
      this.addOperating(value.toString());
    } else {
      value = Number(this.operation.lastStand.toString() + value.toString());
      this.operation.lastStand = value.toString();
    }
    this.screen.content = value.toString();
  }

  addOperator(operator: string): void {
    if (isNaN(Number(this.operation.lastStand))) {
      this.operation.lastStand = operator;
    } else {
      if (this.operation.length === 0) {
        this.addOperating("0");
      }

      this.addOperating(operator);
    }
  }
}
