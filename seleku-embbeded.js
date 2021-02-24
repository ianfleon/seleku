let JOSS = joss_overload;
let body = document.body;
let child;
let allElement = [];
let allElementAttribute = [];
let allElements = [];
let {
    ["log"]: c, ["error"]: e
} = console;
let Name;

let selekDOM = (element) => {

    if (body.children.length !== 0 && !element) {

        child = body.children;

    } else {
        child = element.children;
    }


    if (child !== undefined) {

        for (let attr of child) {
            if (attr.getAttribute("class")) {
                let allOfLongProperty = attr.getAttribute("class").match(/\(.*?\)/);
                let attrOfElement;
                allOfLongProperty?.forEach((i,index)=>{
                    attrOfElement = attr.getAttribute("class").replace(/\(.*?\)/,"$"+index).replace(/\s+/igm,"~");
                    attrOfElement = attrOfElement.replace("$"+index,i).split("~");
                });

                if(attrOfElement === void 0){
                   attrOfElement =  attr.getAttribute("class").split(" ");
                }

                c(attrOfElement)
               
                for (let attrOfElementStyle of attrOfElement) {
                    if (attrOfElementStyle.split(/-/igm).length === 3) {
                        new JOSS({
                            class: attrOfElementStyle,
                            element: attr
                        }).twoClassDirection()
                    } else if(attrOfElementStyle.split(/-/igm).length === 2){
                        new JOSS({
                            class: attrOfElementStyle,
                            element: attr
                        }).oneClassDirection()
                    }
                }


            }
        }

        for (let el of child) {

            if (el.toString() === document.createElement("script").toString()) {
                //do something
            } else {
                let content = el.innerHTML;
                let theMain = content.replace(/{/igm, " {").replace(/}/igm, "} ").split(" ");
                let mainDOMLocation = [];

                for (let x in theMain) {
                    if (theMain[x].match(/{/) || theMain[x].match(/}/)) {
                        mainDOMLocation.push({
                            location: x
                        });
                    }
                }

                let arrayOfContext = content.replace(/\s+/igm, "").replace(/{/igm, "~").replace(/}/igm, "~").split("~");
                let context = [];

                allElements.push(el);

                try {
                    context = content.replace(/\<(.*)\>\w*/igm, "").match(/\{*[^{]*[}]/igm);
                    if (context === null) {

                        if (el.attributes.length !== 0) {
                            allElement.push({
                                element: el,
                                attr: el.attributes
                            });
                            selekDOM(el);
                        } else {
                            selekDOM(el);
                        }

                    }

                    if (context.length !== 0) {
                        context.forEach((cont) => {
                            allElement.push({
                                element: el,
                                bindTo: cont.replace(/{/igm, "").replace(/}/igm, "")
                            });
                            try {
                                eval(cont.replace(/{/igm, "").replace(/}/igm, ""));

                                el.innerHTML = el.innerHTML.replace(cont, eval(cont.replace(/{/igm, "").replace(/}/igm, "")));

                            } catch (err) {
                                if (err) {
                                    e(`the ${cont.replace(/{/igm,"").replace(/}/igm,"")} is not define`);
                                    el.innerHTML = el.innerHTML.replace(cont, `<b class="danger"> ${cont.replace(/{/igm,"").replace(/}/igm,"")} </b>`)
                                }
                            }
                        });
                    }
                    if (el.children.length !== 0) {
                        selekDOM(el);
                    }


                } catch (err) {
                    if (!err) {
                        context = content.match(/\{*[^{]*[}]/igm);
                    }
                }
            }

        }
    }
}

let reactive = () => {

    window.contexts = {
        main: "main"
    };

    try {

        allElementAttribute.forEach((i) => {
            if (i.attr) {
                contexts[i.attr] = eval(i.attr);
            }
            if (i.bindTo) {
                contexts[i.bindTo] = eval(i.bindTo);
            }
        });

        function reactivity(object, key) {
            let val = object[key];

            Object.defineProperty(object, key, {
                get() {
                    return val;
                },
                set(args) {
                    val = args;
                    notify(key)
                }
            });
        }

        function setReactivity(object) {
            for (let obj in object) {
                if (object.hasOwnProperty(obj)) {
                    reactivity(object, obj);
                }
            }
        }

        function notify(name) {

            allElements.forEach((i) => {
                try {
                    if (i.value === "" || i.value !== "" && typeof i.value === "string") {
                        i.value = eval(i.getAttribute("this:bind").replace(/{/igm, "").replace(/}/igm, "")).toString();
                        i.oninput = () => {
                            allElementAttribute.forEach((j) => {
                                name = i.getAttribute("this:bind").replace(/{/igm, "").replace(/}/igm, "");
                                if (name == j.bindTo) {
                                    contexts[name] = `${i.value}`;
                                    eval(`${name} = "${i.value}"`);
                                    j.element.innerHTML = eval(name);
                                }

                            });
                        }

                    } else {
                        allElementAttribute.forEach((j) => {
                            try {
                                if (name == j.bindTo) {
                                    eval(`${name} = ${contexts[name]}`);
                                    j.element.innerHTML = eval(name);
                                }
                            } catch (err) {
                                eval(`${name} = ${contexts[name]}`);
                                j.element.innerHTML = eval(name);
                            }

                        });
                    }

                } catch (err) {
                    allElementAttribute.forEach((j) => {
                        if (name === j.attr) {
                            let g = {...j.element.attributes
                            };

                            if (Name === undefined) {
                                for (let x in g) {
                                    if (g[x].value.match(/\{(.*?)\}/)) {

                                        try {
                                            if(g[x].name === "this:bind"){
                                                return;
                                            }
                                            eval(`${name} = "${contexts[name]}"`);
                                            j.element.setAttribute(g[x].name, contexts[name]);
                                            Name = g[x].name;
                                        } catch (error) {
                                            e(error)

                                        }


                                    }

                                }
                            } else {

                                try {
                                    eval(`${name} = "${contexts[name]}"`);
                                    j.element.setAttribute(Name, contexts[name]);

                                } catch (error) {
                                    e(error)
                                }
                            }
                        }

                        if (name == j.bindTo) {

                            try {
                                try {
                                    eval(`${name} = ${contexts[name]}`);
                                } catch (err) {
                                    eval(`${name} = "${contexts[name]}"`);
                                };

                                j.element.innerHTML = contexts[name];

                            } catch (err) {
                                return;
                            
                            }

                        }

                    });
                }
            });

        }

        setReactivity(contexts);
        contexts.main = contexts.main;


    } catch (err) {

    }
}

const binding = () => {
    allElement.forEach((element) => {
        if (element.attr) {
            for (let x in element.attr) {
                if (typeof element.attr[x] !== "function" && typeof element.attr[x] !== "number") {
                    if (element.attr[x].value.match(/\{(.*?)\}/)) {
                        allElementAttribute.push({
                            element: element.element,
                            attr: element.attr[x].value.replace(/{/igm, "").replace(/}/igm, "")
                        });
                    }

                }
            }
        } else {
            allElementAttribute.push({
                element: element.element,
                bindTo: element.bindTo
            });
        }

    });
}

window.onload = () => {
    selekDOM();
    binding();
    reactive();
    new JOSS({class:"",element:""}).update();
}