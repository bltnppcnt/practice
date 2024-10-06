let nav_idx = -1;
let hovering = false;
const nav_links = [[], ["dot.html", "cross.html", "simplify.html"], ["distance.html"], ["tangent.html","pderiv.html"], ["about.html"]];
const nav_titles = [[], ["Dot Product", "Cross Product", "Square Roots"], ["Distances"], ["Tangent Planes", "Partials"], ["About"]];
let [a, b, c, d, e, f] = [0, 0, 0, 0, 0, 0];
let [c1, c2, c3, c4, c5] = [0, 0, 0, 0, 0];
let can_submit = true;
let [p1, p2] = [0, 0];
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
        <div class="nav-item" id="a-comp" onclick="menu(2)">Distances</div >
        <div class="nav-item" id="a-deriv" onclick="menu(3)">Derivatives</div>
        <div class="nav-item" id="a-other" onclick="menu(4)">Other</div>
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
    if (document.title === "Distances Practice") {
        set_dist();
    }
}
function eqn_parser(str) {
    // hours spent: 0.2
    /* Given a string, return a m by n by o matrix m
       where the equation represented by the string
       passed in is equivalent to
       \sum_{i=0}^m\sum_{j=0}^n\sum_{k=0}^o m[i][j][k]x^iy^jz^k
    */
    let arr = str.split('=');
    if (arr.length != 2) {
        return null;
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
function largest_square(n) {
    let square = 1;
    for (let i = 0; i * i <= n; i++) {
        if (n % (i * i) === 0) {
            square = i;
        }
    }
    return square;
}
function render_line(a, b, c, d, e, f) { // (x-d)/a=(y-e)/b=(z-f)/c
    return `${a < 0 ? '-' : ''}\\frac{x${d !== 0 ? d < 0 ? '+' + -d : '-' + d : ''}}{${Math.abs(a)}}=
            ${b < 0 ? '-' : ''}\\frac{y${e !== 0 ? e < 0 ? '+' + -e : '-' + e : ''}}{${Math.abs(b)}}=
            ${c < 0 ? '-' : ''}\\frac{z${f !== 0 ? f < 0 ? '+' + -f : '-' + f : ''}}{${Math.abs(c)}}`;
}
function render_plane(a, b, c, d, e, f) { // 0=a(x-d)+b(y-e)+c(z-f)
    let ret = `0=`;
    lst = [a, b, c, d, e, f];
    for (let i = 0; i < 3; i++) {
        let k = ['x', 'y', 'z'][i];
        ret += `${lst[i] === 0 ? '' : Math.abs(lst[i]) === 1 ?
        lst[3 + i] === 0 ? lst[i] < 0 ? '-' + k : k : (lst[i] < 0 ? '-' : '') +
        '(' + k + (lst[3 + i] > 0 ? '' : '+') + (-lst[3 + i]) + ')' : lst[i] +
        (lst[3 + i] === 0 ? k : '(' + k + (lst[3 + i] > 0 ? '' : '+') + (-lst[3 + i]) + ')')}`;
        if (i === 0) {
            ret += `${lst[1] === 0 ? lst[2] === 0 ? '' : lst[2] < 0 ? '' : '+' : lst[1] < 0 ? '' : '+'}`;
        }
        if (i === 1) {
            ret += `${lst[1] === 0 ? '' : lst[2] < 0 ? '' : '+'}`;
        }
    }
    return ret;
}
function mod_pow(base, exp, mod) {
    base %= mod;
    res = 1;
    while (exp) {
        if (exp & 1) res = (res * base) % mod;
        base = (base * base) % mod;
        exp >>= 1;
    }
    return res;
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
    let square = largest_square(res);
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
function set_dist() {
    let q = document.getElementById("question");
    p1 = Math.floor(Math.random() * 3);
    p2 = Math.floor(Math.random() * 3);
    if (p1 > p2) {
        let tmp = p1;
        p1 = p2;
        p2 = tmp;
    }
    let p_lst = [];
    if (p1 === 0 && p2 === 0) {
        for (let i = 0; i < 6; i++) {
            p_lst.push(Math.floor(Math.random() * 21 - 10));
        }
        let res = Math.pow(p_lst[0] - p_lst[3], 2) + Math.pow(p_lst[1] - p_lst[4], 2) + Math.pow(p_lst[2] - p_lst[5], 2);
        let square = largest_square(res);
        c1 = square;
        c2 = res / (square * square);
        c3 = 1;
        q.textContent = `\\(\\text{What is the distance between the point }
            (${p_lst[0]},${p_lst[1]},${p_lst[2]})\\text{ and the point }
            (${p_lst[3]},${p_lst[4]},${p_lst[5]})?\\)`;
    }
    if (p1 === 0 && p2 === 1) {
        for (let i = 0; i < 6; i++) {
            p_lst.push(Math.floor(Math.random() * 21 - 10));
        }
        for (let i = 0; i < 3; i++) {
            let m = Math.floor(Math.random() * 21 - 10);
            while (m === 0) {
                m = Math.floor(Math.random() * 21 - 10);
            }
            p_lst.push(m);
        }
        let r = [p_lst[0] - p_lst[3], p_lst[1] - p_lst[4], p_lst[2] - p_lst[5]];
        let cross = [r[1] * p_lst[8] - r[2] * p_lst[7], r[2] * p_lst[6] - r[0] * p_lst[8], r[0] * p_lst[7] - r[1] * p_lst[6]];
        let num = cross[0] * cross[0] + cross[1] * cross[1] + cross[2] * cross[2];
        let denom = p_lst[6] * p_lst[6] + p_lst[7] * p_lst[7] + p_lst[8] * p_lst[8];
        let square = largest_square(num * denom);
        let g = gcd(square, denom);
        c1 = square / g;
        c2 = num * denom / (square * square);
        c3 = denom / g;
        q.textContent = `\\(\\text{What is the distance between the point }
            (${p_lst[0]},${p_lst[1]},${p_lst[2]})\\text{ and the line }
            ` + render_line(p_lst[6], p_lst[7], p_lst[8], p_lst[3], p_lst[4], p_lst[5]) + `?\\)`;
    }
    if (p1 === 0 && p2 === 2) {
        for (let i = 0; i < 9; i++) {
            p_lst.push(Math.floor(Math.random() * 21 - 10));
        }
        while (p_lst[6] === 0 && p_lst[7] === 0 && p_lst[8] === 0) {
            p_lst[6] = Math.floor(Math.random() * 21 - 10);
            p_lst[7] = Math.floor(Math.random() * 21 - 10);
            p_lst[8] = Math.floor(Math.random() * 21 - 10);
        }
        let nonzero = [];
        for (let i = 6; i < 9; i++) {
            if (p_lst[i] !== 0) {
                nonzero.push(p_lst[i]);
            }
        }
        let g = Math.abs(nonzero[0]);
        for (let i = 1; i < nonzero.length; i++) {
            g = gcd(g, Math.abs(nonzero[i]));
        }
        for (let i = 6; i < 9; i++) {
            p_lst[i] /= g;
        }
        let r = [p_lst[0] - p_lst[3], p_lst[1] - p_lst[4], p_lst[2] - p_lst[5]];
        let dot = Math.abs(p_lst[6] * r[0] + p_lst[7] * r[1] + p_lst[8] * r[2]);
        let denom = p_lst[6] * p_lst[6] + p_lst[7] * p_lst[7] + p_lst[8] * p_lst[8];
        let square = largest_square(denom);
        g = gcd(dot * square, denom);
        c1 = dot * square / g;
        c2 = denom / (square * square);
        c3 = denom / g;
        q.innerHTML = `\\(\\text{What is the distance between the point }
            (${p_lst[0]}, ${p_lst[1]}, ${p_lst[2]})\\text{ and the plane }\\)<br/>\\(` +
            render_plane(p_lst[6], p_lst[7], p_lst[8], p_lst[3], p_lst[4], p_lst[5]) +
            `?\\)`;
    }
    if (p1 === 1 && p2 === 1) {
        if (Math.random() < 0.4) {
            for (let i = 0; i < 3; ++i) {
                p_lst.push(Math.floor(Math.random() * 21 - 10));
            }
            for (let i = 0; i < 6; ++i) {
                let m = Math.floor(Math.random() * 21 - 10);
                while (m === 0) {
                    m = Math.floor(Math.random() * 21 - 10);
                }
                p_lst.push(m);
            }
            for (let i = 0; i < 3; ++i) {
                p_lst.push(p_lst[i] + p_lst[3 + i] + p_lst[6 + i]);
            }
            c1 = 0;
            q.innerHTML = `\\(\\text{What is the distance between the line }` +
                render_line(p_lst[3], p_lst[4], p_lst[5], p_lst[0], p_lst[1], p_lst[2]) + 
                `\\)<br/>\\(\\text{ and the line }` +
                render_line(p_lst[6], p_lst[7], p_lst[8], p_lst[9], p_lst[10], p_lst[11]) +
                `?\\)`;
        }
        else {
            for (let i = 0; i < 6; ++i) {
                p_lst.push(Math.floor(Math.random() * 21 - 10));
            }
            for (let i = 0; i < 6; ++i) {
                let m = Math.floor(Math.random() * 21 - 10);
                while (m === 0) {
                    m = Math.floor(Math.random() * 21 - 10);
                }
                p_lst.push(m);
            }
            let cross = [p_lst[7] * p_lst[11] - p_lst[8] * p_lst[10], p_lst[8] * p_lst[9] - p_lst[6] * p_lst[11], p_lst[6] * p_lst[10] - p_lst[7] * p_lst[9]];
            let r = [p_lst[0] - p_lst[3], p_lst[1] - p_lst[4], p_lst[2] - p_lst[5]];
            let dot = Math.abs(cross[0] * r[0] + cross[1] * r[1] + cross[2] * r[2]);
            let denom = cross[0] * cross[0] + cross[1] * cross[1] + cross[2] * cross[2];
            let square = largest_square(denom);
            let g = gcd(dot * square, denom);
            c1 = dot * square / g;
            c2 = denom / (square * square);
            c3 = denom / g;
            q.innerHTML = `\\(\\text{What is the distance between the line }` +
                render_line(p_lst[3], p_lst[4], p_lst[5], p_lst[0], p_lst[1], p_lst[2]) + 
                `\\)<br/>\\(\\text{ and the line }` +
                render_line(p_lst[9], p_lst[10], p_lst[11], p_lst[6], p_lst[7], p_lst[8]) +
                `?\\)`;
        }
    }
    if (p1 === 1 && p2 === 2) {
        if (Math.random() < 0.4) {
            for (let i = 0; i < 9; ++i) {
                p_lst.push(Math.floor(Math.random() * 21 - 10));
            }
            for (let i = 0; i < 3; ++i) {
                let m = Math.floor(Math.random() * 21 - 10);
                while (m === 0) {
                    m = Math.floor(Math.random() * 21 - 10);
                }
                p_lst.push(m);
            }
            let dot = Math.abs(p_lst[3] * p_lst[9] + p_lst[4] * p_lst[10] + p_lst[5] * p_lst[11]);
            if (dot === 0) {
                let r = [p_lst[0] - p_lst[6], p_lst[1] - p_lst[7], p_lst[2] - p_lst[8]];
                dot = Math.abs(p_lst[3] * r[0] + p_lst[4] * r[1] + p_lst[5] * r[2]);
                let denom = p_lst[3] * p_lst[3] + p_lst[4] * p_lst[4] + p_lst[5] * p_lst[5];
                let square = largest_square(denom);
                let g = gcd(dot * square, denom);
                c1 = dot * square / g;
                c2 = denom / (square * square);
                c3 = denom / g;
            }
            else {
                c1 = 0;
            }
        }
        else {
            for (let i = 0; i < 9; ++i) {
                p_lst.push(Math.floor(Math.random() * 21 - 10));
            }
            p_lst[4] = [-7, -5, -3, -2, 2, 3, 5, 7][Math.floor(Math.random() * 8)];
            while (p_lst[3] % p_lst[4] === 0 || p_lst[5] % p_lst[4] === 0) {
                p_lst[3] = Math.floor(Math.random() * 21 - 10);
                p_lst[5] = Math.floor(Math.random() * 21 - 10);
            }
            let z = Math.floor(Math.random() * 21 - 10);
            let x = (mod_pow(p_lst[3], Math.abs(p_lst[4]) - 2, p_lst[4]) * -p_lst[5] * z) % p_lst[4];
            let y = (-p_lst[5] * z - p_lst[3] * x) / p_lst[4];
            while (x === 0 || y === 0 || z === 0) {
                z = Math.floor(Math.random() * 21 - 10);
                x = (mod_pow(p_lst[3], Math.abs(p_lst[4]) - 2, p_lst[4]) * -p_lst[5] * z) % p_lst[4];
                y = (-p_lst[5] * z - p_lst[3] * x) / p_lst[4];
            }
            p_lst.push(x);
            p_lst.push(y);
            p_lst.push(z);
            let r = [p_lst[0] - p_lst[6], p_lst[1] - p_lst[7], p_lst[2] - p_lst[8]];
            dot = Math.abs(p_lst[3] * r[0] + p_lst[4] * r[1] + p_lst[5] * r[2]);
            let denom = p_lst[3] * p_lst[3] + p_lst[4] * p_lst[4] + p_lst[5] * p_lst[5];
            let square = largest_square(denom);
            let g = gcd(dot * square, denom);
            c1 = dot * square / g;
            c2 = denom / (square * square);
            c3 = denom / g;
        }
        q.innerHTML = `\\(\\text{What is the distance between the line }` +
            render_line(p_lst[9], p_lst[10], p_lst[11], p_lst[6], p_lst[7], p_lst[8]) + 
            `\\)<br/>\\(\\text{ and the plane }` +
            render_plane(p_lst[3], p_lst[4], p_lst[5], p_lst[0], p_lst[1], p_lst[2]) +
            `?\\)`;
    }
    if (p1 === 2 && p2 === 2) {
        if (Math.random() < 0.4) {
            for (let i = 0; i < 12; i++) {
                p_lst.push(Math.floor(Math.random() * 21 - 10));
            }
            while (p_lst[3] === 0 && p_lst[4] === 0 && p_lst[5] === 0) {
                p_lst[3] = Math.floor(Math.random() * 21 - 10);
                p_lst[4] = Math.floor(Math.random() * 21 - 10);
                p_lst[5] = Math.floor(Math.random() * 21 - 10);
            }
            while (p_lst[9] === 0 && p_lst[10] === 0 && p_lst[11] === 0) {
                p_lst[9] = Math.floor(Math.random() * 21 - 10);
                p_lst[10] = Math.floor(Math.random() * 21 - 10);
                p_lst[11] = Math.floor(Math.random() * 21 - 10);
            }
            let cross = [p_lst[4] * p_lst[11] - p_lst[5] * p_lst[10], p_lst[5] * p_lst[9] - p_lst[3] * p_lst[11], p_lst[3] * p_lst[10] - p_lst[4] * p_lst[9]];
            let len = cross[0] * cross[0] + cross[1] * cross[1] + cross[2] * cross[2];
            if (len === 0) {
                let r = [p_lst[0] - p_lst[6], p_lst[1] - p_lst[7], p_lst[2] - p_lst[8]];
                let dot = Math.abs(r[0] * p_lst[3] + r[1] * p_lst[4] + r[2] * p_lst[5]);
                let denom = p_lst[3] * p_lst[3] + p_lst[4] * p_lst[4] + p_lst[5] * p_lst[5];
                let square = largest_square(denom);
                let g = gcd(dot * square, denom);
                c1 = dot * square / g;
                c2 = denom / (square * square);
                c3 = denom / g;
            }
            else {
                c1 = 0;
            }
        }
        else {
            for (let i = 0; i < 9; i++) {
                p_lst.push(Math.floor(Math.random() * 21 - 10));
            }
            while (p_lst[3] === 0 && p_lst[4] === 0 && p_lst[5] === 0) {
                p_lst[3] = Math.floor(Math.random() * 21 - 10);
                p_lst[4] = Math.floor(Math.random() * 21 - 10);
                p_lst[5] = Math.floor(Math.random() * 21 - 10);
            }
            let mult = [-1, 1][Math.floor(Math.random() * 2)];
            p_lst.push(p_lst[3] * mult);
            p_lst.push(p_lst[4] * mult);
            p_lst.push(p_lst[5] * mult);
            let r = [p_lst[0] - p_lst[6], p_lst[1] - p_lst[7], p_lst[2] - p_lst[8]];
            let dot = Math.abs(r[0] * p_lst[3] + r[1] * p_lst[4] + r[2] * p_lst[5]);
            let denom = p_lst[3] * p_lst[3] + p_lst[4] * p_lst[4] + p_lst[5] * p_lst[5];
            let square = largest_square(denom);
            let g = gcd(dot * square, denom);
            c1 = dot * square / g;
            c2 = denom / (square * square);
            c3 = denom / g;
        }
        q.innerHTML = `\\(\\text{What is the distance between the plane }` +
            render_plane(p_lst[9], p_lst[10], p_lst[11], p_lst[6], p_lst[7], p_lst[8]) + 
            `\\)<br/>\\(\\text{ and the plane }` +
            render_plane(p_lst[3], p_lst[4], p_lst[5], p_lst[0], p_lst[1], p_lst[2]) +
            `?\\)`;
    }
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
function submit6() {
    if (!can_submit) {
        return;
    }
    can_submit = false;
    let output = document.getElementById("result");
    if (c1 === 0) {
        output.textContent = `\\(\\text{The answer was 0.}\\)`;
    }
    else {
        output.textContent = `\\(\\text{The answer was }`;
        if (c1 === 1) {
            if (c3 === 1) {
                if (c2 === 1) {
                    output.textContent += `1.\\)`;
                }
                else {
                    output.textContent += `\\sqrt{${c2}}.\\)`;
                }
            }
            else {
                if (c2 === 1) {
                    output.textContent += `\\frac{1}{${c3}}.\\)`;
                }
                else {
                    output.textContent += `\\frac{\\sqrt{${c2}}}{${c3}}.\\)`;
                }
            }
        }
        else {
            if (c3 === 1) {
                if (c2 === 1) {
                    output.textContent += `${c1}.\\)`;
                }
                else {
                    output.textContent += `${c1}\\sqrt{${c2}}.\\)`;
                }
            }
            else {
                if (c2 === 1) {
                    output.textContent += `\\frac{${c1}}{${c3}}.\\)`;
                }
                else {
                    output.textContent += `\\frac{${c1}\\sqrt{${c2}}}{${c3}}.\\)`;
                }
            }
        }
    }
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
    if (document.title === "Distances Practice") {
        set_dist();
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
