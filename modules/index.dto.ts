export interface ModuleFacadeDto {
  send?(data: unknown): Promise<unknown>;

  execute(command?: string, ...args: any[]): Promise<unknown>;
}

export interface ModuleDto {
  initialize(params?: unknown): Promise<ModuleFacadeDto>
}
