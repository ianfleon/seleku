let body = document.body;
let child;
let allElement = [];
let allElementAttribute = [];
let allElements = [];
let {
    ["log"]: c, ["error"]: e
} = console;

let selekDOM = (element) => {

    if (body.children.length !== 0 && !element) {

        child = body.children;

    } else {
        child = element.children;
    }

    if (child !== undefined) {
        for (let el of child) {

            if (el.toString() === document.createElement("script").toString()) {
                //do something
            } else {
                let content = el.innerHTML;
                let arrayOfContext = content.replace(/\s+/igm, "").replace(/{/igm, "~").replace(/}/igm, "~").split("~");
                let context = [];

                allElements.push(el);

                try {
                    context = content.replace(/\<(.*)\>\w*/igm, "").match(/\{*[^{]*[}]/igm);
                    if (context === null) {
                        selekDOM(el);

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
            contexts[i.bindTo] = eval(i.bindTo);
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
                        i.value = eval(i.getAttribute("this-bind").replace(/{/igm, "").replace(/}/igm, "")).toString();
                        i.oninput = () => {
                            allElementAttribute.forEach((j) => {
                                name = i.getAttribute("this-bind").replace(/{/igm, "").replace(/}/igm, "");
                                if (name == j.bindTo) {
                                    contexts[name] = `"${i.value}"`;
                                    eval(`${name} = "${i.value}"`);
                                    j.element.textContent = eval(name);
                                }

                            });
                        }
                    } else {
                        allElementAttribute.forEach((j) => {
                            if (name == j.bindTo) {
                                eval(`${name} = ${contexts[name]}`);
                                j.element.textContent = eval(name);
                            }

                        });
                    }

                } catch (err) {
                    allElementAttribute.forEach((j) => {
                        if (name == j.bindTo) {
                            eval(`${name} = "${contexts[name]}"`);
                            j.element.textContent = contexts[name];
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
        allElementAttribute.push({
            element: element.element,
            bindTo: element.bindTo
        });
    });
}

window.onload = () => {
    $ku("head").tambahTag("style", `
    *{
        font-weight: 500;
        font-family: sans-serif;
    }
    .danger{
        color: rgb(230,10,10);
        font-wight: bold;
        font-size: 20px;
        padding: 5px;
        margin: 5px;
        border-radius: 5px;
        background: black;
        text-align: center;
    }
    input{
        border: none;
        outline: none;
        background: white;
        box-shadow: 0px 0px 20px rgba(0,0,0,0.1);
        padding: 10px;
        margin: 3px;
        border-radius: 10px;
    }
    textarea{
        border: none;
        outline: none;
        background: white;
        box-shadow: 0px 0px 20px rgba(0,0,0,0.1);
        padding: 10px;
        margin: 3px;
        border-radius: 10px;
    }
`);
}