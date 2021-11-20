// atividade módulos 9 e 11 PROG WEB - 182803 Gabriel T. Vastella

var jogadorAtual = "X";
var finished = false;
var usadas = [];
var marcadasX = [];
var marcadasO = [];
var venceu;
//variáveis inicias para o jogo//



// checagem de botão reiniciar
document.getElementById('reiniciar').onclick = function(e) {
    
    finished = false;
    usadas = [];
    marcadasX = [];
    marcadasO = [];
    var jogadorAtual = "X";
    //limpar e redefinir todas as variáveis

    document.getElementById("statusJogo").innerHTML=("<img src='./icons/arrow.png' class='jogoIcon'> Vez do jogador: " + jogadorAtual);
    var caixas = document.getElementsByClassName('caixa');
    
    for ( var i = 0; i < caixas.length; i++) {
        caixas[i].style.removeProperty('background-image');
        caixas[i].style.cursor = 'pointer';  
    }    

    //limpar todas as caixas e as tornar clicáveis de novo
};



function checarVencedor(jogador, atual){


    //checar vencedor em todas as possibilidades de vitória

    atual = parseInt(atual);
    checagem = window["marcadas" + jogador];
    if (checagem.includes(1) && checagem.includes(2) && checagem.includes(3))
        return true;
    if (checagem.includes(4) && checagem.includes(5) && checagem.includes(6))
        return true;
    if (checagem.includes(7) && checagem.includes(8) && checagem.includes(9))
        return true;
    if (checagem.includes(1) && checagem.includes(4) && checagem.includes(7))
        return true;
    if (checagem.includes(2) && checagem.includes(5) && checagem.includes(8))
        return true;
    if (checagem.includes(3) && checagem.includes(6) && checagem.includes(9))
        return true;
    if (checagem.includes(1) && checagem.includes(5) && checagem.includes(9))
        return true;
    if (checagem.includes(3) && checagem.includes(5) && checagem.includes(7))
        return true;
        
    //se alguma vitória existe, retorna true
}



function finalizarJogo(vencedor){
     venceu = vencedor;
     finished = true;
     document.getElementById("statusJogo").style.fontWeight ="bold";
     if (vencedor != null)
     document.getElementById("statusJogo").innerHTML=("<img src='./icons/finished.png' class='jogoIcon'> Jogo finalizado. Vencedor: Jogador " + jogadorAtual);
     else
     document.getElementById("statusJogo").innerHTML=("<img src='./icons/finished.png' class='jogoIcon'> Jogo finalizado. Empate!");
     
    //finaliza jogo e altera a mensagem na tela
}


$(".caixa").click(function(){


    //checagem de cada caixa do jogo

    if (!finished){

    
        //só executa se o jogo estiver em andamento

        var numeroCaixa = parseInt(this.id.split("_")[1]); 
      
       // descobrir qual caixa o usuário clicou

        if (!usadas.includes(numeroCaixa)){

            //altera o quadrado (td) para marcar que foi clicado

            var fig = "url(./icons/"+ jogadorAtual+".png)";
            $(this).css("margin", "1px");
            $(this).css("background-image", fig);
            $(this).css("background-size", "100% 100%");
            $(this).css("background-repeat", "no-repeat");

            if (jogadorAtual=="X"){     // se o jogador atual for o X, então adiciona aos quadrados que X marcou e checa o vencedor. em seguida, troca a vez
                
                marcadasX.push(numeroCaixa);

                if (checarVencedor(jogadorAtual, numeroCaixa))
                    finalizarJogo(jogadorAtual);

                jogadorAtual="O";  


            } else{      // se o jogador atual for o O, então adiciona aos quadrados que O marcou e checa o vencedor. em seguida, troca a vez

                marcadasO.push(numeroCaixa);
            
                if (checarVencedor(jogadorAtual, numeroCaixa))
                    finalizarJogo(jogadorAtual);
                     
                
                jogadorAtual="X";
            }
       

            if (!finished)
                document.getElementById("statusJogo").innerHTML=("<img src='./icons/arrow.png' class='jogoIcon'> Vez do jogador: " + jogadorAtual);

                // se o jogo não tiver terminado, atualiza a mensagem de vez

                $(this).css("cursor", "unset"); 
                usadas.push(numeroCaixa);
            }

            // caso tenha dado velha/empate, finaliza o jogo
            if (usadas.length>=9 && !finished)
                finalizarJogo(null);
            
        
            }
  
});

