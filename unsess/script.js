const calculator = {
    display: document.querySelector("#display"),
    btns: document.querySelectorAll("button"),
    operators: ["/", "*", "+", "-", "%"],
    aceptedKeys: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ","].concat(this.operators),

    click() {

        this.btns.forEach(btn => {

            btn.onclick = e => {
                let term;

                Object.keys(btn.dataset).map(key => {
                    term = (key == "value" || key == "operator") ? btn.dataset[key] : false;
                });
              
                if(term) this.readTerm(term);
                if(btn.classList.contains("delete")) this.clearAll();
                if(btn.classList.contains("backspace")) this.clearOne();
                if(btn.classList.contains("calculate")) this.calculate();
            }
        });
    },

    keyDown(){

        document.onkeydown = e => {
            if(this.aceptedKeys.includes(e.key)) this.readTerm(e.key);
            if(e.key == "Delete") this.clearAll();
            if(e.key == "Backspace") this.clearOne();
            if(e.key == "Enter") this.calculate();
        }
    },

    readTerm(term){

        const terms = this.display.value.split("");
        let lastTerm = terms[terms.length - 1];

        if(term == ",") term = ".";
        
        if(lastTerm == 0) {

            const numTerm = this.display.value.split(/[\/\*\-\+\%]/);

            if (isNaN(term)) {
                
                this.display.value += term;

            } else if(!isNaN(term)) {

                if(this.display.value.length == 1) {
                    this.display.value = term;
                    
                } else {
                    this.display.value += term;

                }
            }

        } else if(this.operators.includes(term)) {

            if(!isNaN(lastTerm)) this.display.value += term;

            else if(lastTerm != "." && lastTerm != term) {
                terms[terms.length - 1] = term;
                this.display.value = terms.join("");
            }

        } else if(lastTerm != ".") {

            this.display.value += term; 

        } else if(lastTerm == "." && term != ".") {

            this.display.value += term; 
    
        }
    },

    calculate() {
        const terms = this.display.value.split("");
        let lastTerm = terms[terms.length - 1];
        
        if(this.display.value) {
            if(this.operators.includes(lastTerm)) this.clearOne();
            
            this.display.value = eval(this.display.value);
        }
    },

    clearAll() {
        this.display.value = 0;
    },

    clearOne() {
        if(this.display.value.length == 1) this.clearAll()
        else {
            this.display.value = this.display.value.slice(0, this.display.value.length - 1);
        }       
    }
}

calculator.click();
calculator.keyDown();