class WindStatistic {
    private _xSum: number = 0;
    private _ySum: number = 0;
    private _count: number = 0;

    constructor(private _title: string) {}

    public update(speed: number, direction: number): void {
        if (speed === 0) return;

        const radians = (Math.PI / 180) * direction;
        this._xSum += speed * Math.cos(radians);
        this._ySum += speed * Math.sin(radians);
        this._count++;
    }

    public display(): void {
        console.log(`${this._title}`);
        console.log(`Average Direction: ${this.average.toFixed(2)}°`);
        console.log("----------------");
    }

    get average(): number {
        if (this._count === 0) {
            return 0;
        }
    
        const avgX = this._xSum / this._count;
        const avgY = this._ySum / this._count;
    
        const radians = Math.atan2(avgY, avgX);
        let degrees = (radians * 180) / Math.PI;
    
        if (degrees < 0) {
            degrees += 360;
        }
    
        if (degrees >= 360) {
            degrees -= 360;
        }
    
        return degrees;
    }
}

export {
    WindStatistic,
};
