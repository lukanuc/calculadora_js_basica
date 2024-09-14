const calculator = {
    display: document.querySelector("#display"),
    btns: document.querySelectorAll("button"),
    operators: ["/", "*", "+", "-", "%"],
    aceptedKeys: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ",", "/", "*", "+", "-", "%"],
    
    click() {
        this.btns.forEach(btn => {
            btn.onclick = e => {
                let term = btn.dataset.value || btn.dataset.operator || false;

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

    readTerm(term) {
        const terms = this.display.value.split("");
        let lastTerm = terms[terms.length - 1] || "";

        if(term === ",") term = ".";

        if (lastTerm === "0" && term !== ".") {
            this.display.value = term;
        } else if (this.operators.includes(term) && !this.operators.includes(lastTerm)) {
            this.display.value += term;
        } else if (!this.operators.includes(term)) {
            this.display.value += term;
        }
    },

    calculate() {
        try {
            const lastTerm = this.display.value.slice(-1);
            if(this.operators.includes(lastTerm)) this.clearOne();
            this.display.value = String(eval(this.display.value)); // Evitar NaN através do uso de `String`
        } catch (error) {
            this.display.value = "Error"; // Mensagem em caso de erro
        }
    },

    clearAll() {
        this.display.value = "";
    },

    clearOne() {
        this.display.value = this.display.value.slice(0, -1) || ""; // Garantir não ficar vazio
    }
}

calculator.click();
calculator.keyDown();
