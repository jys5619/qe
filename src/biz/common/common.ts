export interface ErrorResult {
  success?: boolean;
  target?: string;
  msg?: string;
}

export class ValidateResult{
  private success: boolean;
  private target: string[];
  private msg: string[];

  constructor() {
    this.success = true;
    this.target = [] as string[];
    this.msg = [] as string[];
  }

  public setMsg(target: string, msg: string) {
    this.success = false;
    this.target.push(target);
    this.msg.push(msg);
  }

  public isSuccess(): boolean {
    return this.success;
  }

  public getTargets(): string[] {
    return this.target;
  }

  public getMsg(): string[] {
    return this.msg;
  }
}

