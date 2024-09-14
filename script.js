const calculator = {
    display: document.querySelector("#display"),
    btns: document.querySelectorAll("button"),
    operators: ["/", "*", "+", "-", "%"],

    click() {
        this.btns.forEach(btn => {
            btn.onclick = e => {
                
                let term = btn.dataset.number || btn.dataset.operator || false;

                if(term) this.readTerm(term);
                if(btn.dataset.action == "Delete") this.clearAll();
                if(btn.dataset.action == "Backspace") this.clearLast();
                if(btn.dataset.action == "Enter") this.calculate();
            }
        });
    },

    keyDown(){
        const aceptedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ","].concat(this.operators);

        document.onkeydown = e => {

            this.keyPress(e, "add")

            if(aceptedKeys.includes(e.key)) this.readTerm(e.key);
            if(e.key == "Delete") this.clearAll();
            if(e.key == "Backspace") this.clearLast();
            if(e.key == "Enter") this.calculate();
        }


        document.onkeyup = e => this.keyPress(e, "remove");
    },

    keyPress(e, act) {
        this.btns.forEach(btn => {
            const data = btn.dataset.number || btn.dataset.operator || btn.dataset.action;

            (e.key == data && act == "add") ? btn.classList.add("active") : btn.classList.remove("active");
            
        });
    },

    readTerm(term) {


        if(this.display.value === "Error") this.clearAll(); // Linpando o display se tiver mensagem de erro

        const terms = this.display.value.split("");
        let lastTerm = terms[terms.length - 1] || "";

        // Troca a vírgula por ponto para o uso do decimal
        if(term === ",") term = ".";

        // Se for um número ou um ponto decimal e não um operador:
        if (!isNaN(term) || term == ".") {

            // Display vazio:
            // Não pode receber ponto decimal. 
            // Inserindo primeiro Número/termo

            if(terms.length == 0 && term !== ".") {
                this.display.value = term;
            }

            // Display já tem caracter:
            // Adicionando outros Numeros, ponto decimal incluido
            else if(terms.length > 0) {

                // adicionando ponto flutuante se o ultimo número
                // não for decimal
                if(term === "." && lastTerm !== "." && !this.hasFloat()) {
                    this.display.value += term;  
                } 
                // Adicionando qualquer caracter númerico
                else if(term !== "."){
                    this.display.value += term;
                }
            }
            
        } 
        // Adicionando Operadores: apenas se o display não estiver fazio
        else if(this.operators.includes(term) && terms.length > 0) {
            
            // Adiciona operador se o ultimo termo for numero
            if(!isNaN(lastTerm)) this.display.value += term;
            
            // Substitui operador se o ultimo caracter no display
            // for um operador diferente do novo operador inserido
            else if(this.operators.includes(lastTerm) && lastTerm !== term) {
                this.clearLast();
                this.display.value += term;
            }
        }
    },

    calculate() {
        try {
            // Calcula apenas se o display não estiver vazio.
            // Para evitar aparecer undefined no display
            if(this.display.value.length > 0 && this.display.value != "Error") {

                const lastTerm = this.display.value.slice(-1);
                
                if(this.operators.includes(lastTerm) || lastTerm === ".") this.clearLast();
    
                this.display.value = String(eval(this.display.value)); // Evitar NaN através do uso de `String`
            }

        } catch (error) {
            this.display.value = "Error";
        }
    },

    clearAll() {
        this.display.value = "";
    },

    clearLast() {
        this.display.value = this.display.value.slice(0, -1) || "";
    },

    hasFloat() {
        const currentNumber = this.display.value.split(/[\+\-\*\/\%]/).pop(); // Pega o último número
        return currentNumber.includes(".") ? true : false
    },
}

calculator.click();
calculator.keyDown();