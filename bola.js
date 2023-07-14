class Bola{
    //definir os atributos do objeto
    constructor(x){
        this.body = Bodies.circle(x, 150, 30);
        World.add(world, this.body);
    }
    
    //remover, tirar, apagar, deletar, excluir, exterminar
    erase(){
        //remover do mundo
        World.remove(world, this.body);
        //anular o corpo
        this.body = null;
    }
    
    show(){
        if(this.body !== null){
            //desenha bolinha na mesma posição que o corpo
            image(frutaImg, this.body.position.x, this.body.position.y,60,60)
        }
    }
}