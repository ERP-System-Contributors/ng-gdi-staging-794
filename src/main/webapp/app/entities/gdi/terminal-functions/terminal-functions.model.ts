export interface ITerminalFunctions {
  id: number;
  functionCode?: string | null;
  terminalFunctionality?: string | null;
}

export type NewTerminalFunctions = Omit<ITerminalFunctions, 'id'> & { id: null };
