export class Cursor {
  constructor() {
    this.img = new Image();
    this.path = "./res/img/ui/cursor.png";
    this.img.src = this.path;
    this.scale = 0.7;
    this.size = {
      width: 40 * this.scale,
      height: 105 * this.scale,
    };
  }

  draw(ctx, x, y) {
    this.x = x - 10;
    this.y = y - 2;
    ctx.drawImage(this.img, this.x, this.y, this.size.width, this.size.height);
  }
}

export class Score {
  constructor() {
    this.score = 0;
  }

  draw(ctx, canvas) {
    ctx.font = "42px VT323";
    ctx.fillStyle = "black";
    ctx.fillText(`Skóre: ${this.score}`, canvas.width - 400, 50);
  }
}

export class KDA {
  constructor() {
    this.kills = 0;
    this.deaths = 0;
    this.assists = 0;
    this.kda = `${this.kills}/${this.deaths}/${this.assists}`;
  }

  draw(ctx, canvas) {
    ctx.font = "42px VT323";
    ctx.fillStyle = "black";
    ctx.fillText(
      `KDA: ${this.kills}/${this.deaths}/${this.assists}`,
      canvas.width - 400,
      100
    );
  }
}

export class HP {
  constructor() {
    this.hp = 3;
  }

  draw(ctx, canvas) {
    ctx.font = "42px VT323";
    ctx.fillStyle = "black";
    ctx.fillText(`HP: ${this.hp}`, 50, canvas.height - 100);
  }
}

export class Bombs {
  constructor() {
    this.maxCount = 1;
    this.count = 1;
  }

  draw(ctx, canvas) {
    ctx.font = "42px VT323";
    ctx.fillStyle = "black";
    ctx.fillText(`Bombs: ${this.count}`, 50, canvas.height - 50);
  }
}

export class Background {
  constructor() {
    this.img = new Image();
    this.path = "./res/img/ui/background.jpg";
    this.img.src = this.path;
  }

  draw(ctx, canvas) {
    ctx.drawImage(this.img, 0, 0, canvas.width, canvas.height);
  }
}
