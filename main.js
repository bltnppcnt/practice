let nav_idx = -1;
let hovering = false;
const nav_links = [[], ["dot.html", "cross.html", "simplify.html"], ["tangent.html"], ["about.html"]];
const nav_titles = [[], ["Dot Product", "Cross Product", "Square Roots"], ["Tangent Planes"], ["About"]];
let [a, b, c, d, e, f] = [0, 0, 0, 0, 0, 0];
let [c1, c2, c3] = [0, 0, 0];
let can_submit = true;
document.addEventListener("click", function (e) {
    let elem = document.getElementById("menu");
    if (!hovering && elem.style.width !== "0") {
        elem.innerHTML = "";
        elem.style.width = "0";
        elem.style.height = "0";
        nav_idx = -1;
    }
    console.log(hovering);
})
window.onload = (e) => {
    document.getElementById("nav-bar").innerHTML = `<a href="index.html"><div class="nav-item" id="a-main">Multi Practice</div></a>
        <div class="nav-item" id="a-comp" onclick="menu(1)">Computation</div >
        <div class="nav-item" id="a-deriv" onclick="menu(2)">Derivatives</div>
        <div class="nav-item" id="a-other" onclick="menu(3)">Other</div>
        <div id="menu"></div>`;
    document.getElementById("menu").addEventListener("mouseenter", (e) => { hovering = true; });
    document.getElementById("menu").addEventListener("mouseleave", (e) => { hovering = false; });
    let elems = document.getElementsByClassName("nav-item");
    for (let i = 0; i < elems.length; i++) {
        elems[i].addEventListener("mouseenter", (e) => { hovering = true; });
        elems[i].addEventListener("mouseleave", (e) => { hovering = false; });
    }
    if (document.title === "Dot Product Practice") {
        set_vectors();
    }
    if (document.title === "Cross Product Practice") {
        set_vectors2();
    }
    if (document.title === "Square Root Practice") {
        set_roots();
    }
}
function set_vectors() {
    let v1 = document.getElementById("v1");
    let v2 = document.getElementById("v2");
    let list = [];
    for (let i = 0; i < 6; i++) {
        list.push(Math.floor(Math.random() * 21 - 10));
    }
    [a, b, c, d, e, f] = list;
    v1.textContent = a + ", " + b + ", " + c;
    v2.textContent = d + ", " + e + ", " + f;
    c1 = a * d + b * e + c * f;
}
function set_vectors2() {
    let v1 = document.getElementById("v1");
    let v2 = document.getElementById("v2");
    let list = [];
    for (let i = 0; i < 6; i++) {
        list.push(Math.floor(Math.random() * 21 - 10));
    }
    [a, b, c, d, e, f] = list;
    v1.textContent = a + ", " + b + ", " + c;
    v2.textContent = d + ", " + e + ", " + f;
    c1 = b * f - c * e;
    c2 = c * d - a * f;
    c3 = a * e - b * d;
}
function set_roots() {
    let v1 = document.getElementById("v1");
    let v2 = document.getElementById("v2");
    let v3 = document.getElementById("v3");
    let list = [];
    for (let i = 0; i < 3; i++) {
        list.push(Math.floor(Math.random() * 20 + 1));
    }
    let [a, b, c] = list;
    [v1.textContent, v2.textContent, v3.textContent] = [a + "", b + "", c + ""];
    let res = a * a + b * b + c * c;
    let square = 1;
    for (let num = 1; num * num <= res; num++) {
        if (res % (num * num) === 0) {
            square = num;
        }
    }
    c1 = square;
    c2 = res / (square * square);
}
function submit() {
    if (!can_submit) {
        return;
    }
    can_submit = false;
    let val_elem = document.getElementById("question-input");
    let output = document.getElementById("result");
    let val = val_elem.value;
    if (val === c1 + "") {
        output.textContent = "Correct.";
    }
    else {
        output.textContent = `Incorrect. Answer was ${c1}.`;
    }
    document.getElementById("next").style.visibility = "visible";
}
function submit2() {
    if (!can_submit) {
        return;
    }
    can_submit = false;
    let val_elems = document.getElementsByClassName("question-inputs");
    let output = document.getElementById("result");
    let [a1, a2, a3] = [val_elems[0].value, val_elems[1].value, val_elems[2].value];
    if (a1 === c1 + "" && a2 === c2 + "" && a3 === c3 + "") {
        output.textContent = "Correct.";
    }
    else {
        output.textContent = `Incorrect. Answer was 〈${c1}, ${c2}, ${c3}〉.`;
    }
    document.getElementById("next").style.visibility = "visible";
}
function submit3() {
    if (!can_submit) {
        return;
    }
    can_submit = false;
    let val_elems = document.getElementsByClassName("question-inputs");
    let output = document.getElementById("result");
    let [a1, a2] = [val_elems[0].value, val_elems[1].value];
    if ((a1 === c1 + "" || a1 === "" && c1 === 1) && (a2 === c2 + "" || a2 === "" && c2 === 1)) {
        output.textContent = "Correct.";
    }
    else {
        output.textContent = `Incorrect. Answer was ${c1 === 1 && c2 !== 1 ? "" : c1}√${c2 === 1 ? "" : c2}.`;
    }
    document.getElementById("next").style.visibility = "visible";
}
function cont() {
    can_submit = true;
    if (document.title === "Dot Product Practice") {
        let val_elem = document.getElementById("question-input");
        val_elem.value = "";
        set_vectors();
    }
    if (document.title === "Cross Product Practice") {
        let val_elems = document.getElementsByClassName("question-inputs");
        val_elems[0].value = "";
        val_elems[1].value = "";
        val_elems[2].value = "";
        set_vectors2();
    }
    if (document.title === "Square Root Practice") {
        let val_elems = document.getElementsByClassName("question-inputs");
        val_elems[0].value = "";
        val_elems[1].value = "";
        set_roots();
    }
    document.getElementById("next").style.visibility = "hidden";
    document.getElementById("result").textContent = "";
}
function menu(i) {
    let elem = document.getElementById("menu");
    let nav_items = document.getElementsByClassName("nav-item");
    let rect = nav_items[i].getBoundingClientRect();
    elem.innerHTML = "";
    elem.style.left = rect.left + "px";
    elem.style.width = (rect.right - rect.left) + "px";
    elem.style.height = (nav_links[i].length * 50) + "px";
    for (let k = 0; k < nav_links[i].length; k++) {
        let child = document.createElement("a");
        let child_ = document.createElement("div");
        child.href = nav_links[i][k];
        child_.textContent = nav_titles[i][k];
        child_.classList.add("nav-link");
        child.appendChild(child_);
        elem.appendChild(child);
    }
}