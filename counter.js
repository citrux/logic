/* 3 bit counter based on JK flip-flops */
var node = [];
node = node.concat(new X(150, 40), new X(185, 40, 1), new X(200, 40), new X(185, 100, 1));
node = node.concat(new X(200, 100), new X(150, 70), new X(170, 70, 1), new X(260, 70));
node = node.concat(new X(275, 70, 1), new X(275, 40, 1), new X(310, 40), new X(275, 100, 1));
node = node.concat(new X(310, 100), new X(200, 70), new X(170, 135, 1), new X(290, 135, 1));
node = node.concat(new X(290, 70, 1), new X(310, 70), new X(370, 70), new X(385, 70, 1));
node = node.concat(new X(275, 150, 1), new X(275, 200), new X(385, 165, 1), new X(250, 165, 1));
node = node.concat(new X(250, 200), new X(410, 70), new X(395, 150, 1), new X(395, 100, 1));
node = node.concat(new X(410, 100), new X(470, 85), new X(480, 85, 1), new X(495, 135, 1));
node = node.concat(new X(495, 70, 1), new X(510, 70), new X(480, 100, 1), new X(510, 100));
node = node.concat(new X(480, 40, 1), new X(510, 40), new X(570, 70), new X(585, 70, 1));
node = node.concat(new X(585, 180, 1), new X(225, 180, 1), new X(225, 200));

var counterIN = [true, false, false, false, false];
function counter3bit(/* arrays */ el, wire, inputs) {
    // J, K #1
    el.push(new INPUT(node[0], inputs[0]));
    el.push(new TEXT(115, 30, '"1"'));
    wire.push(new WIRE(node[0], node[1]));
    wire.push(new WIRE(node[1], node[2]));
    wire.push(new WIRE(node[1], node[3]));
    wire.push(new WIRE(node[3], node[4]));
    // C
    el.push(new INPUT(node[5], inputs[1]));
    el.push(new TEXT(120, 60, 'C'));
    wire.push(new WIRE(node[5], node[6]));
    wire.push(new WIRE(node[6], node[13]));
    wire.push(new WIRE(node[6], node[14]));
    wire.push(new WIRE(node[14], node[15]));
    wire.push(new WIRE(node[15], node[16]));
    wire.push(new WIRE(node[16], node[17]));
    wire.push(new WIRE(node[15], node[31]));
    wire.push(new WIRE(node[31], node[32]));
    wire.push(new WIRE(node[32], node[33]));
    // flip-flops
    el.push(new JK(node[2], node[4], node[13], node[7], inputs[2]));
    el.push(new JK(node[10], node[12], node[17], node[18], inputs[3]));
    el.push(new JK(node[37], node[35], node[33], node[38], inputs[4]));
    // J, K #2
    wire.push(new WIRE(node[7], node[8]));
    wire.push(new WIRE(node[8], node[9]));
    wire.push(new WIRE(node[9], node[10]));
    wire.push(new WIRE(node[8], node[11]));
    wire.push(new WIRE(node[11], node[12]));
    // OUT #1
    wire.push(new WIRE(node[11], node[20]));
    wire.push(new WIRE(node[20], node[21]));
    el.push(new OUTPUT(node[21]));
    // OUT #2
    wire.push(new WIRE(node[18], node[19]));
    wire.push(new WIRE(node[19], node[22]));
    wire.push(new WIRE(node[22], node[23]));
    wire.push(new WIRE(node[23], node[24]));
    el.push(new OUTPUT(node[24]));
    // J, K #3
    wire.push(new WIRE(node[19], node[25]));
    wire.push(new WIRE(node[20], node[26]));
    wire.push(new WIRE(node[26], node[27]));
    wire.push(new WIRE(node[27], node[28]));
    el.push(new AND(node[25], node[28], node[29]));
    wire.push(new WIRE(node[29], node[30]));
    wire.push(new WIRE(node[30], node[34]));
    wire.push(new WIRE(node[34], node[35]));
    wire.push(new WIRE(node[30], node[36]));
    wire.push(new WIRE(node[36], node[37]));
    // OUT #3
    wire.push(new WIRE(node[38], node[39]));
    wire.push(new WIRE(node[39], node[40]));
    wire.push(new WIRE(node[40], node[41]));
    wire.push(new WIRE(node[41], node[42]));
    el.push(new OUTPUT(node[42]));
    el.push(new TEXT(175, 190, 'OUT'));
    
    dataout = [node[7].state, node[18].state, node[38].state];
    return dataout;
}

function reload() {
    var wire = []; var el = [];

    var datagot = [];
    datagot = counter3bit(el, wire, counterIN);
    counterIN[1] = !counterIN[1];
    counterIN[2] = datagot[0];    
    counterIN[3] = datagot[1];    
    counterIN[4] = datagot[2];
    
    clear(dynamic);
    for (i in wire) { wire[i].draw(dynamic) }
    for (i in node) { node[i].draw(dynamic) }
    for (i in el) {
        if (el[i].type == 'dynamic')
            el[i].draw(dynamic);
        else if (arguments[0])
            el[i].draw(static);
    }

    setTimeout("reload(false)", 1000);
}

reload(true);
