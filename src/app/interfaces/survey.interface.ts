export interface OptionQuestion{
    id?: number;
    label?: string;
    isCorrect?: boolean;
    disabledText?: boolean;
    disabledDate?: boolean;
    disabledNumber?: boolean;
    isOnlyOption?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface Question {
    id?: number;
    text?: string;
    type?: string;
    required?: boolean;
    createdAt?: string;
    updatedAt?: string;
    options?: OptionQuestion[];
}


export interface Survey {
    id?: number;
    name?: string;
    description?: string;
    token?: string;
    createdAt?: string;
    updatedAt?: string;
    questions?: Question[];
}