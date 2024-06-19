export class GetProductsQuery {
  constructor(
    public readonly page?: number,
    public readonly pageSize?: number,
  ) {}
}
