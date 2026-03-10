export type TGenericResponse = {
    success: boolean;
    statusCode: number;
    data: Record<string, unknown>;
    message?: string;
    stack?: string;
};

export type TInitialResponse = Pick<TGenericResponse, 'message'>;