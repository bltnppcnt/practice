let nav_idx = -1;
let hovering = false;
const nav_links = [[], ["dot.html", "cross.html", "simplify.html"], ["tangent.html","pderiv.html"], ["about.html"]];
const nav_titles = [[], ["Dot Product", "Cross Product", "Square Roots"], ["Tangent Planes", "Partials"], ["About"]];
let [a, b, c, d, e, f] = [0, 0, 0, 0, 0, 0];
let [c1, c2, c3, c4, c5] = [0, 0, 0, 0, 0];
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
    if (document.title === "Tangent Planes") {
        set_tan_curves();
    }
    if (document.title === "Partial Derivatives") {
        set_partials();
    }
}
function gcd(x, y) {
    while (x > 0 && y > 0) {
        if (x > y) {
            x = x % y;
        }
        else {
            y = y % x;
        }
    }
    return Math.max(x, y);
}
function set_vectors() {
    let q = document.getElementById("question");
    let list = [];
    for (let i = 0; i < 6; i++) {
        list.push(Math.floor(Math.random() * 21 - 10));
    }
    [a, b, c, d, e, f] = list;
    q.innerHTML = `\\(\\text{What is }\\langle${a},${b},${c}\\rangle\\cdot\\langle${d},${e},${f}\\rangle?\\)`;
    c1 = a * d + b * e + c * f;
    MathJax.typeset();
}
function set_vectors2() {
    let q = document.getElementById("question");
    let list = [];
    for (let i = 0; i < 6; i++) {
        list.push(Math.floor(Math.random() * 21 - 10));
    }
    [a, b, c, d, e, f] = list;
    q.innerHTML = `\\(\\text{What is }\\langle${a},${b},${c}\\rangle\\times\\langle${d},${e},${f}\\rangle?\\)`;
    c1 = b * f - c * e;
    c2 = c * d - a * f;
    c3 = a * e - b * d;
    MathJax.typeset();
}
function set_roots() {
    let q = document.getElementById("question");
    let list = [];
    for (let i = 0; i < 3; i++) {
        list.push(Math.floor(Math.random() * 20 + 1));
    }
    let [a, b, c] = list;
    q.innerHTML = `\\(\\text{Simplify } \\sqrt{${a}^2+${b}^2+${c}^2}.\\)`;
    let res = a * a + b * b + c * c;
    let square = 1;
    for (let num = 1; num * num <= res; num++) {
        if (res % (num * num) === 0) {
            square = num;
        }
    }
    c1 = square;
    c2 = res / (square * square);
    MathJax.typeset();
}
function set_tan_curves() {
    let q = document.getElementById("question");
    let list = [];
    for (let i = 0; i < 6; i++) {
        list.push(Math.floor(Math.random() * 3 + 1));
    }
    if (list[2] === list[5]) {
        if (list[2] === 5) {
            list[5] -= 1;
        }
        else {
            list[5] += 1;
        }
    }
    for (let i = 0; i < 2; i++) {
        list.push(Math.floor(Math.random() * 5 - 2));
    }
    let z = list[0] * Math.pow(list[6], list[1]) * Math.pow(list[7], list[2]) + list[3] * Math.pow(list[6], list[4]) * Math.pow(list[7], list[5]);
    c1 = list[0] * list[1] * Math.pow(list[6], list[1] - 1) * Math.pow(list[7], list[2]) + list[3] * list[4] * Math.pow(list[6], list[4] - 1) * Math.pow(list[7], list[5]);
    c2 = -list[6];
    c3 = list[0] * list[2] * Math.pow(list[6], list[1]) * Math.pow(list[7], list[2] - 1) + list[3] * list[5] * Math.pow(list[6], list[4]) * Math.pow(list[7], list[5] - 1);
    c4 = -list[7];
    c5 = -z;
    q.textContent = `\\(\\text{What is the equation of the plane tangent to}\\
    z=${list[0] !== 1 ? list[0] : ''}x${list[1] !== 1 ? '^' + list[1] : ''}
    y${list[2] !== 1 ? '^' + list[2] : ''}+
    ${list[3] !== 1 ? list[3] : ''}x
    ${list[4] !== 1 ? '^' + list[4] : ''}y
    ${list[5] !== 1 ? '^' + list[5] : ''}
    \\text{ at the point }
    (${list[6]},${list[7]},${z})?\\)`;
    MathJax.typeset();
}
function set_partials() {
    let q = document.getElementById("question");
    let [num, denom] = [0, 0];
    let part = 0;
    let p_list = [];
    let c_list = [];
    let x_list = [];
    while (denom === 0) {
        p_list = [];
        for (let i = 0; i < 6; i++) {
            p_list.push(Math.floor(Math.random() * 3 + 1));
        }
        c_list = [];
        for (let i = 0; i < 3; i++) {
            let m = Math.floor(Math.random() * 11 - 5);
            while (m === 0) {
                m = Math.floor(Math.random() * 11 - 5);
            }
            c_list.push(m);
        }
        x_list = [];
        for (let i = 0; i < 3; i++) {
            let m = Math.floor(Math.random() * 5 - 2);
            while (m === 0) {
                m = Math.floor(Math.random() * 5 - 2);
            }
            x_list.push(m);
        }
        part = Math.floor(Math.random() * 6);
        let x_partial = p_list[0] * c_list[0] * Math.pow(x_list[0], p_list[0] - 1) * Math.pow(x_list[1], p_list[1]) +
            p_list[5] * c_list[2] * Math.pow(x_list[2], p_list[4]) * Math.pow(x_list[0], p_list[5] - 1);
        let y_partial = p_list[1] * c_list[0] * Math.pow(x_list[0], p_list[0]) * Math.pow(x_list[1], p_list[1] - 1) +
            p_list[2] * c_list[1] * Math.pow(x_list[1], p_list[2] - 1) * Math.pow(x_list[2], p_list[3]);
        let z_partial = p_list[3] * c_list[1] * Math.pow(x_list[1], p_list[2]) * Math.pow(x_list[2], p_list[3] - 1) +
            p_list[4] * c_list[2] * Math.pow(x_list[2], p_list[4] - 1) * Math.pow(x_list[0], p_list[5]);
        if (part === 0) {
            [num, denom] = [x_partial, y_partial];
        }
        if (part === 1) {
            [num, denom] = [y_partial, z_partial];
        }
        if (part === 2) {
            [num, denom] = [z_partial, x_partial];
        }
        if (part === 3) {
            [num, denom] = [x_partial, z_partial];
        }
        if (part === 4) {
            [num, denom] = [y_partial, x_partial];
        }
        if (part === 5) {
            [num, denom] = [z_partial, y_partial];
        }
        let g = gcd(Math.abs(num), Math.abs(denom));
        c1 = num / g, c2 = denom / g;
    }
    q.textContent = `\\(\\text{Given }F(x,y,z)=
    ${Math.abs(c_list[0]) === 1 ? c_list[0] === -1 ? '-' : '' : c_list[0]}
    x${p_list[0] !== 1 ? '^' + p_list[0] : ''}
    y${p_list[1] !== 1 ? '^' + p_list[1] : ''}${c_list[1] < 0 ? '' : '+'}
    ${Math.abs(c_list[1]) === 1 ? c_list[1] === -1 ? '-' : '' : c_list[1]}
    y${p_list[2] !== 1 ? '^' + p_list[2] : ''}
    z${p_list[3] !== 1 ? '^' + p_list[3] : ''}${c_list[2] < 0 ? '' : '+'}
    ${Math.abs(c_list[2]) === 1 ? c_list[2] === -1 ? '-' : '' : c_list[2]}
    z${p_list[4] !== 1 ? '^' + p_list[4] : ''}
    x${p_list[5] !== 1 ? '^' + p_list[5] : ''}, 
    \\text{ calculate }(\\frac{\\partial ${['x', 'y', 'z'][part % 3]}}{\\partial ${['y', 'z', 'x', 'z', 'x', 'y'][part]}})_{${['z', 'x', 'y', 'y', 'z', 'x'][part]}}
    \\text{ at }(${x_list[0]},${x_list[1]},${x_list[2]}).
    \\)`;
    MathJax.typeset();
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
        output.innerHTML = "\\(\\text{Correct.}\\)";
    }
    else {
        output.innerHTML = `\\(\\text{Incorrect. Answer was }${c1}.\\)`;
    }
    document.getElementById("next").style.visibility = "visible";
    output.style.visibility = "visible";
    MathJax.typeset();
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
        output.innerHTML = "\\(\\text{Correct.}\\)"
    }
    else {
        output.innerHTML = `\\(\\text{Incorrect. Answer was }\\langle${c1},${c2},${c3}\\rangle.\\)`;
    }
    document.getElementById("next").style.visibility = "visible";
    output.style.visibility = "visible";
    MathJax.typeset();
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
        output.textContent = "\\(\\text{Correct.}\\)";
    }
    else {
        output.textContent = `\\(\\text{Incorrect. Answer was }${c1 === 1 && c2 !== 1 ? "" : c1}\\sqrt{${c2 === 1 ? "" : c2}}.\\)`;
    }
    document.getElementById("next").style.visibility = "visible";
    output.style.visibility = "visible";
    MathJax.typeset();
}
function submit4() {
    if (!can_submit) {
        return;
    }
    can_submit = false;
    let output = document.getElementById("result");
    output.textContent = `\\(\\text{The answer was }
        0=${c1 === 0 ? '' : Math.abs(c1) === 1 ? c2 === 0 ? c1 < 0 ? '-x' : 'x' : '(x' + (c2 < 0 ? '' : '+') + c2 + ')' : c1 + (c2 === 0 ? 'x' : '(x' + (c2 < 0 ? '' : '+') + c2 + ')')}
        ${(c3 <= 0 || c1 === 0 ? '' : '+')}
        ${c3 === 0 ? '' : Math.abs(c3) === 1 ? c4 === 0 ? c3 < 0 ? '-y' : 'y' : '(y' + (c4 < 0 ? '' : '+') + c4 + ')' : c3 + (c4 === 0 ? 'y' : '(y' + (c4 < 0 ? '' : '+') + c4 + ')')}
        -
        ${c5 === 0 ? 'z' : '(z' + (c5 < 0 ? '' : '+') + c5 + ')'}.\\)`;
    document.getElementById("next").style.visibility = "visible";
    output.style.visibility = "visible";
    MathJax.typeset();
}
function submit5() {
    if (!can_submit) {
        return;
    }
    can_submit = false;
    let output = document.getElementById("result");
    output.textContent = `\\(\\text{The answer was }${c1 * c2 < 0 ? '-' : ''}
    ${Math.abs(c2) === 1 ? c1 : '\\frac{' + Math.abs(c1) + '}{' + Math.abs(c2) + '}'}.\\)`;
    document.getElementById("next").style.visibility = "visible";
    output.style.visibility = "visible";
    MathJax.typeset();
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
    if (document.title === "Tangent Planes") {
        set_tan_curves();
    }
    if (document.title === "Partial Derivatives") {
        set_partials();
    }
    document.getElementById("next").style.visibility = "hidden";
    document.getElementById("result").style.visibility = "hidden";
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
