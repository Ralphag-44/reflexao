class point 
{
constructor(x, y) {
        this.x = x;
        this.y = y;
    };
    rotate(angle) {
        angle *= Math.PI / 180;
        let x = Math.cos(angle) * this.x - Math.sin(angle) * this.y;
        let y = Math.sin(angle) * this.x + Math.cos(angle) * this.y;
        this.x = x;
        this.y = y;
    };
    translate(vel, ang) {
        this.x += Math.cos(ang)*vel;
        this.y += Math.sin(ang)*vel;
    };
}

class entity
{
    constructor(...properties){
        if(properties[0] == "S")
        {
          this.points = properties[1];
          this.color = properties[2];
        }
        else{
           this.points = [];
           let ang = 360/properties[1];
           for(let i = ang; i <= 360; i += ang)
            {  
           let rad = (i+45)*(Math.PI/180);
           let px = properties[2] + Math.cos(rad)*(properties[4]/2);
           let py = properties[3] + Math.sin(rad)*(properties[5]/2);
           this.points.push(new point(px, py));
        }
           this.color = properties[6];
        }
        this.points.push(new point(properties[2],properties[3]));
        this.hitbox = this.copy(this.points);
    }

    draw(t)
    {   
        ctx.save()
        ctx.strokeStyle = this.color
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for(let i = 0; i < this.points.length-1; i++)
        {
            ctx.lineTo(this.points[i].x,this.points[i].y);
        }
        ctx.closePath();
        t == "F" ? ctx.fill() : ctx.stroke();
    
        ctx.restore();
    }

   copy(alvo) {
    return alvo.map(p => new point(p.x, p.y));
    //return alvo
}

    ang_vet(pa, pb, pc) {
	let bax = pa.x - pb.x;
	let bay = pa.y - pb.y;
	let bcx = pc.x - pb.x;
	let bcy = pc.y - pb.y;
	let ponto = bax * bcx + bay * bcy;
	let mag_a = Math.hypot(bax, bay);
	let mag_b = Math.hypot(bcx, bcy);
	return (Math.acos(ponto / (mag_a * mag_b)) * 180) / Math.PI;
	}

        collision(entity)
    {   let colidiu = false;

        let fig_a = this.hitbox.slice(0, this.hitbox.length-1)
        let fig_b = entity.hitbox.slice(0, entity.hitbox.length-1);

        for(let i = 0; (i < fig_a.length) && (!colidiu); i++)
        {   let x1 = fig_a[i].x;
            let y1 = fig_a[i].y;  
            let x2 = fig_a[(i+1)%fig_a.length].x;
            let y2 = fig_a[(i+1)%fig_a.length].y;
            for(let i2 = 0; (i2 < fig_b.length) && (!colidiu); i2++)
            {   let x3 = fig_b[i2].x;
                let y3 = fig_b[i2].y;
                let x4 = fig_b[(i2+1)%fig_b.length].x;
                let y4 = fig_b[(i2+1)%fig_b.length].y;
                let denominador = ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1))
                if(denominador != 0)
                {   let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / denominador;
                    let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / denominador;
                    colidiu = (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1);
                    if(colidiu){
                 
                    return [colidiu, {x:x1 + (uA * (x2-x1)),y:y1 + (uA * (y2-y1))}, [{x:x3,y:y3}, {x:x4,y:y4}]]
                        
                    }
                }
            }
        }
        return [colidiu];
    }
}