class Statistic {
    private _min: number = Infinity;
    private _max: number = -Infinity;
    private _accumulator: number = 0;
    private _count: number = 0;

    public update(value: number): void {
        this._min = Math.min(this._min, value);
        this._max = Math.max(this._max, value);
        this._accumulator += value;
        this._count++;
    }

    get min(): number {
        return this._min;
    }

    get max(): number {
        return this._max;
    }

    get average(): number {
        return this._count > 0 ? this._accumulator / this._count : 0;
    }
}

export {
    Statistic, 
}