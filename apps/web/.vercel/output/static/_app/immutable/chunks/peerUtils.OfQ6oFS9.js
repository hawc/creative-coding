import{_ as a}from"./preload-helper.0HuHagjb.js";let o,r;async function c(){if(!o){const{Peer:n}=await a(()=>import("./bundler.agPnO1wm.js"),__vite__mapDeps([0,1,2]),import.meta.url);o=new n}}async function u(n,i,e){await c(),o.on("open",()=>{e(`${n}/sender?k=${o.id}`),o.on("connection",t=>{r=t,s(r,i)})}),o.on("error",t=>console.error(t))}async function p(n,i,e){await c(),o.on("open",()=>{r=f(n),r&&(e&&e(r),s(r,i))}),o.on("error",t=>console.error(t))}function f(n){if(n)return o.connect(n);console.error("No connection key.")}function s(n,i){n.on("data",e=>{i&&i(e),console.log("data reveiced: ",e)}),n.on("error",e=>{console.error("Error connecting: ",e)})}function _(n){r?.open&&n&&r.send(n)}export{u as a,p as i,_ as s};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./bundler.agPnO1wm.js","./_commonjsHelpers.5-cIlDoe.js","./index.XRl7aEt-.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}