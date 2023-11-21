function valor() {
    var idade = parseInt(document.getElementById('idade').value);
    var peso = parseFloat(document.getElementById('peso').value);
    var altura = parseFloat(document.getElementById('altura').value);
    var imc = calcularIMC(peso, altura);
    var operadoraAprecoPlanoBasico = this.precoOperadoraA("basico", idade, imc).toFixed(2);
    var operadoraAprecoPlanoStandard = this.precoOperadoraA("standard", idade, imc).toFixed(2);
    var operadorAprecoPlanoPremium = this.precoOperadoraA("premium", idade, imc).toFixed(2);
    var operadoraBprecoPlanoBasico = this.precoOperadoraB("basico",imc).toFixed(2);
    var operadoraBprecoPlanoStandard = this.precoOperadoraB("standard",imc).toFixed(2);
    var operadoraBprecoPlanoPremium =  this.precoOperadoraB("premium",imc).toFixed(2);


    if (!isNaN(peso) && !isNaN(altura)) {
        document.getElementById("resultado").innerHTML = imc.toFixed(2);
        //calculo da operadora A
        document.getElementById("operadoraA-basico").innerHTML = operadoraAprecoPlanoBasico;
        document.getElementById("operadoraA-standard").innerHTML = operadoraAprecoPlanoStandard;
        document.getElementById("operadoraA-premium").innerHTML = operadorAprecoPlanoPremium;
        //calculo da operadora B
        document.getElementById("operadoraB-basico").innerHTML = operadoraBprecoPlanoBasico;
        document.getElementById("operadoraB-standard").innerHTML = operadoraBprecoPlanoStandard;
        document.getElementById("operadoraB-premium").innerHTML = operadoraBprecoPlanoPremium;
        //calculo do plano mais barato
        
        document.getElementById("planoMaisBarato").innerHTML = "É recomendado " + this.valorDoPlanoMaisBarato(operadoraAprecoPlanoBasico, operadoraAprecoPlanoStandard,
            operadorAprecoPlanoPremium, operadoraBprecoPlanoBasico, operadoraBprecoPlanoStandard, operadoraBprecoPlanoPremium);

    }else{
        alert("É necessário preencher todos os campos.");
    }
}  

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function precoOperadoraA(tipoDoPlano, idade, imc) {
    switch (tipoDoPlano) {
        case 'basico':
            return 100 + (idade * 10 * (imc / 10));
        case 'standard':
            return (150 + (idade * 15)) * (imc / 10);
        case 'premium':
            return (200 - (imc * 10) + (idade * 20)) * (imc / 10);
        default:
            return 0;
    }

}
function calculoComorbidade(imc){
    var comorbidade = 0;
        if (imc < 18.5) {
            //IMC abaixo do peso
            comorbidade = 10;
        } else if (imc >= 18.5 && imc < 24.9) {
            //IMC normal
            comorbidade = 1;
        } else if (imc >= 25 && imc < 29.9) {
            // IMC for sobrepeso
            comorbidade = 6;
        } else if (imc >= 30 && imc < 34.9) {
            //IMC for obesidade
            comorbidade = 10;
        } else if (imc >= 35 && imc < 39.9) {
            //IMC for obesidade mórbida grave
            comorbidade = 20;
        } else {
            // IMC for obesidade mórbida muito grave
            comorbidade = 30;
        }
        return comorbidade;

}

/**
Plano básico: preço é igual a 100 + (fator de comorbidade * 10 * (IMC / 10)).
Plano standard: preço é igual a (150 + (fator de comorbidade * 15)) * (IMC / 10).
Plano premium: preço é igual a (200 - (IMC * 10) + (fator de comorbidade * 20)) * (IMC / 10
*/
function precoOperadoraB(tipoDoPlano, imc){
    var fatorComorbidade = this.calculoComorbidade(imc);
    switch (tipoDoPlano) {
        case 'basico':
            return 100 + (fatorComorbidade * 10 * (imc / 10));
        case 'standard':
            return (150 + (fatorComorbidade * 15)) * (imc / 10);
        case 'premium':
            return (200 - (imc * 10) + (fatorComorbidade * 20)) * (imc / 10);
        default:
            return 0;
    }           
}

function valorDoPlanoMaisBarato(...valores) {
    var menorValor = String(Math.min(...valores));
    var planoMaisBarato = "";
  
   switch (menorValor) {
    case valores[0]: 
        planoMaisBarato = "o plano básico da operadora A"
        
        break;

    case valores[1]: 
        planoMaisBarato = "o plano standard da operadora A"
        
        break;
        
    case valores[2]: 
        planoMaisBarato = "o plano premium da operadora A"
        
        break;

    case valores[3]: 
        planoMaisBarato = "o plano básico da operadora B"
        
        break;

    case valores[4]: 
        planoMaisBarato = "o plano standard da operadora B"
        
        break;
        
    case valores[5]: 
        planoMaisBarato = "o plano premium da operadora B"
        
        break;
   
    default:
        break;
   }
   return planoMaisBarato;
  }
  