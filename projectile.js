class projectile extends entity
{
    constructor(...properties)
    {
        super(...properties)
        this.vel = 30
        if(debug){this.vel=100 }
        this.direcao = Math.random()*(Math.PI*2)
        this.time = 0;
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
                
            if(debug && i%15==0)
            {   
                ctx.save()
                ctx.globalAlpha = .1
                ctx.strokeStyle = this.color
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.moveTo(this.hitbox[0].x, this.hitbox[0].y);
                for(let i = 0; i < this.hitbox.length-1; i++)
                {
                    ctx.lineTo(this.hitbox[i].x,this.hitbox[i].y);
                }
                ctx.closePath();
                ctx.fill()
            
                ctx.restore();
            }

            }
    
            let full_list = plats
            for(let n = 0, cc = 0; n < full_list.length; n++)
            {
            let col = super.collision(full_list[n])
           // p_col = col[1]

           if(col[0] && (JSON.stringify(full_list[n]) != JSON.stringify(this))){
            cc++
            this.hitbox = super.copy(this.points)

            let ponto_a = col[2][0]
            let ponto_b = col[2][1];
            // 1) velocidade em vetor
            let vetor_velx = Math.cos(this.direcao);
            let vetor_vely = Math.sin(this.direcao);
            // 2) tangente → normal arbitrária
            let tan_x = ponto_b.x - ponto_a.x;
            let tan_y = ponto_b.y - ponto_a.y;
            let normal_x = -tan_y;
            let normal_y = tan_x;
            let mag = Math.hypot(normal_x, normal_y);
            normal_x /= mag;
            normal_y /= mag;
            // 3) garanta que a normal aponte contra a velocidade (lado "fora")
            let prod_e = vetor_velx*normal_x + vetor_vely*normal_y;
            if (prod_e > 0) { normal_x = -normal_x; normal_y = -normal_y; prod_e = -prod_e; }
            // 4) reflexão vetorial
            let result_x = vetor_velx - 2*prod_e*normal_x;
            let result_y = vetor_vely - 2*prod_e*normal_y;
            // 5) novo ângulo
            this.direcao = Math.atan2(result_y, result_x);
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
            ctx.moveTo(cx - vetor_velx * size, cy - vetor_vely * size);
            ctx.lineTo(cx + vetor_velx * size, cy + vetor_vely * size);
            ctx.stroke();

            // 2. vetor normal (verde)
            ctx.strokeStyle = "green";
            ctx.beginPath();
            ctx.moveTo(cx - normal_x * size, cy - normal_y * size);
            ctx.lineTo(cx + normal_x * size, cy + normal_y * size);
            ctx.stroke();

            // 3. vetor refletido (vermelho)
            ctx.strokeStyle = "red";
            ctx.beginPath();
            ctx.moveTo(cx - result_x * size, cy - result_y * size);
            ctx.lineTo(cx + result_x * size, cy + result_y * size);
            ctx.stroke();

            ctx.restore();
            }
            //console.log(Math.atan2(this.points[this.points.length-1].y, this.points[this.points.length-1].x) * (180/Math.PI))
            
            }
            if(n+1 == full_list.length && cc==0){this.points = super.copy(this.hitbox)  }
            //if(col[0]){console.log(Math.atan2(col[1].y,col[1].x)* (180/Math.PI))}
            
          //  if(col[0]){this.direcao = Math.random()*(Math.PI*2)}
                      
            }
           
        }
    }

    draw(){
        super.draw("F");
        

    }
}
