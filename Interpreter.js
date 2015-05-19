///<reference path="World.ts"/>
///<reference path="Parser.ts"/>
var Interpreter;
(function (Interpreter) {
    //////////////////////////////////////////////////////////////////////
    // exported functions, classes and interfaces/types
    function interpret(parses, currentState) {
        var interpretations = [];
        parses.forEach(function (parseresult) {
            var intprt = parseresult;
            intprt.intp = interpretCommand(intprt.prs, currentState);
            interpretations.push(intprt);
        });
        if (interpretations.length) {
            return interpretations;
        }
        else {
            throw new Interpreter.Error("Found no interpretation");
        }
    }
    Interpreter.interpret = interpret;
    function interpretationToString(res) {
        return res.intp.map(function (lits) {
            return lits.map(function (lit) { return literalToString(lit); }).join(" & ");
        }).join(" | ");
    }
    Interpreter.interpretationToString = interpretationToString;
    function literalToString(lit) {
        return (lit.pol ? "" : "-") + lit.rel + "(" + lit.args.join(",") + ")";
    }
    Interpreter.literalToString = literalToString;
    var Error = (function () {
        function Error(message) {
            this.message = message;
            this.name = "Interpreter.Error";
        }
        Error.prototype.toString = function () { return this.name + ": " + this.message; };
        return Error;
    })();
    Interpreter.Error = Error;
    //////////////////////////////////////////////////////////////////////
    // private functions
    function interpretCommand(cmd, state) {
        // This returns a dummy interpretation involving two random objects in the world
        /*var objs = Array.prototype.concat.apply([], state.stacks);
        var a = objs[getRandomInt(objs.length)];
        var b = objs[getRandomInt(objs.length)]; */

        //Check if start object is in the world
        if (!isInState(cmd['ent']['obj'], state)) {
            console.log(cmd + "Start object not in the world")
            return [];
        }
        //Check if goal is in the world
        if (!isInState(cdm['loc']['ent']['obj'], state)) {
            console.log(obj.goa)
            return [];
        }
        //Check if the move is physical possible
        if (!isAllowed(obj)) {
            return [];
        }
        
        var intprt = [[
            { pol: true, rel: "ontop", args: [a, "floor"] },
            { pol: true, rel: "holding", args: [b] }
        ]];
        return intprt;
        }

    }
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    // Check if an object is in the state
    // obj.[size, color, form]
    function isInState(obj, state) {
        if (obj in state.stacks) {
            return true
        }
        else {
            return false;
        }        
    }
    function isAllowed(obj) {
        
    }
})(Interpreter || (Interpreter = {}));
//put the white ball that is in a box on the floor:
var example1 = 
{cmd: "move",
  ent: {quant: "the",
        obj: {obj: {size: null, color: "white", form: "ball"},
              loc: {rel: "inside",
                    ent: {quant: "any",
                          obj: {size: null, color: null, form: "box"}}}}},
  loc: {rel: "ontop",
        ent: {quant: "the",
              obj: {size: null, color: null, form: "floor"}}}};

//put the white ball in a box that is on the floor:
var example2 = 
{cmd: "move",
  ent: {quant: "the",
        obj: {size: null, color: "white", form: "ball"}},
  loc: {rel: "inside",
        ent: {quant: "any",
              obj: {obj: {size: null, color: null, form: "box"},
                    loc: {rel: "ontop",
                          ent: {quant: "the",
                                obj: {size: null, color: null, form: "floor"}}}}}}}
