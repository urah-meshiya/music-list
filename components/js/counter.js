export class Counter {
  constructor(CONFIG, dom) {
    this.CONFIG = CONFIG;
    this.dom = dom;

    this.dom.counter.innerHTML = `
      <div id="counterInner" >
        <p id="countText"><p>
      </div>
    `;
    this.count = this.dom.counter.querySelector("#countText");
  }

  setData(data) {
    //this.data = data;
    this.count.innerHTML = `${this.CONFIG.counterMegPre ?? ""}${data.length}${this.CONFIG.counterMsgPro ?? "曲 表示中"}`;
  }

}
