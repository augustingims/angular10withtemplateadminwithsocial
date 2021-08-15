export interface ITokenSocial {
  value?: string;
}

export class TokenSocial implements ITokenSocial {
  constructor(
    public value?: string
  ) {}
}
