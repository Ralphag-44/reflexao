class plat extends entity
{
    constructor(...properties)
    {
        super(...properties)
    }

    draw()
    {
        if(this.points.length == l_b+1){super.draw("S")}
        else{super.draw("F")}
    }
}