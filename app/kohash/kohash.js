export default class KOHash {
    constructor(_viewConvention = "/views/{location}View.htm", _viewModelConvention = "/viewmodels/{location}ViewModel.js") {
        this._viewConvention = _viewConvention;
        this._viewModelConvention = _viewModelConvention;
        window.onhashchange = (ev) => {
            ev.cancelBubble = true;
            console.log("New URL " + ev.newURL);
            console.log("OLD URL " + ev.oldURL);
        };
    }
    Load(hash, location, key, element) {
        let viewPath = location + this._viewConvention.replace("{location}", key);
        let viewModelPath = location + this._viewModelConvention.replace("{location}", key);
        element.hidden = true;
        var textPromise = window
            .fetch(viewPath)
            .then((rsp) => rsp.text());
        var vmPromise = System
            .import(viewModelPath)
            .then(mod => { return mod.default; });
        Promise.all([textPromise, vmPromise]).then((res) => {
            element.innerHTML = res[0];
            let vm = new res[1]();
            ko.applyBindingsToDescendants(vm, element);
            element.hidden = false;
        });
    }
}
