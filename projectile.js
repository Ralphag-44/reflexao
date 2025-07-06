class projectile extends entity
{
    constructor(...properties)
    {
        super(...properties)
        this.vel = 30
        if(debug){this.vel=100 }
        this.direcao = Math.random()*(Math.PI*2)
    
    }

    update()
    {
        this.mov_aplic();
        this.draw();
    }

    mov_aplic()
    {
        for(let i = 0; i <= this.vel; ++i)
        {
           for(let j = 0; j < this.points.length; j++)
            {
                this.hitbox[j].translate(1, this.direcao)

            }
            
            let col = super.collision(plat_1)
            
           // p_col = col[1]

            
           if(col[0]){
            this.hitbox = super.copy(this.points)

            let A = col[2][0], B = col[2][1];
            // 1) velocidade em vetor
            let vx = Math.cos(this.direcao), vy = Math.sin(this.direcao);
            // 2) tangente → normal arbitrária
            let dx = B.x - A.x, dy = B.y - A.y;
            let nx = -dy, ny = dx;
            let len = Math.hypot(nx, ny);
            nx /= len; ny /= len;
            // 3) garanta que a normal aponte contra a velocidade (lado "fora")
            let dot = vx*nx + vy*ny;
            if (dot > 0) { nx = -nx; ny = -ny; dot = -dot; }
            // 4) reflexão vetorial
            let rx = vx - 2*dot*nx;
            let ry = vy - 2*dot*ny;
            // 5) novo ângulo
            this.direcao = Math.atan2(ry, rx);
            // 6) normalize
            //this.direcao %= 2*Math.PI;
            //if (this.direcao < 0) this.direcao += 2*Math.PI;

            if(debug)
            {
            ctx.save();
            ctx.lineWidth = 3;

            // ponto de colisão
            let cx = col[1].x;
            let cy = col[1].y;

            // tamanho dos vetores para visualização
            let size = 50;
            
            // 1. vetor original (azul)
            ctx.strokeStyle = "blue";
            ctx.beginPath();
            ctx.moveTo(cx - vx * size, cy - vy * size);
            ctx.lineTo(cx + vx * size, cy + vy * size);
            ctx.stroke();

            // 2. vetor normal (verde)
            ctx.strokeStyle = "green";
            ctx.beginPath();
            ctx.moveTo(cx - nx * size, cy - ny * size);
            ctx.lineTo(cx + nx * size, cy + ny * size);
            ctx.stroke();

            // 3. vetor refletido (vermelho)
            ctx.strokeStyle = "red";
            ctx.beginPath();
            ctx.moveTo(cx - rx * size, cy - ry * size);
            ctx.lineTo(cx + rx * size, cy + ry * size);
            ctx.stroke();

            ctx.restore();
            }
            //console.log(Math.atan2(this.points[this.points.length-1].y, this.points[this.points.length-1].x) * (180/Math.PI))
            
            }
            //if(col[0]){console.log(Math.atan2(col[1].y,col[1].x)* (180/Math.PI))}
            
          //  if(col[0]){this.direcao = Math.random()*(Math.PI*2)}
                      
            
        else{
            this.points = super.copy(this.hitbox)
        }
        }
    }

    draw(){
        super.draw("F");
        

    }
}