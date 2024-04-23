export class DateHour {
    elementDate;
    elemtentHour;
    constructor(elementDate = document.querySelector("#datetime > div:nth-child(2"), elemtentHour = document.querySelector("#datetime time")) {
        this.elementDate = elementDate;
        this.elemtentHour = elemtentHour;
        this.render();
        setInterval(() => this.render(), 1000);
    }
    render() {
        const date = new Date();
        const day = date.getDate();
        const month = date.toLocaleDateString("pr-BR", { month: "long" });
        const year = date.getFullYear();
        const hour = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const twoPoints = date.getSeconds() % 2 === 0 ? ":" : " ";
        this.date = `${day} de ${month} de ${year}`;
        this.hour = `${hour}${twoPoints}${minutes}`;
    }
    set date(content) {
        if (this.elementDate)
            this.elementDate.innerHTML = content;
    }
    set hour(content) {
        if (this.elemtentHour)
            this.elemtentHour.innerHTML = content;
    }
}
//# sourceMappingURL=date-hour.js.map