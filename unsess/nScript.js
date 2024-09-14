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

        // Troca a vírgula por ponto para o uso do decimal
        if(term === ",") term = ".";

        // Verifica se é um número e não um operador
        if (!this.operators.includes(term) && term !== ".") {
            // Se for um número ou ponto decimal
            if (lastTerm === "0" && term !== ".") {
                this.display.value = term; // Substitui zero inicial
            } else if (!this.operators.includes(lastTerm)) {
                this.display.value += term; // Adiciona número
            }
        } else if (this.operators.includes(term) && !this.operators.includes(lastTerm)) {
            this.display.value += term; // Adiciona operador
        }

        // Verifica se já existe um ponto no número atual (antes de adicionar um novo ponto)
        const currentNumber = this.display.value.split(/[\+\-\*\/\%]/).pop(); // Pega o último número
        console.log(currentNumber)
        if (term === "." && currentNumber.includes(".")) {
            this.display.value = this.display.value.slice(0, -1); // Remove o ponto se já existe
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
        this.display.value = 0;
    },

    clearOne() {
        this.display.value = this.display.value.slice(0, -1) || 0; // Garantir não ficar vazio
    }
}

calculator.click();
calculator.keyDown();
