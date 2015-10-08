
import * as ko from "knockout"
import kohash from "./kohash/kohash"
ko.observable(3);
let handler = new kohash();
let elemm = document.getElementById("page1");

handler.Load("page1hash","/app/pages","page1", elemm)
