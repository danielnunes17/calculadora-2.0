export class Screen {
  constructor(
    private element: HTMLDivElement | null = document.querySelector("#values")
  ) {
    this.content = "0";
  }
  get content() {
    return this.element ? this.element.innerHTML : "0";
  }
  set content(content: string) {
    if (content.toString().length > 12) content = "ERROR";
    if (this.element)
      this.element.innerHTML = content.toString().replace(".", ",");
  }
}
