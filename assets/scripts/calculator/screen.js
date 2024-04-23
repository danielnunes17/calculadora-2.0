export class Screen {
    element;
    constructor(element = document.querySelector("#values")) {
        this.element = element;
        this.content = "0";
    }
    get content() {
        return this.element ? this.element.innerHTML : "0";
    }
    set content(content) {
        if (content.toString().length > 12)
            content = "ERROR";
        if (this.element)
            this.element.innerHTML = content.toString().replace(".", ",");
    }
}
//# sourceMappingURL=screen.js.map