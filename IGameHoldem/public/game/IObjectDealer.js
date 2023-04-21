import IUIImage from "../js/image.js";

export default class IObjectDealer
{
    constructor(x, y, tx, ty, fHR, fVR, timer, iWidth, iHeight, iImageWidth, iImageHeight, image)
    {
        this.vLocation = {x:x*fHR, y:y*fVR};
        this.vTargetLocation = {x:tx*fHR, y:ty*fVR};

        this.fHR = fHR;
        this.fVR = fVR;

        this.fLength = 0;
        this.fRemainedLength = 0;
        this.vDirection = {x:0, y:0};
        this.vCurrentLocation = {x:0, y:0};

        this.SetLocation(this.vLocation.x, this.vLocation.y, this.vTargetLocation.x, this.vTargetLocation.y);

        this.kTimer = timer;

        this.iImageWidth = iImageWidth;
        this.iImageHeight = iImageHeight;

        this.iWidth = iWidth * fHR;
        this.iHeight = iHeight * fHR;

        this.imageCard = new IUIImage(x, y, this.iWidth, this.iHeight, image, iImageWidth, iImageHeight);
        
        this.fAngle = Math.random() * 360;
    }

    SetLocation(x, y, tx, ty)
    {
        let dirx = tx - x;
        let diry = ty - y;

        let length = Math.sqrt((dirx*dirx + diry*diry));
        let dirxn = dirx / length;
        let diryn = diry / length;
        this.vDirection = {x:dirxn, y:diryn};
        this.fLength = length;

        this.fRemainedLength = length;
        this.vCurrentLocation = {x:x, y:y};

        this.iCompleteStep = 0;
    }


    Update()
    {
        if ( this.fRemainedLength > 1 )
        {
            const length = this.fRemainedLength * 10 * this.kTimer.GetElapsedTime();
            
            this.vCurrentLocation.x += this.vDirection.x * length;
            this.vCurrentLocation.y += this.vDirection.y * length;

            this.imageCard.SetLocation(this.vCurrentLocation.x, this.vCurrentLocation.y);

            this.fRemainedLength -= length;
            if ( this.fRemainedLength < 1 )
            {
                this.Complete();
            }
        }
    }
    RenderRotation(ctx)
    {
        //this.imageCard.Render(ctx);
        this.imageCard.RenderRotation(ctx, this.fAngle);

        // ctx.font = "30px consolas";
        // ctx.fillStyle = "white";
        // ctx.fillText(".", this.vTargetLocation.x, this.vTargetLocation.y);

        // ctx.fillStyle = "green";
        // ctx.fillText(".", this.vCurrentLocation.x, this.vCurrentLocation.y);

    }

    Render(ctx)
    {
        this.imageCard.Render(ctx);
        //this.imageCard.RenderRotation(ctx, 45);

        // ctx.font = "30px consolas";
        // ctx.fillStyle = "white";
        // ctx.fillText(".", this.vTargetLocation.x, this.vTargetLocation.y);

        // ctx.fillStyle = "green";
        // ctx.fillText(".", this.vCurrentLocation.x, this.vCurrentLocation.y);

    }

    Complete()
    {
        this.iCompleteStep = 1;
        console.log(`Complete!!!`);
    }
};