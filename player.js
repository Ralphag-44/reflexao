class player extends entity
{
   constructor(...properties)
   {
    super(...properties)
    
    this.velocidade = 0

    this.vel_g = 0
    this.queda = true;
   }

   update()
   {
    this.control();
    this.mov_aplic();

   }

   control()
   {
        
   }

   mov_aplic()
   {
    
    let auxi_l = {}
    auxi_l.hitbox = [{x:this.hitbox[1].x,y:this.hitbox[1].y+1},{x:this.hitbox[2].x,y:this.hitbox[2].y+1}]
    if(true)
    {this.vel_g += grav}

    //grav_effect
    for(let i = 0; i < this.points.length; i++)
    {
        this.hitbox[i].translate(this.vel_g,Math.PI/2);
    }





    if(super.collision(plat_1)[0])
    {  
    }
    else
    {
        this.points = super.copy(this.hitbox);
    }


   }

   draw(){
    super.draw()
   }
   
}