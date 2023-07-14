class Corda{
    constructor(pontoA, corpoB){
        this.sling = Constraint.create({
            pointA:pontoA, bodyB:corpoB, length:150, stiffness:0.005
        })
        this.pontoA = pontoA;
        World.add(world, this.sling);
    }
    show(){
        
        if(this.sling.bodyB != null && bola.body !== null){
            var pos = bola.body.position;
            //define a cor do contorno
            stroke("yellow");
            //define a grossura do contorno
            strokeWeight(3)
            line (this.pontoA.x,this.pontoA.y, pos.x, pos.y);
            
        }
    }
    cut(){
        this.sling.bodyB = null;
    }
}