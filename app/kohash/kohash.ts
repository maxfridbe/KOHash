
export default class KOHash{
  constructor(
      private _viewConvention:string="/views/{location}View.htm",
      private _viewModelConvention:string="/viewmodels/{location}ViewModel.js"){
    window.onhashchange = (ev:HashChangeEvent)=>{
      ev.cancelBubble = true;
      console.log("New URL " + ev.newURL);
      console.log("OLD URL " + ev.oldURL);
    };
  }

  Load(hash:string,location:string, key:string, element:HTMLElement){
    let viewPath = location + this._viewConvention.replace("{location}", key);
    let viewModelPath = location + this._viewModelConvention.replace("{location}", key);
    element.hidden = true;
    var textPromise:Promise<any> = window
      .fetch(viewPath)
      .then((rsp:Response)=> rsp.text());
    var vmPromise:Promise<any> = System
      .import(viewModelPath)
      .then(mod=>{ return mod.default; });

      Promise.all([textPromise,vmPromise]).then((res:any[])=>{
        element.innerHTML = res[0];
        let vm = new res[1]();
        ko.applyBindingsToDescendants(vm,element);
        element.hidden=false;
      });




  }

}
