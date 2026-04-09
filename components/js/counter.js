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
    this.count.innerHTML = `${data.length}曲を表示中`;
  }

}
