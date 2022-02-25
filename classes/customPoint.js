class customPoint{
    constructor(x,y,offsetX,offsetY,speed){
        this.base = createVector(x+offsetX,y+offsetY);
        this.pos = createVector(x+offsetX,y+offsetY);
        this.speed = speed;
        this.vel = 0;
    }
    render(){
        point(this.pos.x,this.pos.y);
    }
    update(){
        let target;
        if(mouseIsPressed){
            target = createVector(mouseX,mouseY);
        }else{
            target = createVector(this.base.x,this.base.y);
        }
        let move = target.sub(this.pos);
        if(move.mag() <= 10){
            this.pos.copy(target);
            this.vel = 0;
        }else if(move.mag() > 10 && move.mag() <= 20){
            this.pos.copy(target);
            this.vel -= this.speed * 0.03;
            constrain(this.vel,0.1,2);
        }else{
            move.normalize();
            move.mult(this.vel);
            this.pos.add(move);
            
            this.vel += this.speed * 0.05;
            constrain(this.vel,0.3,4);
        }

    }
}