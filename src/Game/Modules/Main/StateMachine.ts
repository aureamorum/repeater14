interface State<S extends string> {
  enter?(): Promise<void> | void
  tick?(): Promise<void> | void
  exit?(): Promise<void> | void
  transitions: Record<S | string, (finish?: () => void) => Promise<void>> | Array<S>
}

export default class StateMachine<S extends string> {
  private _state: S

  constructor(public states: Record<S, State<S>>, private initState: S) {
    this._state = this.initState
  }

  private get current() {
    return this.states[this._state]
  }

  public async tick() {
    if (this.current.tick) return this.current.tick()
  }

  public async transition(state: S) {
    if (Array.isArray(this.current.transitions)) {
      for (const s of this.current.transitions) {
        if (state === s) {
          if (this.current.exit) await this.current.exit()

          this._state = state
          if (this.current.enter) await this.current.enter()
        }
      }
    } else {
      if (this.current.exit) await this.current.exit()

      await this.current.transitions[state]()

      this._state = state
      if (this.current.enter) await this.current.enter()
    }
  }

  public get state() {
    return this._state
  }

  public reset() {
    this._state = this.initState
  }
}
