export　abstract class Display {
  constructor() {
    this.render();
  }
  render() {
    let templetePath:string = this.getTempletePath();
  }
  abstract getTempletePath(): string;
}
