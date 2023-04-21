var EButtonActionType = Object.freeze({"None":0, "Over":1, "Down":2, "Disable":3});

export default class IUIButton{
    constructor(x, y, width, height, click_handler, sprite, cSpriteWidth, cSpriteHeight, strCaption, iFontSize)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.click_handler  = click_handler;
        this.eButtonState = EButtonActionType.None;
        this.bDown = false;
        this.sprite = sprite;
        this.iSpriteWidth = cSpriteWidth;
        this.iSpriteHeight = cSpriteHeight;
        this.strCaption = strCaption;
        this.iFontSize = iFontSize;
        this.OriginFontSize = iFontSize;

        this.strFont = iFontSize.toString()+'px Hahmlet';

        this.iBettingCredits = 0;

        this.iCurrentX = x;
        this.iCurrentY = y;
        this.iCurrentWidth = width;
        this.iCurrentHeight = height;

        this.OriginalX = x;
        this.OriginalY = y;

        this.bCelebration = 0;

        this.iElapsedTime = 0;

        this.bEnable = true;

        //console.log(this);
        this.fHR = 0;
        this.fVR = 0;


    }

    SetState(state)
    {
        this.eButtonState = state;

        //console.log(state);
    }

    OnSize(fHR, fVR)
    {
        this.iCurrentX = this.x * fHR;
        this.iCurrentY = this.y * fVR;

        this.iCurrentWidth = this.width * fHR;
        this.iCurrentHeight = this.height * fVR;

        this.iFontSize = this.OriginFontSize * fHR;
        this.strFont = this.iFontSize.toString()+'px Hahmlet';

        this.OriginalX = this.x *fHR;
        this.OriginalY = this.y * fVR;
        //console.log(this);

        this.fHR = fHR;
        this.fVR = fVR;
    }

    SetOriginalLocation(x)
    {
        this.iCurrentX = x * this.fHR;
        console.log(this.iCurrentX);
    }

    SetLocationX(offsetx) {
        this.iCurrentX -= (offsetx * this.fHR); // 기존 위치에 offsetX를 빼기
    }

    In(mouse)
    {
        if ( this.eButtonState == EButtonActionType.Disable )
            return false;

        //if (this.iCurrentX < mouse.x && this.x + this.iCurrentWidth > mouse.x && this.y < mouse.y && this.iCurrentY + this.iCurrentHeight > mouse.y) 
        if (this.iCurrentX < mouse.x && this.iCurrentX + this.iCurrentWidth > mouse.x && this.iCurrentY < mouse.y && this.iCurrentY + this.iCurrentHeight > mouse.y) 
        { 
            return true;
        }
        return false;
    }

    Over(mouse)
    {
        if ( this.eButtonState == EButtonActionType.Disable )
            return false;

            //if (this.x < mouse.x && this.x + this.width > mouse.x && this.y < mouse.y && this.y + this.height > mouse.y) 
        if ( true == this.In(mouse))
        { 
            if ( this.eButtonState == EButtonActionType.None)
            {
                if ( this.bDown == true )
                    //this.eButtonState = EButtonActionType.Down;
                    this.SetState(EButtonActionType.Down);
                else
                    //this.eButtonState = EButtonActionType.Over;
                    this.SetState(EButtonActionType.Over);
            }
            // else if ( this.eButtonState == EButtonActionType.DownNone)
            // this.eButtonState = EButtonActionType.Over;

            return true;
        }
  
         //if ( this.eButtonState == EButtonActionType.None)
             //this.eButtonState = EButtonActionType.None;
             this.SetState(EButtonActionType.None);
        //  else if ( this.eButtonState == EButtonActionType.Down)
        //     this.eButtonSate = EButtonActionType.DownNone;
        return false;
    }

    Down(mouse)
    {
        if ( this.eButtonState == EButtonActionType.Disable )
            return false;

            this.bDown = true;

        if ( true == this.In(mouse))
        {
            //this.eButtonState = EButtonActionType.Down;
            this.SetState(EButtonActionType.Down);
            return true;
        }
        //this.eButtonState = EButtonActionType.None;
        this.SetState(EButtonActionType.None);
        return false;
    }
  
    Up(mouse)
    {
        if ( this.eButtonState == EButtonActionType.Disable )
            return false;

            this.bDown = false;

        //this.eButtonState = EButtonActionType.None;
        this.SetState(EButtonActionType.None);
    }

    Disable()
    {
        //this.eButtonState = EButtonActionType.Disable;
        this.SetState(EButtonActionType.Disable);
    }

    Click(mouse, args) 
    {
        if ( this.bEnable == false )
            return;

        if ( this.eButtonState == EButtonActionType.Disable )
            return false;


        if ( true == this.In(mouse))
        {
            this.click_handler(args);
            return true;
        }

        return false;
    }

    UpdateArrow()
    {
        ctx.drawImage(imageArrow, 0, 0, 130, 130, this.iCurrentX, this.iCurrentY, 130, 130);
    }

    Render(ctx) 
    {
        if ( false == this.bEnable )
            return;

        if ( this.eButtonState == EButtonActionType.Over )
        {
            // ctx.fillStyle = "rgba(0, 147, 255, 0.5)";
            // ctx.fillRect(this.x, this.y, this.width, this.height);

            //ctx.drawImage(this.sprite, 0, this.iSpriteHeight, this.iSpriteWidth, this.iSpriteHeight, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.sprite, this.iSpriteWidth, 0, this.iSpriteWidth, this.iSpriteHeight, this.iCurrentX, this.iCurrentY, this.iCurrentWidth, this.iCurrentHeight);

            ctx.fillStyle = "red";
        }
        else if ( this.eButtonState == EButtonActionType.Down )
        {
            // ctx.fillStyle = "rgba(0, 147, 70, 0.5)";
            // ctx.fillRect(this.x, this.y, this.width, this.height);

            //ctx.drawImage(this.sprite, 0, this.iSpriteHeight*2, this.iSpriteWidth, this.iSpriteHeight, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.sprite, this.iSpriteWidth*2, 0, this.iSpriteWidth, this.iSpriteHeight, this.iCurrentX, this.iCurrentY, this.iCurrentWidth, this.iCurrentHeight);

            ctx.fillStyle = "white";
        }
        else if ( this.eButtonState == EButtonActionType.None)
        {
            ctx.drawImage(this.sprite, 0, 0, this.iSpriteWidth, this.iSpriteHeight, this.iCurrentX, this.iCurrentY, this.iCurrentWidth, this.iCurrentHeight);
            ctx.fillStyle = "white";
        }
        else if ( this.eButtonState == EButtonActionType.Disable )
        {
            ctx.drawImage(this.sprite, this.iSpriteWidth*3, 0, this.iSpriteWidth, this.iSpriteHeight, this.iCurrentX, this.iCurrentY, this.iCurrentWidth, this.iCurrentHeight);
            ctx.fillStyle = "white";           
        }

        if ( this.bCelebration == 1 )
        {
            this.iElapsedTime ++;
            if ( this.iElapsedTime > 60 )
                this.iElapsedTime   = 0;

            if ( this.iElapsedTime > 30 )
                ctx.drawImage(this.sprite, this.iSpriteWidth, 0, this.iSpriteWidth, this.iSpriteHeight, this.iCurrentX, this.iCurrentY, this.iCurrentWidth, this.iCurrentHeight);

            ctx.fillStyle = "green";
        }

        //ctx.font = '20px Spoqa Han Sans Neo';
        ctx.font = this.strFont;
        ctx.textAlign = "center";
        //ctx.fillText(this.strCaption, this.iCurrentX+this.iCurrentWidth/2, this.iCurrentY+this.iCurrentHeight/2+(this.iCurrentHeight/6));
        ctx.fillText(this.strCaption, this.iCurrentX+this.iCurrentWidth/2, this.iCurrentY+this.iCurrentHeight/2+(this.iCurrentHeight/6));
    }
}