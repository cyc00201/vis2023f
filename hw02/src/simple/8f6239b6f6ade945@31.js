function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _2(Plot,data){return(
Plot.plot({ 
y: {grid: true, label: "count"}, 
marks: [ 
Plot.rectY(data, Plot.binX({y:"count"}, { x:"Year", interval: 1 })), 
Plot.gridY({ interval: 1, stroke: "white", strokeOpacity: 0.5 })
]
})
)}

function _plot1(Inputs){return(
Inputs.form({
mt: Inputs.range([0, 100], {label: "marginTop", step: 1}),
mr: Inputs.range([0, 100], {label: "marginRight", step: 1}),
mb: Inputs.range([0, 100], {label: "marginBottom", step: 1}),
ml: Inputs.range([0, 100], {label: "marginLeft", step: 1}),
})
)}

function _4(Plot,plot1,data){return(
Plot.plot({ 
marginTop: plot1.mt, 
marginRight: plot1.mr, 
marginBottom: plot1.mb, 
marginLeft: plot1.ml, 
y: {grid: true, label: "count"}, 
marks: [ 
Plot.rectY(data, Plot.binX({y:"count"}, { x:"Year", interval:1, fill:"Gender", tip: true })), 
Plot.gridY({ interval: 1, stroke: "white", strokeOpacity: 0.5 })
 ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["../data.json", {url: new URL("./files/2259824662fb612853b8873b8814ace51e8cbac39ba881850d66e26df63f1897b01d1bd3459af6529669fd912da9dd607a30666a93278d7fdfa10bbe22b8913d.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer()).define(["Plot","data"], _2);
  main.variable(observer("viewof plot1")).define("viewof plot1", ["Inputs"], _plot1);
  main.variable(observer("plot1")).define("plot1", ["Generators", "viewof plot1"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","plot1","data"], _4);
  return main;
}