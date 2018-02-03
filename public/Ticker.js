export default class Ticker extends EventTarget {
    constructor(interval = 1000) {
        super()
        this.intervalId = setInterval(() => this.emit(this), interval)
    }

    emit() {
        const event = new Event('tick')
        this.dispatchEvent(event)
    }
}
