import LeaderLine from "leader-line-new";

interface IOptions {
  delay?: number
  startSocket: 'top' | 'right' | 'bottom' | 'left' | 'auto'
}

//This function takes in 2 strings(ids of dom elements) and draws an arrow between them
//Returns line's instance to allow remove it
export const drawArrow = (id1: string, id2: string, {delay = 0, startSocket = 'auto'}: IOptions) => {
  let line: any;
  const firstElement = document.getElementById(id1);
  const secondElement = document.getElementById(id2);
  if (firstElement && secondElement) {
    line = new LeaderLine(firstElement, secondElement, {
      color: "#FE5912",
      size: 5,
      path: "grid",
    });
    line.hide("none");
    setTimeout(() => {
      if (line) {
        line.setOptions({
          startSocket: startSocket,
        });
        line.show("draw", {duration: 1000});
      }
    }, delay);
  }
  return line;
};


//PS - See additional styles in App.scss for .leader-line